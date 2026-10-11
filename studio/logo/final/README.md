# Structure and Sky Studios - Logo Kit (v1.0)

Brand colours: Ink #0E1824 · Ivory #F2EBDD · Brass #C8A064 (deep brass #A87C3E on light) · Slate #6B6F75

| Folder | What it is |
|---|---|
| `production/` | Master artwork as plain filled outlines (no masks, no strokes). Use these for print, signage, embroidery. `mark-*` = full mark, `mark-small-*` = small cut (under 32 px / 9 mm). Colours: ink, ivory, black, white, brass. |
| `lockups/` | Horizontal and stacked lockups (SVG). Wordmark is outlined (no font needed). |
| `png/` | Transparent PNGs of the marks (2000 px) and lockups (3200 / 2304 px wide) for Canva, Word, slides. |
| `web/` | favicon.ico, favicon.svg, apple-touch-icon, 192/512/maskable icons, site.webmanifest, head-snippet.html |
| `documents/` | A4 header strip (2480x340, 300 dpi) for invoices and fee proposals, SVG + PNG |
| `video/` | `intro-sequence/` 144 transparent PNG frames, 1920x1080, 24 fps (about 6 s) to import as an image sequence; low-opacity white watermarks (mark and lockup) |
| `guide/` | One-page usage guide (PDF + HTML) |
| `animated-logo.html` | The live animated logo. Add `?clean=1` to hide the buttons, `&transparent=1` for a see-through background, `&t=4.5` to freeze at a moment |
| `logo-sheet.html/.png` | Overview sheet |
| `source/` | Python scripts that generate the files (run from this folder, e.g. `py -3 source/production.py`). `build.py` is the original geometry. Needs shapely and pillow. |

## Typography
Wordmark: Montserrat (SIL Open Font License 1.1, free for logo use). "STRUCTURE" Bold 700, "& SKY" Light 300, "STUDIOS" Regular 400 in slate, all converted to outlines. Font file and licence: `source/fonts/`. Re-run `py -3 source/lockups.py` to rebuild lockups.

## Open items
1. Trademark clearance has not been searched.
2. Video: no encoder was available here, so the intro is delivered as a PNG sequence rather than an MP4.
