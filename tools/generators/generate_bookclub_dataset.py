#!/usr/bin/env python3
"""Generate bookclub-data.js from the imported book club CSV."""

import csv
import json
import re
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CSV_PATH = ROOT / "data" / "imports" / "bookclub" / "bookclub.csv"
OUT_PATH = ROOT / "data" / "generated" / "auto" / "bookclub-data.js"
PHOTO_DIR = ROOT / "assets" / "images" / "bookclub"
META_CACHE_PATH = ROOT / "data" / "cache" / ".bookclub-meta-cache.json"
BOOK_DATA_JS_PATH = ROOT / "data" / "generated" / "auto" / "book-data.js"

READING_HABITS_KEYS = {
    "ben burdan okuyorum",
    "roman gibi",
    "okumamak",
    "eger bir kis gecesi bir yolcu",
}

TR_MONTHS = {
    "ocak": 1,
    "subat": 2,
    "mart": 3,
    "nisan": 4,
    "mayis": 5,
    "haziran": 6,
    "temmuz": 7,
    "agustos": 8,
    "eylul": 9,
    "ekim": 10,
    "kasim": 11,
    "aralik": 12,
    "january": 1,
    "february": 2,
    "march": 3,
    "april": 4,
    "may": 5,
    "june": 6,
    "july": 7,
    "august": 8,
    "september": 9,
    "october": 10,
    "november": 11,
    "december": 12,
}

BOOKCLUB_CANONICAL = {
    "venedikte olum": {
        "book": "Venedik'te Ölüm",
        "englishTitle": "Death in Venice",
        "authors": ["Thomas Mann"],
        "date": "October 2023",
        "moderator": "Berfin",
    },
    "iklimler": {
        "book": "İklimler",
        "englishTitle": "Climates",
        "authors": ["André Maurois"],
        "date": "November 2023",
        "moderator": "Zeyneb",
    },
    "buyuk defter - kanit - ucuncu yalan": {
        "book": "Büyük Defter - Kanıt - Üçüncü Yalan",
        "englishTitle": "The Notebook / The Proof / The Third Lie",
        "authors": ["Agota Kristof"],
        "date": "January 2024",
        "moderator": "Erva",
    },
    "yalin tutku": {
        "book": "Yalın Tutku",
        "englishTitle": "Simple Passion",
        "authors": ["Annie Ernaux"],
        "date": "January 2024",
        "moderator": "Seda",
    },
    "onca yoksulluk varken": {
        "book": "Onca Yoksulluk Varken",
        "englishTitle": "The Life Before Us",
        "authors": ["Romain Gary (Émile Ajar)"],
        "date": "February 2024",
        "moderator": "Zeyneb",
    },
    "hamlet": {
        "book": "Hamlet",
        "englishTitle": "Hamlet",
        "authors": ["William Shakespeare"],
        "date": "March 2024",
        "moderator": "Berfin",
    },
    "on bucuk bolumde dunya tarihi": {
        "book": "On Buçuk Bölümde Dünya Tarihi",
        "englishTitle": "A History of the World in 10½ Chapters",
        "authors": ["Julian Barnes"],
        "date": "April 2024",
        "moderator": "Seda",
    },
    "masumiyet muzesi": {
        "book": "Masumiyet Müzesi",
        "englishTitle": "The Museum of Innocence",
        "authors": ["Orhan Pamuk"],
        "date": "May 2024",
        "moderator": "Erva",
    },
    "kambur": {
        "book": "Kambur",
        "englishTitle": "Kambur",
        "authors": ["Şule Gürbüz"],
        "date": "June 2024",
        "moderator": "Zeynep",
    },
    "utanc": {
        "book": "Utanç",
        "englishTitle": "Disgrace",
        "authors": ["J.M. Coetzee"],
        "date": "June 2024",
        "moderator": "Zeyneb",
        "photo": "assets/images/bookclub/Utanç (Disgrace)-Coetzee.jpeg",
    },
    "unutmanin genel teorisi": {
        "book": "Unutmanın Genel Teorisi",
        "englishTitle": "A General Theory of Oblivion",
        "authors": ["José Eduardo Agualusa"],
        "date": "July 2024",
        "moderator": "Seda",
    },
    "drina koprusu": {
        "book": "Drina Köprüsü",
        "englishTitle": "The Bridge on the Drina",
        "authors": ["Ivo Andrić"],
        "date": "September 2024",
        "moderator": "Berfin",
    },
    "ben burdan okuyorum": {
        "book": "Ben Burdan Okuyorum",
        "englishTitle": "I Am Reading from Here",
        "authors": ["Tim Parks"],
        "date": "September 2024",
        "moderator": "Erva",
    },
    "roman gibi": {
        "book": "Roman Gibi",
        "englishTitle": "Like a Novel",
        "authors": ["Daniel Pennac"],
        "date": "September 2024",
        "moderator": "",
    },
    "okumamak": {
        "book": "Okumamak",
        "englishTitle": "—",
        "authors": [],
        "date": "September 2024",
        "moderator": "",
    },
    "eger bir kis gecesi bir yolcu": {
        "book": "Eğer Bir Kış Gecesi Bir Yolcu",
        "englishTitle": "If on a Winter's Night a Traveler",
        "authors": ["Italo Calvino"],
        "date": "September 2024",
        "moderator": "",
    },
    "naif, super": {
        "book": "Naif, Süper",
        "englishTitle": "Naive. Super",
        "authors": ["Erlend Loe"],
        "date": "October 2024",
        "moderator": "Zeynep",
    },
    "huzur": {
        "book": "Huzur",
        "englishTitle": "A Mind at Peace",
        "authors": ["Ahmet Hamdi Tanpınar"],
        "date": "January 2025",
        "moderator": "Berfin",
    },
    "dunun dunyasi": {
        "book": "Dünün Dünyası",
        "englishTitle": "The World of Yesterday",
        "authors": ["Stefan Zweig"],
        "date": "June 2025",
        "moderator": "",
    },
    "usta ile margarita": {
        "book": "Usta ile Margarita",
        "englishTitle": "The Master and Margarita",
        "authors": ["Mikhail Bulgakov"],
        "date": "September 2025",
        "moderator": "",
    },
    "ask dersleri": {
        "book": "Aşk Dersleri",
        "englishTitle": "Essays in Love",
        "authors": ["Alain de Botton"],
        "date": "November 2025",
        "moderator": "",
    },
    "bir psikiyatristin anilari": {
        "book": "Bir Psikiyatristin Anıları",
        "englishTitle": "Becoming Myself",
        "authors": ["Irvin D. Yalom"],
        "date": "December 2025",
        "moderator": "Zeynep",
    },
    "kapi": {
        "book": "Kapı",
        "englishTitle": "The Door",
        "authors": ["Magda Szabó"],
        "date": "February 2026",
        "moderator": "",
    },
    "lolita": {
        "book": "Lolita",
        "englishTitle": "Lolita",
        "authors": ["Vladimir Nabokov"],
        "date": "March 2026",
        "moderator": "Zeyneb",
    },
}

BOOK_TITLE_ALIASES = {
    "utanc (disgrace)-coetzee": "utanc",
    "becoming myself": "bir psikiyatristin anilari",
}


def normalize_text(value):
    normalized = unicodedata.normalize("NFKD", (value or "").strip().lower())
    normalized = "".join(ch for ch in normalized if not unicodedata.combining(ch))
    normalized = (
        normalized.replace("ı", "i")
        .replace("ö", "o")
        .replace("ü", "u")
        .replace("ş", "s")
        .replace("ç", "c")
        .replace("ğ", "g")
    )
    return normalized


def date_to_sort_key(date_str):
    value = (date_str or "").strip()
    if not value:
        return ""

    # dd.mm.yy or dd.mm.yyyy
    m = re.match(r"^(\d{1,2})\.(\d{1,2})\.(\d{2,4})$", value)
    if m:
        day, month, year = int(m.group(1)), int(m.group(2)), int(m.group(3))
        if year < 100:
            year += 2000
        return f"{year:04d}-{month:02d}-{day:02d}"

    # Turkish month name + year (e.g., Eylul 2024)
    compact = normalize_text(value)
    m2 = re.match(r"^([a-z]+)\s+(\d{4})$", compact)
    if m2:
        month_name = m2.group(1)
        year = int(m2.group(2))
        month = TR_MONTHS.get(month_name)
        if month:
            return f"{year:04d}-{month:02d}-01"

    return ""


def resolve_photo_url(book, date):
    candidates = [book, date]
    exts = [".jpeg", ".jpg", ".png", ".webp"]

    if not PHOTO_DIR.exists():
        return None

    # Fast exact filename lookup first.
    for candidate in candidates:
        candidate = (candidate or "").strip()
        if not candidate:
            continue
        for ext in exts:
            photo_path = PHOTO_DIR / f"{candidate}{ext}"
            if photo_path.exists():
                return f"assets/images/bookclub/{photo_path.name}"

    # Fallback: normalize both candidate and existing file stems for unicode/spacing variance.
    normalized_files = {}
    for photo_path in PHOTO_DIR.iterdir():
        if photo_path.suffix.lower() not in exts:
            continue
        normalized_files[normalize_text(photo_path.stem)] = photo_path.name

    for candidate in candidates:
        candidate = (candidate or "").strip()
        if not candidate:
            continue
        normalized_candidate = normalize_text(candidate)
        matched_name = normalized_files.get(normalized_candidate)
        if matched_name:
            return f"assets/images/bookclub/{matched_name}"

    return None


def load_meta_cache():
    if not META_CACHE_PATH.exists():
        return {}
    try:
        return json.loads(META_CACHE_PATH.read_text(encoding="utf-8"))
    except Exception:
        return {}


def save_meta_cache(cache):
    META_CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    META_CACHE_PATH.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")


def fetch_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": "enk-bookclub-generator/1.0"})
    with urllib.request.urlopen(req, timeout=8) as resp:
        return json.loads(resp.read().decode("utf-8"))


def lookup_google_books(book, author_hint=""):
    ascii_book = normalize_text(book)
    queries = []
    if author_hint:
        queries.append(f"intitle:{book} inauthor:{author_hint}")
    queries.append(f"intitle:{book}")
    queries.append(book)
    if ascii_book and ascii_book != book:
        if author_hint:
            queries.append(f"intitle:{ascii_book} inauthor:{author_hint}")
        queries.append(f"intitle:{ascii_book}")
        queries.append(ascii_book)

    for query in queries:
        url = "https://www.googleapis.com/books/v1/volumes?" + urllib.parse.urlencode(
            {"q": query, "maxResults": "10", "printType": "books"}
        )
        try:
            payload = fetch_json(url)
        except Exception:
            continue

        items = payload.get("items", [])
        if not items:
            continue

        english_item = None
        for item in items:
            language = (item.get("volumeInfo", {}).get("language") or "").lower()
            if language.startswith("en"):
                english_item = item
                break

        chosen = english_item or items[0]
        info = chosen.get("volumeInfo", {})
        title = (info.get("title") or "").strip()
        authors = info.get("authors") or []
        if title:
            return title, authors

    return None, []


def lookup_openlibrary(book):
    ascii_book = normalize_text(book)
    queries = [book]
    if ascii_book and ascii_book != book:
        queries.append(ascii_book)

    for query in queries:
        url = "https://openlibrary.org/search.json?" + urllib.parse.urlencode({"title": query, "limit": "10"})
        try:
            payload = fetch_json(url)
        except Exception:
            continue

        docs = payload.get("docs") or []
        if not docs:
            continue

        for doc in docs:
            title = (doc.get("title") or "").strip()
            authors = doc.get("author_name") or []
            if title:
                return title, authors

    return None, []


def parse_author_hint(book):
    # e.g. Utanc (Disgrace)-Coetzee -> author hint "Coetzee"
    if "-" not in book:
        return ""
    tail = book.split("-")[-1].strip()
    return tail if len(tail) > 2 else ""


def parse_title_candidates(book):
    candidates = [book]
    m = re.search(r"\(([^)]+)\)", book)
    if m:
        inner = m.group(1).strip()
        if inner:
            candidates.append(inner)
    if "-" in book:
        left = book.split("-")[0].strip()
        if left:
            candidates.append(left)
    # keep order, unique
    seen = set()
    unique = []
    for c in candidates:
        if c not in seen:
            seen.add(c)
            unique.append(c)
    return unique


def parse_book_entries_js(path):
    if not path.exists():
        return []

    text = path.read_text(encoding="utf-8")
    prefix = "const bookEntries = "
    start = text.find(prefix)
    if start < 0:
        return []
    start += len(prefix)
    end = text.rfind(";")
    if end <= start:
        return []

    try:
        return json.loads(text[start:end])
    except Exception:
        return []


def build_book_lookup(book_entries):
    lookup = {}
    for entry in book_entries:
        title_tr = ((entry.get("title") or {}).get("tr") or "").strip()
        title_en = ((entry.get("title") or {}).get("en") or "").strip()
        creator = (entry.get("creator") or "").strip()
        if not title_tr:
            continue
        lookup[normalize_text(title_tr)] = {
            "englishTitle": title_en or title_tr,
            "authors": [creator] if creator else [],
        }
    return lookup


def resolve_book_metadata(book, cache, lookup):
    normalized_book = normalize_text(book)

    if normalized_book in lookup:
        data = lookup[normalized_book]
        cache[book] = data
        return data.get("englishTitle") or book, data.get("authors") or []

    if book in cache:
        cached = cache[book]
        cached_title = (cached.get("englishTitle") or "").strip()
        cached_authors = cached.get("authors") or []
        if cached_authors or (cached_title and normalize_text(cached_title) != normalized_book):
            return cached_title or book, cached_authors

    author_hint = parse_author_hint(book)
    for candidate in parse_title_candidates(book):
        english_title, authors = lookup_google_books(candidate, author_hint)
        if english_title:
            cache[book] = {"englishTitle": english_title, "authors": authors}
            return english_title, authors

    for candidate in parse_title_candidates(book):
        english_title, authors = lookup_openlibrary(candidate)
        if english_title:
            cache[book] = {"englishTitle": english_title, "authors": authors}
            return english_title, authors

    cache[book] = {"englishTitle": book, "authors": []}
    return book, []


def normalize_row(row, meta_cache, book_lookup):
    book = (row.get("Kitap") or "").strip()
    date = (row.get("Tarih") or "").strip()
    moderator = (row.get("Moderatör") or row.get("Moderator") or "").strip()
    nobel = (row.get("Nobel") or "").strip()
    rating = (row.get("Puan") or "").strip()
    participants = (row.get("Katilimcilar") or "").strip()

    if not book or set(book) == {"?"}:
        return None

    sort_key = date_to_sort_key(date)
    photo_url = resolve_photo_url(book, date)
    english_title, authors = resolve_book_metadata(book, meta_cache, book_lookup)

    normalized = {
        "book": book,
        "englishTitle": english_title,
        "authors": authors,
        "date": date,
        "sortKey": sort_key,
        "moderator": moderator,
        "nobel": nobel,
        "rating": rating,
        "participants": participants,
        "photoUrl": photo_url,
        "slug": re.sub(r"[^a-z0-9]+", "-", normalize_text(book)).strip("-") or "entry",
    }

    canonical_key = BOOK_TITLE_ALIASES.get(normalize_text(book), normalize_text(book))
    canonical = BOOKCLUB_CANONICAL.get(canonical_key)
    if canonical:
        normalized["book"] = canonical["book"]
        normalized["englishTitle"] = canonical["englishTitle"]
        normalized["authors"] = canonical["authors"]
        normalized["date"] = canonical["date"]
        normalized["sortKey"] = date_to_sort_key(canonical["date"])
        normalized["moderator"] = canonical["moderator"]
        normalized["photoUrl"] = (
            canonical.get("photo")
            or resolve_photo_url(normalized["book"], normalized["englishTitle"])
            or resolve_photo_url(normalized["book"], normalized["date"])
        )
        normalized["slug"] = re.sub(r"[^a-z0-9]+", "-", normalize_text(normalized["book"])).strip("-") or "entry"

    return normalized


def build_reading_habits_entry(rows):
    if not rows:
        return None

    tr_titles = [row.get("book", "") for row in rows if row.get("book")]
    en_titles = [row.get("englishTitle", "") for row in rows if row.get("englishTitle")]
    date_value = "September 2024"

    return {
        "book": "Okuma Alışkanlıkları",
        "englishTitle": "Reading Habits",
        "authors": [],
        "date": date_value,
        "sortKey": date_to_sort_key(date_value),
        "moderator": "Erva",
        "nobel": "",
        "rating": "",
        "participants": "",
        "photoUrl": resolve_photo_url("Eylül 2024", date_value),
        "slug": "reading-habits",
        "isReadingHabits": True,
        "relatedBooksTr": tr_titles,
        "relatedBooksEn": en_titles,
    }


def main():
    if not CSV_PATH.exists():
        raise FileNotFoundError(f"Missing file: {CSV_PATH}")

    meta_cache = load_meta_cache()
    book_lookup = build_book_lookup(parse_book_entries_js(BOOK_DATA_JS_PATH))
    entries = []
    reading_habits_rows = []
    with CSV_PATH.open("r", encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            normalized = normalize_row(row, meta_cache, book_lookup)
            if normalized:
                key = BOOK_TITLE_ALIASES.get(normalize_text(normalized.get("book", "")), normalize_text(normalized.get("book", "")))
                if key in READING_HABITS_KEYS:
                    reading_habits_rows.append(normalized)
                    continue
                entries.append(normalized)

    reading_habits_entry = build_reading_habits_entry(reading_habits_rows)
    if reading_habits_entry:
        entries.append(reading_habits_entry)

    save_meta_cache(meta_cache)

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(
        "const bookClubEntries = " + json.dumps(entries, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(entries)} entries to {OUT_PATH}")


if __name__ == "__main__":
    main()
