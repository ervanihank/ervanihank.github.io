#!/usr/bin/env python3
"""Build one unified website dataset from auto imports + manual edits.

Pipeline:
1) Optionally unpack latest Goodreads/Letterboxd zip exports.
2) Run existing generator scripts to refresh auto data files.
3) Merge auto data with manual additions/overrides.
4) Write one unified output used by the website.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
import zipfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Sequence

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
MANUAL_PATH = DATA_DIR / "manual" / "manual-data.json"
GENERATED_JSON_PATH = DATA_DIR / "generated" / "combined-data.json"
AUTO_GENERATED_DIR = DATA_DIR / "generated" / "auto"
SITE_DATA_JS_PATH = ROOT / "site-data.js"

GOODREADS_IMPORT_DIR = DATA_DIR / "imports" / "goodreads"
LETTERBOXD_IMPORT_DIR = DATA_DIR / "imports" / "letterboxd"

GOODREADS_TARGET_CSV = GOODREADS_IMPORT_DIR / "goodreads_library_export.csv"
BOOK_DATA_JS = AUTO_GENERATED_DIR / "book-data.js"
FILM_DATA_JS = AUTO_GENERATED_DIR / "film-diary-data.js"
BOOKCLUB_DATA_JS = AUTO_GENERATED_DIR / "bookclub-data.js"


def _log(message: str) -> None:
    print(f"[update] {message}")


def _latest(paths: Sequence[Path]) -> Optional[Path]:
    items = [p for p in paths if p.exists()]
    if not items:
        return None
    return max(items, key=lambda p: p.stat().st_mtime)


def _extract_zip(zip_path: Path, destination_root: Path) -> Path:
    target_dir = destination_root / zip_path.stem
    if target_dir.exists():
        shutil.rmtree(target_dir)
    target_dir.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(zip_path, "r") as zf:
        zf.extractall(target_dir)

    return target_dir


def _find_letterboxd_export_dir(base_dir: Path) -> Optional[Path]:
    if (base_dir / "diary.csv").exists():
        return base_dir

    candidates = sorted(
        [
            p
            for p in base_dir.rglob("*")
            if p.is_dir() and (p / "diary.csv").exists()
        ],
        key=lambda p: len(p.parts),
    )
    return candidates[0] if candidates else None


def resolve_letterboxd_export_dir(use_zip: bool) -> Optional[Path]:
    latest_dir = _latest([p for p in ROOT.glob("letterboxd-*") if p.is_dir()])
    latest_zip = _latest([p for p in ROOT.glob("letterboxd-*.zip") if p.is_file()])

    if use_zip and latest_zip and (not latest_dir or latest_zip.stat().st_mtime >= latest_dir.stat().st_mtime):
        _log(f"Extracting Letterboxd zip: {latest_zip.name}")
        extracted_root = _extract_zip(latest_zip, LETTERBOXD_IMPORT_DIR)
        export_dir = _find_letterboxd_export_dir(extracted_root)
        if export_dir:
            return export_dir

    if latest_dir and (latest_dir / "diary.csv").exists():
        _log(f"Using Letterboxd folder: {latest_dir.name}")
        return latest_dir

    # Fallback: maybe an older extracted import already exists.
    extracted_candidates = sorted(
        [
            p
            for p in LETTERBOXD_IMPORT_DIR.glob("*")
            if p.is_dir() and _find_letterboxd_export_dir(p)
        ],
        key=lambda p: p.stat().st_mtime,
        reverse=True,
    )
    if extracted_candidates:
        fallback = _find_letterboxd_export_dir(extracted_candidates[0])
        if fallback:
            _log(f"Using extracted Letterboxd folder: {fallback}")
            return fallback

    return None


def resolve_goodreads_csv(use_zip: bool) -> Optional[Path]:
    csv_candidates = [
        p
        for p in ROOT.glob("*.csv")
        if "goodreads" in p.name.lower() and p.is_file()
    ]
    latest_csv = _latest(csv_candidates)
    latest_zip = _latest([p for p in ROOT.glob("*goodreads*.zip") if p.is_file()])

    if use_zip and latest_zip and (not latest_csv or latest_zip.stat().st_mtime >= latest_csv.stat().st_mtime):
        _log(f"Extracting Goodreads zip: {latest_zip.name}")
        extracted_root = _extract_zip(latest_zip, GOODREADS_IMPORT_DIR)
        extracted_csv_candidates = [
            p
            for p in extracted_root.rglob("*.csv")
            if "goodreads" in p.name.lower() or p.name == "goodreads_library_export.csv"
        ]
        chosen = _latest(extracted_csv_candidates)
        if chosen:
            return chosen

    if latest_csv:
        _log(f"Using Goodreads CSV: {latest_csv.name}")
        return latest_csv

    extracted_csv_candidates = [
        p
        for p in GOODREADS_IMPORT_DIR.rglob("*.csv")
        if "goodreads" in p.name.lower() or p.name == "goodreads_library_export.csv"
    ]
    chosen = _latest(extracted_csv_candidates)
    if chosen:
        _log(f"Using extracted Goodreads CSV: {chosen}")
        return chosen

    return None


def _load_js_array(path: Path, variable_name: str) -> List[Dict[str, Any]]:
    text = path.read_text(encoding="utf-8")
    pattern = rf"const\s+{re.escape(variable_name)}\s*=\s*(\[.*?\]);"
    match = re.search(pattern, text, flags=re.S)
    if not match:
        raise ValueError(f"Could not find array variable '{variable_name}' in {path}")
    return json.loads(match.group(1))


def _deep_merge(base: Dict[str, Any], patch: Dict[str, Any]) -> Dict[str, Any]:
    result = dict(base)
    for key, value in patch.items():
        if isinstance(value, dict) and isinstance(result.get(key), dict):
            result[key] = _deep_merge(result[key], value)
        else:
            result[key] = value
    return result


def _merge_by_key(
    auto_items: List[Dict[str, Any]],
    manual_items: List[Dict[str, Any]],
    overrides: Dict[str, Dict[str, Any]],
    disabled: List[str],
    key_field: str,
) -> List[Dict[str, Any]]:
    by_key: Dict[str, Dict[str, Any]] = {}

    for item in auto_items:
        key = (item.get(key_field) or "").strip()
        if key:
            by_key[key] = item

    for item in manual_items:
        key = (item.get(key_field) or "").strip()
        if not key:
            continue
        by_key[key] = item

    for key, patch in overrides.items():
        if key in by_key and isinstance(patch, dict):
            by_key[key] = _deep_merge(by_key[key], patch)

    disabled_set = {x for x in disabled if isinstance(x, str)}
    merged = [entry for k, entry in by_key.items() if k not in disabled_set]
    return merged


def _sort_entries(entries: List[Dict[str, Any]], date_keys: Sequence[str]) -> List[Dict[str, Any]]:
    def sort_key(entry: Dict[str, Any]) -> str:
        for key in date_keys:
            value = entry.get(key)
            if isinstance(value, str) and value.strip():
                return value
        return ""

    return sorted(entries, key=sort_key, reverse=True)


def load_manual_data() -> Dict[str, Any]:
    if not MANUAL_PATH.exists():
        MANUAL_PATH.parent.mkdir(parents=True, exist_ok=True)
        MANUAL_PATH.write_text(
            json.dumps(
                {
                    "_instructions": {
                        "purpose": "This is the only file you edit manually for journal data.",
                        "workflow": [
                            "Auto-imported Goodreads, Letterboxd, and book club data are merged with this file.",
                            "Use manualEntries to add books, films, or book club entries that do not exist in the exports.",
                            "Use overrides to patch an existing auto-imported item by its id or slug.",
                            "Use disabled to hide an auto-imported item without deleting source exports.",
                        ],
                        "localAssets": {
                            "bookCovers": "assets/images/covers/books/",
                            "bookClubPhotos": "assets/images/bookclub/",
                            "homeImages": "assets/images/home/",
                            "researchImages": "assets/images/research/",
                            "institutionLogos": "assets/images/institutions/",
                            "documents": "assets/docs/",
                        },
                        "coverRule": "For a custom local cover or photo, set coverUrl or photoUrl to a relative path such as assets/images/covers/books/my-book.webp.",
                    },
                    "manualEntries": {"books": [], "films": [], "bookClub": []},
                    "overrides": {"booksById": {}, "filmsById": {}, "bookClubBySlug": {}},
                    "disabled": {"bookIds": [], "filmIds": [], "bookClubSlugs": []},
                },
                ensure_ascii=False,
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )

    with MANUAL_PATH.open("r", encoding="utf-8") as f:
        return json.load(f)


def build_unified_dataset() -> Dict[str, Any]:
    auto_books = _load_js_array(BOOK_DATA_JS, "bookEntries")
    auto_films = _load_js_array(FILM_DATA_JS, "filmDiaryEntries")
    auto_bookclub = _load_js_array(BOOKCLUB_DATA_JS, "bookClubEntries")

    manual_data = load_manual_data()
    manual_entries = manual_data.get("manualEntries") or {}
    overrides = manual_data.get("overrides") or {}
    disabled = manual_data.get("disabled") or {}

    merged_books = _merge_by_key(
        auto_items=auto_books,
        manual_items=manual_entries.get("books") or [],
        overrides=overrides.get("booksById") or {},
        disabled=disabled.get("bookIds") or [],
        key_field="id",
    )

    merged_films = _merge_by_key(
        auto_items=auto_films,
        manual_items=manual_entries.get("films") or [],
        overrides=overrides.get("filmsById") or {},
        disabled=disabled.get("filmIds") or [],
        key_field="id",
    )

    normalized_bookclub_auto = []
    for entry in auto_bookclub:
        normalized = dict(entry)
        if not normalized.get("slug") and normalized.get("book"):
            normalized["slug"] = re.sub(r"[^a-z0-9]+", "-", normalized["book"].lower()).strip("-")
        normalized_bookclub_auto.append(normalized)

    merged_bookclub = _merge_by_key(
        auto_items=normalized_bookclub_auto,
        manual_items=manual_entries.get("bookClub") or [],
        overrides=overrides.get("bookClubBySlug") or {},
        disabled=disabled.get("bookClubSlugs") or [],
        key_field="slug",
    )

    merged_books = _sort_entries(merged_books, ["readDate", "year"])
    merged_films = _sort_entries(merged_films, ["watchedDate", "year"])
    merged_bookclub = _sort_entries(merged_bookclub, ["sortKey", "date"])

    journal_entries = [*merged_books, *merged_films]

    return {
        "lastUpdated": datetime.now().astimezone().date().isoformat(),
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "sources": {
            "auto": {
                "books": str(BOOK_DATA_JS.relative_to(ROOT)),
                "films": str(FILM_DATA_JS.relative_to(ROOT)),
                "bookClub": str(BOOKCLUB_DATA_JS.relative_to(ROOT)),
            },
            "manual": str(MANUAL_PATH.relative_to(ROOT)),
        },
        "books": merged_books,
        "films": merged_films,
        "bookClub": merged_bookclub,
        "journal": journal_entries,
    }


def _write_outputs(dataset: Dict[str, Any]) -> None:
    GENERATED_JSON_PATH.parent.mkdir(parents=True, exist_ok=True)
    GENERATED_JSON_PATH.write_text(
        json.dumps(dataset, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    js_payload = json.dumps(dataset, ensure_ascii=False, indent=2)
    SITE_DATA_JS_PATH.write_text(
        "// Auto-generated unified data file. Do not edit this file manually.\n"
        "// Use tools/update_site_data.py or ./update_site_data.sh\n\n"
        f"const siteData = {js_payload};\n\n"
        "const bookEntries = siteData.books;\n"
        "const filmDiaryEntries = siteData.films;\n"
        "const bookClubEntries = siteData.bookClub;\n"
        "const journalEntriesUnified = siteData.journal;\n",
        encoding="utf-8",
    )


def run_generators(letterboxd_export_dir: Optional[Path], skip_auto: bool) -> None:
    if skip_auto:
        _log("Skipping auto generators (--skip-auto).")
        return

    python_bin = ROOT / ".venv" / "bin" / "python"
    python_exe = str(python_bin if python_bin.exists() else Path(sys.executable))

    film_cmd = [python_exe, str(ROOT / "tools" / "generators" / "generate_film_dataset.py")]
    if letterboxd_export_dir:
        film_cmd.append(str(letterboxd_export_dir))

    _log("Running film generator...")
    subprocess.run(film_cmd, cwd=ROOT, check=True)

    _log("Running book generator...")
    subprocess.run([python_exe, str(ROOT / "tools" / "generators" / "generate_book_dataset.py")], cwd=ROOT, check=True)

    _log("Running book club generator...")
    subprocess.run([python_exe, str(ROOT / "tools" / "generators" / "generate_bookclub_dataset.py")], cwd=ROOT, check=True)


def main() -> int:
    parser = argparse.ArgumentParser(description="Build unified site data from auto imports and manual edits.")
    parser.add_argument(
        "--skip-auto",
        action="store_true",
        help="Skip running auto generators and only merge existing outputs with manual data.",
    )
    parser.add_argument(
        "--no-zip-import",
        action="store_true",
        help="Do not automatically extract latest zip files.",
    )
    args = parser.parse_args()

    use_zip = not args.no_zip_import

    goodreads_csv = resolve_goodreads_csv(use_zip=use_zip)
    if goodreads_csv and goodreads_csv.resolve() != GOODREADS_TARGET_CSV.resolve():
        GOODREADS_TARGET_CSV.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(goodreads_csv, GOODREADS_TARGET_CSV)
        _log(f"Synced Goodreads file to {GOODREADS_TARGET_CSV.name}")

    letterboxd_export_dir = resolve_letterboxd_export_dir(use_zip=use_zip)

    run_generators(letterboxd_export_dir=letterboxd_export_dir, skip_auto=args.skip_auto)

    dataset = build_unified_dataset()
    _write_outputs(dataset)

    _log(f"Wrote unified JSON: {GENERATED_JSON_PATH.relative_to(ROOT)}")
    _log(f"Wrote unified JS: {SITE_DATA_JS_PATH.relative_to(ROOT)}")
    _log(
        "Counts -> "
        f"books: {len(dataset['books'])}, "
        f"films: {len(dataset['films'])}, "
        f"book club: {len(dataset['bookClub'])}"
    )

    unknown_directors = sum(
        1
        for film in dataset["films"]
        if str(film.get("creator") or "").strip().lower() == "unknown"
    )
    unknown_countries = sum(
        1
        for film in dataset["films"]
        if str(film.get("country") or "").strip().lower() == "unknown"
    )
    missing_covers = sum(1 for film in dataset["films"] if not str(film.get("coverUrl") or "").strip())

    _log(
        "Film metadata check -> "
        f"unknown directors: {unknown_directors}, "
        f"unknown countries: {unknown_countries}, "
        f"missing covers: {missing_covers}"
    )
    if unknown_directors or unknown_countries or missing_covers:
        _log(
            "Update rule: if unknown metadata remains, rerun tools/generators/generate_film_dataset.py with latest Letterboxd export "
            "and inspect unresolved titles manually."
        )

    missing_book_covers = sum(1 for book in dataset["books"] if not str(book.get("coverUrl") or "").strip())
    _log(f"Book metadata check -> missing covers: {missing_book_covers}")
    _log(
        "Book matching rule: attach spreadsheet notes/quotes and Instagram captions only when both the book title "
        "and canonical author match the Goodreads entry; if a note appears on the wrong book, fix the data/source/Posts.xlsx "
        "title/author pair."
    )
    _log(
        "Bilingual note/quote rule: keep EN and TR texts as provided (no automatic translation). "
        "If one language is empty and the other exists, write a short pointer message to the available language."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
