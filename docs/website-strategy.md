# Structure and Sky Studios: website strategy

Sources: `Structure and Sky Studios - Business Plan.pdf`, `HANDOFF.md`, the 35 project folders in `Projects.zip`, and the draft site. Anything not found in those is marked **[assumption]** or **[owner to supply]**. No client names, testimonials, metrics or press are invented anywhere in this document or the site.

## 0. What the evidence says

| Finding | Source | Consequence for the site |
|---|---|---|
| Primary buyer is the mid-market developer (55-65% of Y1 revenue), then architects, interior designers, brokers, with custom builders and owners as a productized tier | Plan §3 | Two entry doors on the home page, developer first |
| Winning claim is "one accountable studio" and "we build what does not exist yet" | Plan §1, HANDOFF §6 | Hero headline and "why" section |
| What wins a deal: schedule tied to launch date, one point of contact, a case study with sell-through numbers | Plan §3 | Quote form asks for launch date; proof section reserved for a real case study |
| The portfolio is 35 projects, mostly hospitality, fuel and retail, residential and commercial in Texas, Georgia and Arizona. It does not contain the luxury towers shown on the draft site | `Projects.zip` | Positioning is "developers and builders of everyday and hospitality assets", not "luxury high-rise". The draft's invented projects were removed |
| Package prices exist in the plan; the owner chose to hide prices | Plan §4, owner | Packages shown with contents and schedule, no prices; "quote" CTAs |
| No videos can be previewed yet (no ffmpeg) | Environment | Hero is a still render with a drawn orbit; a video hero is a drop-in once a reel is cut |

## 1. Site map and navigation

```
Home
├── Work (filterable) ── Project detail ×35
├── Services (3 packages + a la carte + aerial)
├── Process (8 steps)
├── Technology (about, stack, team, certifications)
├── Submit your plan (quote + upload)  ← primary conversion page
└── Contact (booking call, email, phone)
```

| Element | Content |
|---|---|
| Primary menu | Work, Services, Process, Technology, Contact |
| Persistent CTA (header button) | Submit your plan |
| Secondary CTA | Book a discovery call |
| Utility links | Homeowners and sellers (`/submit-your-plan?path=owner`), email, phone **[owner to supply]** |
| Footer | Logo, one-line positioning, lead-magnet capture, site links, contact, "Serving the United States and Canada" |

### Journeys

**Developer, architect or broker (B2B).** Home hero → "Developers, architects and brokers" door → Submit your plan (role preselected, launch date asked) → quote. Alternate: Work → project → Submit. Alternate: Services → package → Submit. Hesitant visitors: Book a discovery call, or the checklist.

**Homeowner, builder or seller (B2C).** Home → "Builders and homeowners" door → Submit your plan (`?path=owner`, role preselected, "when do you need it" instead of "sales launch date") → quote. Fixed packages keep this segment from consuming senior time (Plan §3, ICP 5).

## 2. Homepage: the story is the site

Direction after the first review: premium, minimal, story-led. The site is built as the studio's method, shown on real renders, so a client sees how the work is done before they speak to anyone.

| # | Section | What the visitor sees | Copy |
|---|---|---|---|
| 1 | Opening (pinned, scroll-driven) | One real camera, three stages of the same project. A line drawing of the building, wiped by a brass scan line into a clay model, then the finished render. The headline changes colour exactly where the line passes. Reduced-motion users get the final render. | **We build what doesn't exist yet.** Stages: Plan, Model, Render. Buttons: Submit your plan, See the work |
| 2 | Promise | Large statement, four short commitments | **One studio, from the first line to the final frame.** One producer. Your date leads. Views locked early. NDA on request |
| 3 | How a plan becomes a launch | Sticky step list beside seven large panels, all from real projects: site massing, line drawing, clay, a brick-or-stone drag slider (same camera, two real facade options), render, film, delivery | One short sentence per step |
| 4 | Work | Horizontal reel of eight projects with a "Film" marker where a project has video | **Work** · All 35 projects |
| 5 | Film | Click-to-play real project film | **Film** |
| 6 | Services | Four image panels | Renders · Walkthroughs · Aerial · Interactive |
| 7 | Step inside | Real 360° views, loaded on click | **Step inside** |
| 8 | Trust | Three marked placeholders | **Trusted by** |
| 9 | Close | Full-bleed night render | **Send us your plan.** Submit your plan · Book a discovery call |

Trust is built through process transparency (sections 2 and 3) because no client names, testimonials or metrics were supplied. Those slots are placeholders until real ones exist.

### Where the draft prompt asked for something the evidence does not support

| Requested | Decision |
|---|---|
| Client logos, featured press | Placeholder only. Nothing real supplied |
| "Sold out pre-construction 40% faster" style metrics | Placeholder only. Publish a figure only after a client approves it |
| CAD floor plan morphing into a render | Not built: no CAD/render pairs exist in the supplied files. Replaced by a real day-to-dusk pair. Build the plan reveal once one project has both files |
| Interactive pricing estimator | Built as a **scope builder** that shows a package and schedule, not a price, per the owner's decision |

## 3. Inner pages

### Services (`/services`)
- **Goal:** let a developer pick a package in under a minute and request a quote.
- **Structure:** headline → three package cards (Essential, Professional, Enterprise; contents, "best for", typical schedule: 7 to 10 business days, 3 to 4 weeks, 6 to 10 weeks) → aerial and drone capture → a la carte list → retainers note → quote CTA.
- **Copy focus:** what is delivered, in the plan's own counts (for example 4 exterior renders day and dusk, 45 to 60 second walkthrough, 60 second sales reel and 3 vertical cuts).
- **Conversion:** a quote button inside every package; no prices.

### Work (`/work`, `/work/[project]`)
- **Filters:** All, Hospitality, Retail and fuel, Residential, Commercial and industrial, Community and landscape, Interiors, Aerial and site.
- **Project page:** title, categories, location only where the source states it, masonry gallery with a keyboard-navigable lightbox, next-project link, quote CTA.
- **Titles are descriptive** (for example "Hotel with rooftop terrace"). Client and franchise names from the folders are not used until the owner confirms they may be shown.

### Submit your plan (`/submit-your-plan`)
- **Fields:** name, work email, company, role (six audiences), project city and state, date, deliverables (eight), file upload, notes, NDA checkbox.
- **Upload workflow:** accepts PDF, DWG, DXF, RVT, SKP, 3DM, PLN, IFC, images, ZIP up to 25 MB each; larger files are described in notes and followed by a transfer link. **[assumption]** Production should use direct-to-storage upload (S3 or Vercel Blob with signed URLs) to remove the 25 MB cap.
- **Reassurance copy:** three-step explainer; NDA option; "no cold follow-up sequences".
- **Role-aware:** `?path=owner` preselects the owner audience and changes the date label.

### Process (`/process`)
Eight steps from the plan: intake, model ingestion, clay and camera approval, materials and lighting, review rounds, aerial capture, compositing and edit, delivery and archive. Day ranges are the plan's. Two reassurance blocks: revisions and change orders, confidentiality.

### Technology (`/about`)
Positioning versus offshore render farms and local video shops (from the plan), the software stack (from the plan), and two marked placeholders: team, and certifications and insurance. Do not publish licences or insurance until they are held (the plan lists them as first-30-day tasks).

## 4. Calls to action

| CTA | Where | Behaviour |
|---|---|---|
| Submit your plan (for a quote) | Header, hero, every package, closing | Opens the quote form |
| Get a project quote / Upload your floor plan | Home doors | Same form with the role preselected |
| Book a discovery call | Closing, contact | Goes to `site.bookingUrl`; falls back to the contact page until a URL is set |
| Send this scope with your plans | Scope builder | Quote form with deliverables pre-ticked |
| Send me the checklist | Footer | Email capture (see §6) |

The three CTAs suggested in the brief map as follows: "Request a 3D Render Quote" and "Upload CAD/Floor Plans" are both **Submit your plan**, deliberately merged into one path; "Book a Project Discovery Call" is kept.

## 5. Design system

- **Palette, "umber and brass":** Umber `#12100D` and Umber 2 `#1A1713` for dark sections; Bone `#EFE9DE` for light sections; Brass `#B8924E` (and `#D3B176` on dark, `#7A5A25` for brass text on bone). Replaces the earlier dark blue. The renders carry all the colour.
- **Type:** Instrument Serif for voice (headlines, project names, numerals) and Hanken Grotesk for reading and interface. Sentence case throughout; no all-caps labels. Scale: display up to 9.5rem, h1 6.4rem, h2 4.4rem, h3 2.2rem, body 17px. Body lines stay under 62 characters.
- **Logo:** the horizontal lockup at 68px in the header (48px when scrolled) and the stacked lockup at up to 224px in the footer. The ink version is used over the cream drawing stage, the ivory version everywhere else.
- **Memorable element:** the plan-to-render opening. Everything else is quiet.
- **Motion:** the pinned opening, a one-time clip reveal on process images, hover and press responses, inertial scrolling (disabled for reduced motion).
- **Copy:** each section has a one-word or one-line title and at most one sentence beneath.
- **References studied:** zoa3d.com (full-bleed imagery, one oversized headline, hairline structure) and archicgi.com (three-panel service entry, four-step process). Neither is copied; the studio's own method and real renders drive the layout.

### Image and video treatment
- 269 renders curated from 35 projects (weak, duplicate and low-value frames dropped), levelled, softly contrasted, warm-graded and sharpened, resized to 2600 px.
- One third-party watermark (bottom-right "SDC" on all eight images of the Fulton County project) was removed by cropping the bottom 300 px of each image.
- 18 project videos are encoded to H.264 (1080p, no audio, fast-start) and posters extracted. They load only when played.
- The drawing and clay stages of the opening are generated from the finished render of the same camera (edge detection and tone mapping). They illustrate the stages; they are not archived project files.

## 6. Technical and performance

| Area | What is built | Recommendation |
|---|---|---|
| Framework | Next.js 16 App Router, React 19, Tailwind 4, Framer Motion, Photo Sphere Viewer | Keep. Deploy on Vercel |
| Images | 269 renders resized to max 2400 px, served through `next/image` as AVIF/WebP with `sizes`; hero is `priority`, everything else lazy | Move originals to Vercel Blob or Cloudflare R2 so the repo stays small (currently about 170 MB of media) |
| 360° | 8192×4096 panoramas; library and files load only after "Enter" | Add a 4096 px mobile variant |
| WebGL / Three.js | Not used. Photo Sphere Viewer covers the 360° need | Use Three.js only for a future model viewer; load it on interaction |
| Video | 18 project films, click to play, about 220 MB in `public/video` | Move to Mux or Cloudflare Stream (adaptive HLS) before launch so mobile visitors are not served 1080p files. Cut a showreel for the opening |
| Lead capture | `/api/quote` validates and, in development only, writes `.leads/leads.jsonl`. It reports honestly that nothing is delivered | Connect Resend (email) and HubSpot Starter (CRM), the plan's stack. Flip `delivered` once connected |
| SEO | Per-page titles and descriptions, Open Graph image, `ProfessionalService` JSON-LD with US and Canada area served, descriptive alt text | Add `sitemap.xml`, `robots.txt` and `ImageObject` schema per project once the domain is known |
| Local SEO | None yet | The plan calls for city landing pages ("architectural rendering Austin", "drone real estate video Toronto") each with a local gallery. Build `/cities/[city]` for the six first-wave metros only when each has real local projects, to avoid thin pages |
| Accessibility | Skip link, visible focus, labelled controls, keyboard lightbox and slider, reduced motion | Run an axe pass before launch |
| Analytics | None | Track `submit_plan_started`, `submit_plan_sent`, `book_call_click`, `checklist_sent` |

## 7. Owner to supply before launch

1. Real email, phone, booking link, domain, social links (`src/lib/site.ts`).
2. Permission to show client and franchise names, or confirmation to keep titles generic.
3. Confirmation that every render is the studio's own work (see the review notes in the hand-over message).
4. At least one case study with approved sell-through numbers; a testimonial; client logos.
5. A showreel and hero loop, and ffmpeg (or an edit) to make them.
6. The Pre-construction Media Checklist as a PDF.
7. Team, certifications and insurance wording.
8. Email and CRM credentials for the quote form.
9. A trademark search for the logo (open item in HANDOFF §4).
