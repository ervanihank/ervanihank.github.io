# Website Publishing Guide

This folder is the publishable website. The site is static and reads from one generated website data file:

- `site-data.js`

That file is built from:

- Goodreads export in `data/imports/goodreads/`
- Letterboxd export folders or zips placed in the project root
- Book club CSV in `data/imports/bookclub/`
- one manual file you can edit yourself: `data/manual/manual-data.json`

## Folder Structure

The most important folders are:

- `assets/images/home/`
  Home page photos and personal images.
- `assets/images/profile/`
  Profile photos.
- `assets/images/institutions/`
  School and institution logos.
- `assets/images/research/`
  Research project illustrations.
- `assets/images/covers/books/`
  Local custom book covers.
- `assets/images/bookclub/`
  Book club photos.
- `assets/docs/cv/`
  CV PDF.
- `assets/docs/dissertations/`
  PhD, M1, and M2 dissertations.
- `data/manual/manual-data.json`
  The only manual data file you should edit.
- `data/generated/auto/`
  Intermediate auto-generated book, film, and book club data.
- `data/generated/combined-data.json`
  Generated JSON output for inspection.
- `data/config/book-title-map.json`
  Manual English title overrides.
- `data/source/`
  Supporting source files such as `Posts.xlsx`.
- `data/cache/`
  Cached metadata lookups used by the generators.
- `tools/update_site_data.py`
  Main merge/update script.
- `tools/generators/`
  Auto-import generator scripts.

## Main Rule

Do not edit `site-data.js` or anything in `data/generated/` by hand.

If you want to add or fix something manually, use:

- `data/manual/manual-data.json`

## How Updating Works

The update pipeline does this:

1. Finds the newest Goodreads CSV or Goodreads zip export.
2. Finds the newest Letterboxd export folder or zip.
3. Regenerates auto-imported books, films, and book club data.
4. Merges that automatic data with `data/manual/manual-data.json`.
5. Writes:
   - `data/generated/combined-data.json`
   - `site-data.js`

## Update Command

From this `public` folder, run:

```bash
./update_site_data.sh
```

If needed, you can also run:

```bash
python3 tools/update_site_data.py
```

Useful options:

```bash
python3 tools/update_site_data.py --skip-auto
python3 tools/update_site_data.py --no-zip-import
```

- `--skip-auto`
  Keeps current Goodreads and Letterboxd generated files and only re-merges manual changes.
- `--no-zip-import`
  Ignores zip extraction and uses already-available local files.

## Where To Put New Export Files

Goodreads and book club imports now live in `data/imports/`.
Letterboxd exports can still be dropped into the project root as exported folders or zip files.

Supported patterns:

- newest Goodreads CSV in `data/imports/goodreads/` or in the project root
- newest Goodreads zip in this folder
- newest `letterboxd-*` export folder in this folder
- newest `letterboxd-*.zip` in this folder

The update script will pick the latest one.

## Manual Additions

Edit:

- `data/manual/manual-data.json`

That file has three main sections:

- `manualEntries`
  Add a completely new book, film, or book club entry.
- `overrides`
  Fix an existing imported item by id or slug.
- `disabled`
  Hide an existing imported item.

### Manual Book Example

```json
{
  "id": "example-manual-book",
  "type": "book",
  "title": {
    "en": "Example Book",
    "tr": "Ornek Kitap"
  },
  "creator": "Author Name",
  "year": "2026",
  "readDate": "2026-04-07",
  "rating": "5/5",
  "coverUrl": "assets/images/covers/books/example-manual-book.webp"
}
```

### Manual Film Example

```json
{
  "id": "example-manual-film",
  "type": "film",
  "title": {
    "en": "Example Film",
    "tr": "Ornek Film"
  },
  "creator": "Director Name",
  "year": "2026",
  "watchedDate": "2026-04-07",
  "rating": "4.5/5",
  "coverUrl": "https://example.com/poster.jpg"
}
```

### Override Existing Imported Item

Use this when the export is correct overall, but one field should be fixed.
This is also the right place to keep persistent fixes for missing director or country metadata from Letterboxd imports.

```json
{
  "overrides": {
    "booksById": {
      "existing-book-id": {
        "coverUrl": "assets/images/covers/books/existing-book-id.webp"
      }
    }
  }
}
```

## Custom Local Cover Photos

If you have your own book cover photo, put it in:

- `assets/images/covers/books/`

Then reference it in `manual-data.json` using:

- `coverUrl`

Example:

```json
"coverUrl": "assets/images/covers/books/my-own-cover.webp"
```

This works for:

- manually added books
- manual overrides of imported books
- manually added films
- manual overrides of imported films

For book club photos, use:

- `photoUrl`

Example:

```json
"photoUrl": "assets/images/bookclub/my-bookclub-photo.jpeg"
```

## Recommended Publishing Workflow

Whenever you want to publish changes:

1. Put the latest Goodreads export in this folder.
2. Put the latest Letterboxd export folder or zip in this folder.
3. Add any manual corrections in `data/manual/manual-data.json`.
4. Add any local cover images into `assets/images/covers/books/`.
5. Run:

```bash
./update_site_data.sh
```

6. Open the site locally and quickly check:
   - homepage latest books and films
   - journal page
   - entry detail pages
   - book club page

7. Publish the contents of this `public` folder.

## If You Only Changed Manual Data

If you did not download new Goodreads or Letterboxd exports and only edited manual entries:

```bash
python3 tools/update_site_data.py --skip-auto
```

That is the fastest safe update path.

## Important Files For Maintenance

- `script.js`
  Homepage, journal page, research page language and rendering logic.
- `entry-detail.js`
  Single book/movie entry page logic.
- `bookclub.js`
  Book club page logic.
- `styles.css`
  Site styling.

## Publishing Summary

If you remember only one thing:

- edit `data/manual/manual-data.json`
- add images to `assets/images/...`
- run `./update_site_data.sh`
- publish this `public` folder
