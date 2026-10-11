# Structure and Sky Studios - Project Handoff

Written 2026-10-10 at the end of the logo and brand-kit session. Read this first in any new session.

## 1. The business (from `Structure and Sky Studios - Business Plan.pdf`)
- Pre-construction visualization studio: stills, 3D animation, drone/aerial capture, sales films, Unreal interactive tours. One vendor, one contract, one schedule.
- Mission: turn plan sets and BIM models into marketing assets that move buyers, lenders and planning boards.
- Positioning: for developers and architects who need to sell or approve a project before it is built. Unlike offshore render farms, it owns the narrative and the North American on-site work. Unlike local video shops, it can build what does not exist yet.
- Clients: mid-market residential and mixed-use developers (primary, 55-65% of Y1 revenue), architecture firms, interior designers, brokers, custom builders/owners.
- Packages (USD): Essential $3,500-$6,500 · Professional $14,000-$28,000 · Enterprise $45,000-$120,000+. A la carte rate card and retainers ($4,500-$25,000+/month) are in the plan.
- First metros: Dallas-Fort Worth, Austin, Phoenix, Nashville, Toronto, Vancouver. Home base for drone/film: Northwest Arkansas.
- The plan contains no brand direction (no colours, style or logo preferences). All brand decisions below were made in this session.

## 2. Brand decisions
- Brief from the owner: premium, architectural, warm, minimal. Elegant, rich colours that blend and suit the work. Must not disturb renders or videos. Used on website, invoices, fee proposals, videos, renders. Name is read "Structure and Sky Studios"; "SSS" also works.
- Owner rejected: S monogram, corner-bite block, sun-disc with tower (too common).
- Chosen concept (owner: "logo looks good", no changes): a tower of six chevron floors (structure + a render built layer by layer), a lifted outline roof (the building before it exists), and an open orbit arc, thick in front and hairline at both ends, with a brass drone dot just past its tail (the sky and the aerial camera). Small cut for tiny sizes: 4 heavier floors, thick roof, no arc.
- Wordmark: "STRUCTURE" Montserrat Bold 700 + "& SKY" Montserrat Light 300 (heavy vs light = structure vs sky), "STUDIOS" Montserrat Regular 400, widely tracked, slate. Montserrat is SIL OFL 1.1 (free for logo use); all lettering is outlined.
- Colours: Ink `#0E1824` · Ivory `#F2EBDD` · Brass `#C8A064` · Deep brass `#A87C3E` (brass on light backgrounds) · Slate `#6B6F75`. CMYK values in the guide are straight conversions; proof before printing.
- Usage rules (full version in `logo/final/guide/`): master mark min 32 px / 9 mm; small cut down to 16 px / 5 mm; horizontal lockup min 120 px wide; clear space = 1/6 of mark height. Over renders/video use the white mark at 60% opacity, bottom-right, 4% margin. Never stretch, recolour, rotate, add effects, move the dot off its orbit, or outline the mark.
- Animation (`animated-logo.html`, about 5 s): wireframe draws, floors build bottom to top, roof lifts, drone spirals up from the base with a comet trail, arc draws in, drone patrols the arc; wordmark fades in. Click to replay, hover speeds the drone. Params: `?clean=1` hides buttons, `&transparent=1` see-through background, `&t=4.5` freezes at a moment, `&theme=light`. Respects reduced motion.

## 3. Files - `D:\STRUCTURE&SKYSTUDIOS\logo\final\`
| Folder / file | Contents |
|---|---|
| `production/` | Master artwork as plain filled outlines (no masks/strokes): `mark-{ink,ivory,black,white,brass}.svg` and `mark-small-*.svg` |
| `lockups/` | `lockup-horizontal-*.svg`, `lockup-stacked-*.svg` (ink, ivory, black, white), wordmark outlined |
| `png/` | Transparent PNGs: marks 2000 px, horizontal lockups 3200 px, stacked 2304 px |
| `web/` | favicon.ico, favicon.svg, apple-touch-icon, icon-192/512, maskable-512, site.webmanifest, head-snippet.html |
| `documents/` | A4 header strip for invoices and fee proposals (2480x340, SVG + PNG) |
| `video/` | `intro-sequence/` 144 transparent PNG frames (1920x1080, 24 fps), watermarks (mark, small, lockup; white at 60%) |
| `guide/` | One-page usage guide (PDF + HTML + preview PNG) |
| `animated-logo.html` | The live animated logo |
| `logo-sheet.html/.png` | Overview sheet |
| `source/` | Python scripts that regenerate everything (run from `logo/final`, e.g. `py -3 source/lockups.py`); `source/fonts/` holds Montserrat + OFL.txt. Needs shapely, fonttools, pillow. |
| `README.md` | Folder-by-folder index |

Earlier concept rounds, test renders and superseded masters were deleted from `logo/`.

## 4. Open items
1. Trademark clearance not searched. A tower with a floating roof is a common idea; get a professional search before launch.
2. Intro video is a PNG sequence only. ffmpeg is not usable yet: the file in Downloads is the source tarball (`ffmpeg-9.0.2.tar.xz`), not a program. Need a prebuilt Windows build (or `winget install Gyan.FFmpeg`). Planned outputs: MP4 on ink, transparent ProRes 4444 MOV, short end card.
3. Last frames of the intro sequence show the drone already patrolling, so the final frame is not the exact still logo. Cut near frame 100 and hold the still, or add a settled end frame.
4. Colour proofs: CMYK/Pantone not matched.
5. `C:\Users\aviks\.claude\settings.json` is invalid JSON: two separate `{...}` objects, the second (the `"permissions"` block) starts at line 60. The permissions block must be moved inside the first object. Not edited by Claude (it is a permissions file). Until fixed, plugin installs fail and the permission rules are not active.

## 5. Tooling state
- Logo plugin: `logo-design@logo-design-skill` (user scope).
- Skills installed in this project (`.agents/skills/`): context-window-design, conversation-patterns, generative-ui, progressive-disclosure, multimodal-orchestration, mixed-initiative-flow, frustration-detection, feedback-loops, system-prompt-structure, persona-architecture, tone-calibration, emotional-design, template-design, few-shot-patterns, chain-of-thought-design, constraint-specification, guardrail-design, trust-calibration, transparency-patterns (all Owl-Listener, AI-conversation design, not needed for the website), plus algorithmic-art, animate, brandkit, canvas-design, design-motion-principles, theme-factory.
- Already available from earlier installs: frontend-design, impeccable, taste-skill, banana-claude (installed, disabled), remotion-superpowers (installed, fails to load: hook config error in the plugin), Playwright MCP, Vercel plugin/tools.
- Not installed: blender-motion, aftereffects-motion (the repo's SKILL.md files have broken YAML; its only valid skill is `motion-design`), nano-banana (blocked by the settings.json error), designer-skills' 33 plugins (marketplace added only), `npx create-video@latest`, Composio marketplace (repo has no marketplace file; theme-factory installed as a skill instead).
- The website page's advice: stack four, not forty-two. Base taste (one of frontend-design / impeccable / taste-skill) + animate + theme-factory + playwright.

## 6. Website plan (next session)
Stack: one base taste skill + animate + theme-factory (tokens from the palette above, no one-off hex values) + Playwright screenshots at desktop and phone widths. Deploy target available: Vercel.
- Pages: Home (animated logo opening, one-line promise, services, work samples), Services (3 packages + a la carte), Work, Process (plan set to final film), Contact.
- Build first with clearly marked placeholder images and copy, then swap in real content.
- Messaging to lead with: one accountable studio; visuals as a capital-markets and sales tool, not a design deliverable; "we build what does not exist yet".

Content needed from the owner: work samples (renders, walkthroughs, drone clips, showreel); contact details and markets served; proof (client names, testimonials, ideally one case study with sell-through numbers); decision on showing prices publicly vs "from $X"; domain name and hosting.

---

# Website build (added 2026-10-11)

## 7. What exists
- **Site:** `sss-website/` (Next.js 16, Tailwind 4, Framer Motion, Lenis, Photo Sphere Viewer). Run: `cd sss-website` then `node node_modules/next/dist/bin/next dev -p 3100` (the `&` in the old folder name breaks npm/npx; rename the parent folder to `STRUCTUREANDSKYSTUDIOS`, still pending because the session held it open).
- **Live:** https://sss-website-ten.vercel.app (Vercel project `sss-website`, account `avikshathr-eng`). **Repo:** https://github.com/avikshathr-eng/SSS (branch `main`, linked to Vercel, so a push to `main` redeploys).
- **Strategy and copy:** `sss-website/docs/website-strategy.md`. **Run notes:** `sss-website/README.md`.
- **Pages:** Home, Work (+ project pages), Services, Process, Studio (`/about`), Submit your plan, Contact.

## 8. Decisions made
- **Positioning:** "We build what doesn't exist yet." One studio from first line to final frame. Story-led and minimal; trust comes from showing the method, not from invented proof.
- **Design:** "umber and brass". Palette: Umber `#12100D`, Umber 2 `#1A1713`, Bone `#EFE9DE`, Brass `#B8924E` (`#D3B176` on dark, `#7A5A25` for text on bone). Type: Instrument Serif (voice) + Hanken Grotesk (reading). Replaced the earlier dark blue. Header logo 68 px, footer stacked logo up to 224 px.
- **Signature element:** pinned plan-to-render opening on the home page. One camera (a convenience-store project) shown as line drawing, clay, then final render, wiped by a brass scan line. The drawing and clay stages are generated from the render, so they illustrate the stages.
- **References studied:** zoa3d.com and archicgi.com (full-bleed imagery, one oversized headline, short step sections).
- **Pricing on site:** hidden; packages show contents and typical schedule only (Essential 7-10 business days, Professional 3-4 weeks, Enterprise 6-10 weeks, phased).
- **Brand logos inside renders** (Super 8, Fairfield, Shell/Amoco and others): owner said leave them; will flag if a problem.
- **Private residence render with a street number:** owner said fine.
- **Watermark:** one third-party "SDC" mark on the 8 Fulton County images was removed by cropping the bottom 300 px.

## 9. Assets and pipeline
- Source files: `Projects.zip` (35 projects). Unzipped copy in `_source-projects/` (5.5 GB; safe to delete once finished).
- 269 renders curated, levelled, warm-graded, sharpened, resized to 2600 px into `sss-website/public/work/pN/`. Generated manifests: `src/lib/images.generated.json`, `src/lib/videos.generated.json`.
- 18 project films encoded to H.264 1080p (no audio) into `public/video/pN/` with posters. ffmpeg was installed with winget (`Gyan.FFmpeg`). The scripts that did this lived in the session scratchpad and are not saved; re-create them if the source files change.
- 360° panoramas: `public/vr/pool-1..3.jpg` (project 8). Story images: `public/story/` (project 24).
- Titles are descriptive. Real client and franchise names are deliberately not shown.

## 10. Still open for the website
1. Placeholders to fill: client logos, testimonial, case study with numbers, team, certifications and insurance, email, phone, booking link (`src/lib/site.ts`), domain.
2. Quote form and checklist signup do not send anything yet (`src/app/api/quote/route.ts`); connect Resend plus a CRM. The Pre-construction Media Checklist PDF has not been written.
3. Videos (~220 MB) should move to Mux or Cloudflare Stream before launch.
4. Rename the parent folder (see section 7). Trademark search for the logo (section 4, item 1).
5. Ideas raised but not applied (owner reverted them): tighter spacing in "How a plan becomes a launch" and cutting the portfolio from 35 to about 19 stronger projects. Known issues in the live version: the Model step's panel can render blank if you jump to it, and the mobile crop of the opening shows only the middle of the building.

## 11. Facts the finance box can rely on (all from the Business Plan PDF)
- Currency: USD; quote Canadian clients in CAD at about 1.35x, rounded to clean numbers.
- Packages (USD): Essential $3,500-$6,500; Professional $14,000-$28,000; Enterprise $45,000-$120,000+. A la carte rate card and retainers ($4,500-$25,000+/month) are in the plan section 4.
- Payment terms: 50% deposit on projects; 40/30/30 milestones on Enterprise. Design changes after model lock are change orders at $110-$150/hour. Credits expire after 90 days and roll over once. Usage licence covers marketing for the named project only; resale or ad-network use is priced separately. Revision rounds: Essential 2, Professional 3, Enterprise unlimited within scope.
- Brand for documents: A4 header strip at `logo/final/documents/`, lockups in `logo/final/lockups/`, colours above. Guide: `logo/final/guide/`.
- Financial baselines for the balance sheet: startup capital $95K-$135K, Year 1 base case revenue $530K, gross profit $250K, operating expenses $195K, EBITDA $85K (plan section 7). These are planning assumptions, not actuals. A balance sheet needs real figures (bank balance, receivables, payables, equity); none have been provided.
