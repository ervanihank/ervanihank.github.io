import csv
import html
import json
import re
import sys
import time
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "data" / "generated" / "auto" / "film-diary-data.js"

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36"

EN_NOTE_TR_ONLY = (
    "I only wrote my notes for this movie in Turkish and preferred not to force an English translation. "
    "Please check the Turkish version."
)
TR_NOTE_EN_ONLY = (
    "Bu film icin notlarimi sadece Ingilizce yazdim ve zoraki bir Turkce ceviri yapmak istemedim. "
    "Lutfen Ingilizce versiyona bakiniz."
)
EN_QUOTE_TR_ONLY = "I only kept quotations for this movie in Turkish. Please check the Turkish version."
TR_QUOTE_EN_ONLY = "Bu film icin alintilari sadece Ingilizce tuttum. Lutfen Ingilizce versiyona bakiniz."


def fetch(url, timeout=20, retries=3):
    last_error = None
    for attempt in range(retries):
        try:
            req = Request(url, headers={"User-Agent": UA})
            with urlopen(req, timeout=timeout) as resp:
                return resp.geturl(), resp.read().decode("utf-8", errors="replace")
        except Exception as exc:
            last_error = exc
            if attempt < retries - 1:
                time.sleep(0.35 * (attempt + 1))
    raise last_error


def resolve_export_dir():
    if len(sys.argv) > 1:
        candidate = Path(sys.argv[1]).expanduser().resolve()
        if not candidate.exists():
            raise FileNotFoundError(f"Provided export path does not exist: {candidate}")
        return candidate

    candidates = sorted(
        [
            p
            for p in ROOT.glob("letterboxd-*")
            if p.is_dir() and (p / "diary.csv").exists()
        ],
        key=lambda p: p.stat().st_mtime,
        reverse=True,
    )

    if not candidates:
        raise FileNotFoundError(
            "No Letterboxd export folder found. Expected a directory like letterboxd-... containing diary.csv"
        )

    return candidates[0]


def slugify(text):
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug or "film"


def tagify(text):
    value = slugify(text or "")
    return value or None


def to_country_code(slug):
    mapping = {
        "united-states": "unitedStates",
        "united-states-of-america": "unitedStates",
        "usa": "unitedStates",
        "us": "unitedStates",
        "uk": "unitedKingdom",
        "united-kingdom": "unitedKingdom",
        "great-britain": "unitedKingdom",
        "japan": "japan",
        "turkiye": "turkey",
        "turkey": "turkey",
        "france": "france",
        "germany": "germany",
        "russian-empire": "russia",
        "ussr": "russia",
        "soviet-union": "russia",
        "ottoman-empire": "turkey",
        "german-reich": "germany",
        "german-empire": "germany",
        "saxe-weimar-eisenach": "germany",
    }
    if slug in mapping:
        return mapping[slug]
    parts = [p for p in slug.split("-") if p]
    if not parts:
        return "unknown"
    return parts[0] + "".join(p.capitalize() for p in parts[1:])


def country_label(slug):
    code = to_country_code(slug)
    labels = {
        "unitedStates": "United States",
        "unitedKingdom": "United Kingdom",
        "turkey": "Turkey",
        "russia": "Russia",
        "germany": "Germany",
    }
    if code in labels:
        return labels[code]

    parts = [p.capitalize() for p in slug.split("-") if p]
    return " ".join(parts) if parts else "Unknown"


def clean_review(text):
    value = (text or "").strip().replace("\r", "\n")
    return re.sub(r"\n{3,}", "\n\n", value)


def is_likely_turkish_text(text):
    value = (text or "").strip()
    if not value:
        return False
    if any(ch in value for ch in "çğıöşüÇĞİÖŞÜ"):
        return True
    normalized = value.lower()
    markers = [" ve ", " bir ", " icin ", " bu ", " ile ", " gibi ", " daha "]
    scoped = f" {normalized} "
    return any(marker in scoped for marker in markers)


def is_quotation(text):
    value = clean_review(text)
    if not value:
        return False

    # Treat review as quotation only when the whole comment is wrapped in quotes.
    return (
        (value.startswith('"') and value.endswith('"'))
        or (value.startswith("“") and value.endswith("”"))
    )


def extract_quotation(text):
    value = clean_review(text)
    if not is_quotation(value):
        return value
    if (value.startswith('"') and value.endswith('"')) or (value.startswith("“") and value.endswith("”")):
        return value[1:-1].strip()
    return value


def review_to_html(text):
    value = clean_review(text)
    if not value:
        return ""
    parts = [p.strip() for p in re.split(r"\n\s*\n", value) if p.strip()]
    return "<h3>Diary Review</h3>" + "".join(f"<p>{html.escape(p)}</p>" for p in parts)


def load_latest_diary_entries(diary_path):
    films = {}
    with diary_path.open("r", encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            name = (row.get("Name") or "").strip()
            year = (row.get("Year") or "").strip()
            if not name or not year:
                continue

            key = (name.lower(), year)
            watched_date = (row.get("Watched Date") or row.get("Date") or "").strip()
            prev = films.get(key)
            if not prev or watched_date >= prev["watchedDate"]:
                films[key] = {
                    "name": name,
                    "year": year,
                    "uri": (row.get("Letterboxd URI") or "").strip(),
                    "rating": (row.get("Rating") or "").strip(),
                    "watchedDate": watched_date,
                    "source": "diary",
                }
    return films


def merge_watched_entries(films, watched_path):
    """Add watched.csv films that are missing from diary.csv.

    Diary remains the primary source because it includes rating/rewatch data.
    """
    if not watched_path.exists():
        return films

    with watched_path.open("r", encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            name = (row.get("Name") or "").strip()
            year = (row.get("Year") or "").strip()
            if not name or not year:
                continue

            key = (name.lower(), year)
            if key in films:
                continue

            watched_date = (row.get("Date") or "").strip()
            films[key] = {
                "name": name,
                "year": year,
                "uri": (row.get("Letterboxd URI") or "").strip(),
                "rating": "",
                "watchedDate": watched_date,
                "source": "watched",
            }

    return films


def load_latest_reviews(reviews_path):
    reviews = {}
    with reviews_path.open("r", encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            name = (row.get("Name") or "").strip()
            year = (row.get("Year") or "").strip()
            if not name or not year:
                continue

            key = (name.lower(), year)
            row_date = (row.get("Watched Date") or row.get("Date") or "").strip()
            prev = reviews.get(key)
            if not prev or row_date >= prev["date"]:
                reviews[key] = {
                    "text": (row.get("Review") or "").strip(),
                    "date": row_date,
                }
    return reviews


def extract_cover_from_page(page):
    """Extract best-effort poster URL from a Letterboxd film page."""
    mcover = re.search(r'<meta\s+property="og:image"\s+content="([^"]+)"', page, re.I)
    if not mcover:
        mcover = re.search(r'<meta\s+name="twitter:image"\s+content="([^"]+)"', page, re.I)
    if not mcover:
        mcover = re.search(r'<img[^>]*class="[^"]*poster[^"]*"[^>]*src="([^"]+)"', page, re.I)
    if not mcover:
        mcover = re.search(r'<img[^>]*alt="[^"]*poster[^"]*"[^>]*src="([^"]+)"', page, re.I)
    if not mcover:
        mcover = re.search(r'data-film-poster="([^"]+)"', page, re.I)
    if not mcover:
        mcover = re.search(r'src="(https://[^"]*letterboxd[^"]*\.jpg[^"]*)"', page, re.I)

    if not mcover:
        return None

    cover_url = html.unescape(mcover.group(1)).strip()
    if cover_url.startswith("/"):
        cover_url = "https://letterboxd.com" + cover_url
    return cover_url


def unique_keep_order(values):
    out = []
    seen = set()
    for value in values:
        name = (value or "").strip()
        if not name:
            continue
        key = name.lower()
        if key in seen:
            continue
        seen.add(key)
        out.append(name)
    return out


def extract_directors_from_page(page):
    directors = []

    for block in re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', page, re.I | re.S):
        raw = html.unescape(block).strip()
        if not raw:
            continue
        try:
            parsed = json.loads(raw)
        except Exception:
            continue

        stack = parsed if isinstance(parsed, list) else [parsed]
        for item in stack:
            if not isinstance(item, dict):
                continue
            director_value = item.get("director")
            candidates = director_value if isinstance(director_value, list) else [director_value]
            for candidate in candidates:
                if isinstance(candidate, dict):
                    directors.append(candidate.get("name") or "")
                elif isinstance(candidate, str):
                    directors.append(candidate)

    directors.extend(re.findall(r'href="/director/[^"]+/"[^>]*>([^<]+)</a>', page, re.I))
    return unique_keep_order(directors)


def extract_country_from_page(page):
    countries = re.findall(r"/films/country/([^\"/]+)/", page)
    if countries:
        slug = (countries[0] or "").strip().lower()
        if slug:
            return to_country_code(slug), country_label(slug)

    for block in re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', page, re.I | re.S):
        raw = html.unescape(block).strip()
        if not raw:
            continue
        try:
            parsed = json.loads(raw)
        except Exception:
            continue

        stack = parsed if isinstance(parsed, list) else [parsed]
        for item in stack:
            if not isinstance(item, dict):
                continue
            value = item.get("countryOfOrigin") or item.get("country")
            values = value if isinstance(value, list) else [value]
            for val in values:
                if isinstance(val, dict):
                    name = (val.get("name") or "").strip()
                else:
                    name = (val or "").strip()
                if not name:
                    continue
                slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
                if slug:
                    return to_country_code(slug), country_label(slug)

    return "unknown", "Unknown"


def search_letterboxd_film_page(name, year):
    """Search Letterboxd and return best matching film page URL."""
    if not name:
        return None

    query = urllib.parse.quote_plus(f"{name} {year}".strip())
    search_url = f"https://letterboxd.com/search/{query}/"

    try:
        _, search_page = fetch(search_url, timeout=15)
    except Exception:
        return None

    hrefs = re.findall(r'href="(/film/[^"/]+/)"', search_page)
    if not hrefs:
        return None

    unique_hrefs = []
    seen = set()
    for href in hrefs:
        if href in seen:
            continue
        seen.add(href)
        unique_hrefs.append(href)

    for href in unique_hrefs[:8]:
        film_url = f"https://letterboxd.com{href}"
        try:
            _, film_page = fetch(film_url, timeout=15)
        except Exception:
            continue

        # Prefer exact year match when available.
        if year:
            year_match = re.search(r'<small[^>]*class="number"[^>]*>(\d{4})</small>', film_page)
            if year_match and year_match.group(1) != str(year):
                continue

        return film_url

    return f"https://letterboxd.com{unique_hrefs[0]}"


def lookup_itunes_movie_cover(name, year):
    """Fallback movie poster lookup via iTunes Search API (no API key needed)."""
    if not name:
        return None

    params = {
        "media": "movie",
        "entity": "movie",
        "term": name,
        "limit": "10",
    }
    url = f"https://itunes.apple.com/search?{urllib.parse.urlencode(params)}"

    try:
        _, body = fetch(url, timeout=15)
        payload = json.loads(body)
    except Exception:
        return None

    results = payload.get("results", []) if isinstance(payload, dict) else []
    if not results:
        return None

    year_str = str(year or "")
    for item in results:
        release_date = (item.get("releaseDate") or "")
        if year_str and release_date[:4] and release_date[:4] != year_str:
            continue
        artwork = item.get("artworkUrl100") or item.get("artworkUrl60")
        if artwork:
            # Request a larger image where available.
            return artwork.replace("100x100bb", "600x600bb").replace("60x60bb", "600x600bb")

    # Fallback to first result regardless of year.
    artwork = results[0].get("artworkUrl100") or results[0].get("artworkUrl60")
    if artwork:
        return artwork.replace("100x100bb", "600x600bb").replace("60x60bb", "600x600bb")

    return None


def lookup_imdb_suggestion_cover(name, year):
    """Fallback poster lookup via IMDb suggestion endpoint."""
    if not name:
        return None

    query = re.sub(r"[^a-z0-9]", "", name.lower())
    if not query:
        return None

    first = query[0]
    url = f"https://v3.sg.media-imdb.com/suggestion/{first}/{urllib.parse.quote(name)}.json"

    try:
        _, body = fetch(url, timeout=15)
        payload = json.loads(body)
    except Exception:
        return None

    items = payload.get("d", []) if isinstance(payload, dict) else []
    if not items:
        return None

    year_str = str(year or "")
    for item in items:
        item_title = (item.get("l") or "").strip().lower()
        item_year = str(item.get("y") or "")
        image_data = item.get("i")

        if item_title and name.lower() not in item_title and item_title not in name.lower():
            continue
        if year_str and item_year and item_year != year_str:
            continue
        if isinstance(image_data, dict):
            image_url = image_data.get("imageUrl")
            if image_url:
                return image_url
        if isinstance(image_data, list) and image_data:
            return image_data[0]

    for item in items:
        image_data = item.get("i")
        if isinstance(image_data, dict):
            image_url = image_data.get("imageUrl")
            if image_url:
                return image_url
        if isinstance(image_data, list) and image_data:
            return image_data[0]

    return None


def resolve_metadata(item):
    uri = item["uri"]
    name = item.get("name", "")
    year = item.get("year", "")
    director = "Unknown"
    country_code = "unknown"
    country_name = "Unknown"
    cover_url = None
    film_page = ""

    if uri:
        body = ""
        final_url = ""
        try:
            final_url, body = fetch(uri)
        except Exception:
            body = ""
            final_url = ""

        if body:
            mdir = re.search(r'"director"\s*:\s*\[(.*?)\]\s*,\s*"name"', body, re.S)
            if mdir:
                names = [
                    html.unescape(n).strip()
                    for n in re.findall(r'"name"\s*:\s*"(.*?)"', mdir.group(1), re.S)
                    if n.strip()
                ]
                if names:
                    director = ", ".join(unique_keep_order(names))

            msame = re.search(r'"sameAs"\s*:\s*"(https://letterboxd.com/film/[^"]+/)"', body)
            film_page = msame.group(1) if msame else ""

        if not film_page and final_url:
            mslug = re.search(r"/film/([^/]+)/", final_url)
            if mslug:
                film_page = f"https://letterboxd.com/film/{mslug.group(1)}/"

    if not film_page:
        film_page = search_letterboxd_film_page(name, year)

    if film_page:
        try:
            _, page = fetch(film_page)
        except Exception:
            page = ""

        if page:
            if director == "Unknown":
                page_directors = extract_directors_from_page(page)
                if page_directors:
                    director = ", ".join(page_directors)

            if not cover_url:
                cover_url = extract_cover_from_page(page)

            if country_code == "unknown":
                country_code, country_name = extract_country_from_page(page)

    if director == "Unknown" or country_code == "unknown" or not cover_url:
        backup_page_url = search_letterboxd_film_page(name, year)
        if backup_page_url and backup_page_url != film_page:
            try:
                _, backup_page = fetch(backup_page_url)
            except Exception:
                backup_page = ""

            if backup_page:
                if director == "Unknown":
                    backup_directors = extract_directors_from_page(backup_page)
                    if backup_directors:
                        director = ", ".join(backup_directors)
                if country_code == "unknown":
                    country_code, country_name = extract_country_from_page(backup_page)
                if not cover_url:
                    cover_url = extract_cover_from_page(backup_page)

    if not cover_url:
        cover_url = lookup_itunes_movie_cover(name, year)

    if not cover_url:
        cover_url = lookup_imdb_suggestion_cover(name, year)

    return director, country_code, country_name, cover_url


def build_entries(films, reviews, metadata):
    entries = []
    for key, film in sorted(films.items(), key=lambda kv: (kv[1]["watchedDate"], kv[1]["name"])):
        name = film["name"]
        year = film["year"]
        watched = film["watchedDate"]
        rating = film["rating"]
        source = film.get("source", "diary")

        director, country_code, country_name, cover_url = metadata.get(
            key,
            ("Unknown", "unknown", "Unknown", None),
        )
        review_text = (reviews.get(key) or {}).get("text", "").strip()
        is_turkish_review = is_likely_turkish_text(review_text)

        if review_text and is_quotation(review_text):
            quote_source = [extract_quotation(review_text)]
            if is_turkish_review:
                quote_values_en = [EN_QUOTE_TR_ONLY]
                quote_values_tr = quote_source
            else:
                quote_values_en = quote_source
                quote_values_tr = [TR_QUOTE_EN_ONLY]
            essay_en = "<h3>Diary Note</h3><p>No long-form note added for this movie yet.</p>"
            essay_tr = "<h3>Gunluk Notu</h3><p>Bu film icin henuz uzun bir not eklenmedi.</p>"
        elif review_text:
            if is_turkish_review:
                essay_en = f"<h3>Diary Note</h3><p>{EN_NOTE_TR_ONLY}</p>"
                essay_tr = review_to_html(review_text).replace("Diary Review", "Gunluk Notu")
            else:
                essay_en = review_to_html(review_text)
                essay_tr = f"<h3>Gunluk Notu</h3><p>{TR_NOTE_EN_ONLY}</p>"
            quote_values_en = []
            quote_values_tr = []
        else:
            essay_en = (
                "<h3>Diary Note</h3>"
                "<p>I watched this movie before I started writing long-form notes on films. "
                "I am keeping this entry as a memory marker in my viewing journey.</p>"
            )
            essay_tr = (
                "<h3>Gunluk Notu</h3><p>Bu filmi filmler uzerine uzun notlar tutmaya baslamadan once izlemistim. "
                "Bu kaydi izleme yolculugumun bir hafiza izi olarak koruyorum.</p>"
            )
            quote_values_en = []
            quote_values_tr = []

        rating_text = f"{rating}/5" if rating else "Rating not recorded"
        tags_en = ["letterboxd", source]
        director_tag = tagify(director)
        country_tag = tagify(country_name)
        year_tag = tagify(year)
        for candidate in [director_tag, country_tag, year_tag]:
            if candidate and candidate not in tags_en:
                tags_en.append(candidate)

        watched_note_en = f"Watched on {watched}." if watched else "Watch date not recorded."
        watched_note_tr = f"{watched} tarihinde izlendi." if watched else "Izlenme tarihi kayitli degil."

        entries.append(
            {
                "id": f"{slugify(name)}-{year}",
                "type": "film",
                "title": {"en": name, "tr": name},
                "creator": director,
                "country": country_code,
                "countryLabel": {"en": country_name, "tr": country_name},
                "coverUrl": cover_url,
                "letterboxdUrl": film.get("uri") or None,
                "year": year,
                "watchedDate": watched,
                "note": {
                    "en": f"{watched_note_en} Rated {rating_text}.",
                    "tr": f"{watched_note_tr} Puan: {rating_text}.",
                },
                "rating": rating_text,
                "essay": {
                    "en": essay_en,
                    "tr": essay_tr,
                },
                "quotes": {"en": quote_values_en, "tr": quote_values_tr},
                "tags": {"en": tags_en, "tr": tags_en},
            }
        )
    return entries


def main():
    export_dir = resolve_export_dir()
    diary_path = export_dir / "diary.csv"
    watched_path = export_dir / "watched.csv"
    reviews_path = export_dir / "reviews.csv"

    if not diary_path.exists():
        raise FileNotFoundError(f"Missing file: {diary_path}")

    films = load_latest_diary_entries(diary_path)
    films = merge_watched_entries(films, watched_path)
    reviews = load_latest_reviews(reviews_path) if reviews_path.exists() else {}

    metadata = {}
    values = list(films.values())
    with ThreadPoolExecutor(max_workers=4) as pool:
        future_map = {pool.submit(resolve_metadata, item): (item["name"].lower(), item["year"]) for item in values}
        for future in as_completed(future_map):
            metadata[future_map[future]] = future.result()

    entries = build_entries(films, reviews, metadata)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("const filmDiaryEntries = " + json.dumps(entries, ensure_ascii=True, indent=2) + ";\n", encoding="utf-8")
    print(f"Source export: {export_dir}")
    print(f"Wrote {len(entries)} entries to {OUT}")


if __name__ == "__main__":
    main()
