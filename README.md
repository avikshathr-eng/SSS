# Structure and Sky Studios website

Next.js 16 (App Router), Tailwind 4, Framer Motion, Photo Sphere Viewer.

## Run

```bash
cd sss-website
node node_modules/next/dist/bin/next dev -p 3100
```

The `&` in the folder name breaks the `npx` and `npm run` shims on Windows, so call Node directly as above. Renaming the parent folder removes the problem.

Production check: `node node_modules/next/dist/bin/next build` then `... start -p 3100`.

## Where things are

| What | Where |
|---|---|
| Contact details, booking link, nav, audiences | `src/lib/site.ts` (empty values render as marked placeholders) |
| Project titles, categories, tags | `src/lib/projects.ts` |
| Image list and sizes | `src/lib/images.generated.json` (generated) |
| Design tokens | `src/app/globals.css` |
| Quote and checklist intake | `src/app/api/quote/route.ts` (not connected to email or CRM) |
| Strategy, copy and decisions | `docs/website-strategy.md` |

## Not real yet

Placeholders are drawn with a dashed brass border and the words "Placeholder: replace before launch". The quote form reports "Preview mode ... not delivered" until a service is connected.
