# Application Dossiers — Handoff

## 2026-10-23: False Business Claims Corrected — $1M Attribution and Exit Deleted

### Current State
- **Terence corrected the record, and the old copy was wrong**: the $1M is revenue he generated **for clients**, not agency revenue and not his income. His personal take was a few thousand. The "exit" was a few hundred dollars and is worthless as proof. Both are fixed at the source.
- **Shared Venn component** (`BusinessTechIntersection.tsx`, used by Google and OpenAI): Venn now reads `$1M+ client revenue` and `Forbes 30 Under 30`; the card below reads stat `$1M+` / "Revenue generated for clients" and `Forbes` / "30 Under 30 · DACH, 2022". `St. Gallen · UBS` is out of the Venn (HSG still lives in the career timeline where it belongs). Tech side: `8× hackathon winner` is one full-weight line, `mostly solo` stays at primary weight, and HackZurich is `HackZurich top 3 / 1,600` — never "3rd overall" without the denominator.
- **Google card text** (`GoogleApplicationPage.tsx`, "Ramp it, then prove it"): now ends "$1M+ in revenue generated for clients. Forbes 30 Under 30 in DACH." The `$1M+ agency revenue, 1 exit. St. Gallen M.A...` sentence is gone. Same fix in `SideProjectsGrid.tsx`: NeverAlone.ch stage is no longer "Exit".
- Grep confirms zero remaining `1 exit`, `agency revenue`, `Agency founder`, `St. Gallen · UBS`, or `HackZurich 3rd` in `app/`. Lint 0 errors, build pass. Venn screenshotted at 1440 in dark and light on `/google` (`public/screenshots/google-venn-fixed.png`, `google-venn-fixed-light.png`); all lines fit inside the circles, nothing under the centre badge.
- **Exact next step**: Terence reviews `https://google.terencela.com`. Standing rule for every future claim: strong fact + correct attribution + denominator, or the line does not ship.

---

## 2026-10-21: Business × Tech Cards Cut Down

### Current State
- **Terence: "that's way too much." Correct.** The three cards under the Venn were full paragraphs: each side stat carried a title plus a 2–3 line explanation, and the centre carried four blocks with long descriptions. The cards were roughly 730px tall.
- **Now proof only.** Side columns are stat + one line (`32M+` AI Lead at Zurich Airport, `$1M+` agency founder with 1 exit, St. Gallen M.A.; `8×` hackathon, `20+` products since GPT-3, `2 weeks` app for 35,000 staff). The explanatory details are gone from this section because every one of those facts has a home elsewhere (Forbes in the ticker, St. Gallen in Why-me, CHF 200K and voice AI in the deployments). Centre keeps its four Google lines (three on OpenAI) with one short clause each. Card subtitles deleted. Cards now run about 330px.
- Applies to both pages; the component is shared (`BusinessTechIntersection.tsx`), `overlapSubtitle` prop removed from both callers.
- Verified: lint clean, build pass, Playwright Google and OpenAI at 1440 light/dark plus Google 390 dark. Nothing clips, the Venn and tabs are untouched.
- **Exact next step**: Terence reviews `https://google.terencela.com`. If the centre column still reads long, cut its descriptions next, not the side stats.

---

## 2026-10-21: Photos Back in Colour — Grayscale Filter Removed

### Current State
- **Terence asked why everything is black and white. He was right about the imagery**: two CSS rules in `globals.css` forced `filter: grayscale(100%)` on every dossier profile photo (`.dossier-profile-frame img` and `.dossier-loom-panel .dossier-profile-photo`). That greyscaled colour material that was never meant to be monochrome: the 90-second video poster (cream sweater, warm room) and the Google Explore editorial photo. Both rules are deleted.
- **What stays black and white on purpose**: the typography system (paper/ink, per his colour-discipline call) and the hero headshot, because `/images/terence-la-profile.png` is itself a black-and-white photo file. No CSS can colour it. If Terence wants a colour hero portrait, he sends a colour headshot and it is a one-line swap.
- **Scope**: the rules were shared, so Salesforce/ElevenLabs covers also render in natural colour now. No text, number or icon colour changed anywhere.
- Verified: computed filter on the video cover is `none` in light and dark; build pass; Playwright at 1440 light/dark (OpenAI hero + video panel, Google Explore panel) and 390 dark (OpenAI video, colour still, nothing clipped). Preview restarted on `http://localhost:3008`.
- **Exact next step**: Terence reviews `https://openai.terencela.com`. Only open colour question left is the hero headshot, which needs a colour source file from him.

---

## 2026-10-21: Google Page Optimised for the Actual Position

### Current State
- **Researched the real posting first**: the Zurich role is **AI Outcome Customer Engineer, Google Cloud** (GTM AI Tech). Core of the job: bridge pre-sales shaping and post-sales execution, shape for adoption and rapid activation, upfront technical design into customer data/identity/compliance, code-level debugging of blockers, field feedback into product, ramp to measurable business outcomes. German is a stated preferred qualification. Header, applying line and meta now use the official title.
- **Hero lead rewritten to the job**: "from agreement to daily use: shape the outcome with the customer, build it in code, and clear data, security and procurement until people actually use it."
- **Why-me cards rewritten from generic to the role's three moves**, each with proof already on the page: "Shape for adoption" (voice AI discovery to formal tender, PoC in two weeks), "In the code when it breaks" (20+ products, agent loops/hybrid RAG/evals, debug instead of escalate), "Ramp it, then prove it" (35,000 staff app, field feedback into product asks, $1M+/1 exit/St. Gallen). The triangle in card three now reads Customer, Product, Outcome. German/Swiss German + English is now a fourth Venn overlap power on Google; it was missing entirely.
- **Section order fixed**: hero → Venn → What I bring (role fit) → From pilot to production (deployments, renamed with the agreed-outcome line) → Explore my work → projects → close. Proof now lands before the ask panel instead of after it. No Vertex AI or Gemini experience is claimed anywhere; the record is model-neutral deployment, framed as ramp work for Google Cloud customers.
- Verified: lint clean, build pass, Playwright at 390 / 768 / 1440 in light and dark, hero, Venn, Why-me and deployments inspected. Preview restarted on `http://localhost:3008`.
- **Exact next step**: Terence reviews `https://google.terencela.com`. If he records a Google-specific intro take later, it gets its own file and section; the OpenAI video stays OpenAI-only.

---

## 2026-10-21: Nuance Restored — Depth Without Coloured Text

### Current State
- **Terence's follow-up, also correct**: the colour pass had flattened dark mode to pure black. Binary over-correction. Nuance is back, colour stays out of text.
- **What carries depth now**: page background is a layered top glow (`#0e0f14` to `#090a0e` with a warm paper radial at the top, never flat `#0a0b0f`), the mesh and floating orbs use the company colour at single-digit effective opacity in the background only, and the profile frame has its offset back in tonal values (cream `#eae7de` in light, charcoal `#1b1c24` in dark, not the old bright beige slab).
- **Unchanged from the colour fix**: every word, number and icon on `/openai` and `/google` is ink or muted in both themes. The atmosphere is the only place colour lives.
- Verified: build pass, Playwright at 390 / 768 / 1440 in light and dark on both pages. Dark hero now reads as layered charcoal with a faint company glow at the top, light hero as warm paper with the cream photo offset.
- **Exact next step**: Terence reviews `https://openai.terencela.com`. If the glow is still too much or too little, tune the orb/mesh opacity in `globals.css`, do not reintroduce coloured text.

---

## 2026-10-21: Self-Hosted 90-Second Video, Now Second Section (OpenAI)

### Current State
- **Raw file was not uploadable as-is**: the MOV from Downloads is 111 MB, HEVC, portrait 1080×1920, 82 seconds. GitHub rejects files over 100 MB and HEVC MOV does not play in Chrome or Firefox. Terence's re-shot take is the content, the format was the blocker.
- **Transcoded for the web**: `public/videos/terence-90s.mp4` is H.264 + AAC, 720×1280, faststart, 23 MB. Poster still at 8s in `public/videos/terence-90s-poster.jpg` (waving frame; in colour since the grayscale pass was removed). Range requests work (`Accept-Ranges: bytes`), and the file only downloads after the play click.
- **Video is the second section** on `/openai` only (Google has no video): hero → "Terence in 90 seconds" → Business × Tech → deployments → projects → Davos close. It replaces the Loom embed. `LoomVideoFrame` gained `videoSrc`/`videoPoster` props (local `<video>` inline and in modal), so Salesforce and ElevenLabs Loom usage is untouched.
- **Preview is the panel, playback is the modal** (Terence, 21 Oct): the preview must be the panel with the waving poster frame from 8s, in both themes. An earlier inline build replaced the panel with a full-width portrait video after the click and read as a giant face in the page flow. Now the click opens the portrait video in a modal (max 420px, native controls, Close), and the page behind keeps the panel preview. Do not switch this back to inline.
- Verified: lint clean, build pass, Playwright at 390 / 768 / 1440 in light and dark. Play click tested programmatically in both themes (video unpaused, currentTime advancing, readyState 4, duration 82.3s). Preview restarted on `http://localhost:3008`.
- **Exact next step**: Terence watches the take once on `https://openai.terencela.com`. If he re-shoots, drop the new MOV on the same transcode settings and keep the filename, no code change.

---

## 2026-10-21: Colour Discipline — Brand Colour Out of Text (OpenAI + Google)

### Current State
- **Terence's call, correct**: pastel Google blue (`#8ab4f8`) and OpenAI teal (`#10a37f`) were painted as text, numbers and icons on paper in light mode and on black in dark mode. Optical clash with the grayscale portrait. Fixed on `/openai` and `/google` only. Salesforce/ElevenLabs untouched.
- **System is now paper + ink in both themes** (`#fafaf8`/`#1a1a1a` light, `#0a0b0f`/`#f4f2ec` dark): applying lines are muted, hero stat numbers are ink (stat row kept, per the 10-second-scroll rule), Why-me icons/diagram are ink on paper tiles, `--hero-accent` is neutral grey `#73736d`, background orbs/mesh no longer tint green/blue.
- **Profile frame fixed**: the hardcoded beige `16px 16px 0` offset slab (`#d8d4cb` mixed with accent) is gone in both themes. Now a soft neutral shadow; dark mode uses `#14151b` ground.
- **Ask bar fixed at the source**: `globals.css` hardcoded `#8ab4f8` for the search icon in dark mode and the focus ring on every dossier. Now muted/ink via theme vars.
- **Venn rebuilt theme-aware** (`BusinessTechIntersection.tsx`): light = cream paper circles with ink text; dark = charcoal circles with paper text. No more dark circles on a white card. Stat numbers in all three cards are ink (Tech was accent-coloured). Active tab/cards use ink, not brand colour. Bug found in QA: Tailwind `text-[var(--dossier-bg)]` generated no colour rule, leaving the active tab label invisible (same colour as pill). Active tab now uses inline style with the theme vars; verified computed contrast in both themes.
- Verified: lint 0 errors, build pass, Playwright screenshots at 390 / 768 / 1440 in **both light and dark** on `/openai` and `/google`, including scrolled Venn + Why-me views. Preview restarted on `http://localhost:3008`.
- **Exact next step**: Terence reviews `https://openai.terencela.com` and `https://google.terencela.com`; then re-shoot the OpenAI 90-second Loom (script in the entry below).

---

## 2026-10-21: Applying Lines, Light Default, Google Venn, Relevant Stats

### Current State
- **Both heroes now say he is applying**: OpenAI — "I'm applying for the Forward Deployed Engineer role in Zurich." Google — "I'm applying for the Outcome Engineer role in Zurich." One plain line above the H1, in the company accent. No longer reads as a personal branding page.
- **Light mode is the default** for new visitors on all dossiers (layout init script + `dossier-theme.tsx`). A saved choice still wins, the toggle still works, dark was spot-checked after the change.
- **Google stats replaced**: the contextless `35K staff app` and `30h to 3h` are out of the hero (both still live in their deployment cards, where they have context). Hero now: `8×` hackathon winner mostly solo, `20+` AI products built / GPT-3 since 2020, `32M+` passengers a year at Zurich Airport. OpenAI stat numbers shrunk (24px desktop / 20px mobile) at Terence's request.
- **Business × Tech is now a shared component** (`app/components/shared/BusinessTechIntersection.tsx`), used by OpenAI (green, "OPENAI FDE / Ships & Aligns", forward-deployed wording) and Google (blue `#8ab4f8`, "GOOGLE / Outcome first", centre column "Define the outcome, then build"). The hackathon now sits inside the Tech argument on Google instead of floating alone. Extracting it also fixed two light-mode bugs: the active overlap card was dark-on-dark, and the Business circle label ran outside the circle.
- **Mobile is no longer cramped or clipped**: the forced fixed-height mobile hero (`height/max-height: 100dvh` + overflow hidden in `globals.css`) is removed for the shared hero class. The hero now grows naturally; at 390px the applying line, headline, paragraph, stats, CTA and AskBar all show with breathing room on both pages.
- Verified: lint + build pass, Playwright at 1440 / 768 / 390 in light (fresh visitor) on both pages, Google Venn also checked at 390 and in dark.
- **Exact next step**: Terence reviews both live pages; then re-shoot the OpenAI 90-second Loom (script in the entry below).

---

## 2026-10-21: Google Outcome Engineer — Surgical Pass (No Revamp)

### Current State
- Live target: `https://google.terencela.com`. Only `GoogleApplicationPage.tsx` + `app/google/layout.tsx` changed (47 lines). Layout, sections, cards, projects, and Google blue `#8ab4f8` untouched.
- **Role corrected**: header and meta now say "Outcome Engineer (Zurich)" instead of Forward Deployed Engineer III / Google Applied AI.
- **Hero (same headline, kept)**: paragraph replaced with the outcome job ("My job is the outcome, not the demo: define what success means, build the AI, and get it through data rules, procurement and daily operations until people use it.") plus a Google-blue stat row: `8×` hackathon winner mostly solo, `35K` staff app rebuilt solo in 2 weeks, `30h to 3h` per proposal with Leistera. The 8× wins previously appeared nowhere on this page.
- **Facts aligned with the OpenAI dossier**: AI builder card 15+ → 20+ products; ZRH Insider "one month / CHF 350K" → "solo in two weeks / replaced a CHF 200K external quote"; Leistera card stat is now `30h to 3h per proposal`. Business card now carries the proof: $1M+ agency client revenue, 1 exit, St. Gallen as the 6th best business school in Europe. No UBS inflation, no grade.
- **TerenceAI**: hero button is "Ask TerenceAI anything about me"; ask placeholder is "Ask TerenceAI: why should Google hire me?"
- Mobile hero photo tightened so photo, headline, paragraph, stats, CTA and logos fit one frame at 390px (the CTA was clipped before this pass). Verified with Playwright at 1440 / 768 / 390, lint + build pass.
- **Exact next step**: none for Google until real tracker data or recruiter feedback arrives; check `/api/analytics/track` after sharing the link.

---

## 2026-10-21: Interaction Tracker Installed on All Dossiers

### Current State
- **Tracker live on every dossier page** via root layout: shared `PageTracker` (`app/components/shared/PageTracker.tsx`) + `app/lib/tracker.ts`, posting to the fixed `/api/analytics/track` endpoint.
- **What fires**: `pageview`, `section_view` (named by each section's heading, 30% visible), `scroll_depth` (25/50/75/90/100), `click` on every link/button with its visible label and section, `video_play` for the Loom play button, `page_exit` with seconds on page. Session id in sessionStorage, no raw IP stored or returned.
- **See whether the pixel fired**: open any dossier with `?tracker_debug=1` for a live bottom-left event panel, or check `GET /api/analytics/track` for totals (pageviews, sessions, sections seen, scroll depth, top clicks, countries, last 30 events). In DevTools, filter Network by "track".
- **Endpoint hardened**: event whitelist, length caps, page must start with `/`, 120 req/min per IP, malformed or empty posts return clean 400. The old Google-only `/tmp` logger and its public IP exposure are removed, and the Google page's duplicate pageview fetch is deleted.
- **Durable dashboards**: the same events forward to PostHog and GA4 automatically when keys exist. Env contract is in `.env.example`: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`. No keys are set yet, so PostHog/GA4 show "not configured" — that is the one missing credential. The first-party log itself is ephemeral on Vercel and is for recent-visit verification.
- **Verified**: Playwright captured 18 pixel POSTs on `/openai` for one visit (pageview, all five section views, scroll 25→100, TerenceAI CTA click, page_exit), aggregates returned correctly, empty/malformed POSTs return 400, lint + build pass.
- **Exact next step**: Terence provides a PostHog project key (and a GA4 measurement ID if wanted), then set the three env vars in Vercel and redeploy. No code change needed.

---

## 2026-10-21: OpenAI FDE Dossier — No Inflated Claims, Hackathon Front and Centre

### Current State
- Live target: `https://openai.terencela.com` (deploy pending this entry's push).
- **Removed weak/inflated business copy**: "Executive & Board Alignment", Chairman's Office framing, Interim CAIO, and `Grade 5.37` are gone from the page. UBS/Credit Suisse are now named plainly as early career, under the St. Gallen pillar.
- **St. Gallen restated as OpenAI cares**: "M.A. in Business Innovation, University of St. Gallen — the 6th best business school in Europe."
- **10-second scroll design**: Hero now carries a stat row (`8×` hackathon winner mostly solo / `20+` AI products, GPT-3 since 2020 / `2 weeks` 35K staff app solo). Business × Tech cards rebuilt as big stat + one bold line + one sentence. Venn SVG puts `8× hackathon` first and largest on the Tech side, clear of the centre label. Davos paragraph no longer claims executive communications for delegations.
- **Video**: Heading "Terence in 90 seconds", cover photo restored (video now sits far below the hero, so it reads as a video thumbnail, not a duplicate portrait), sharper subtitle. Terence to re-shoot the 90s video; page copy already assumes the new script (who I am / shipped at Zurich Airport / why FDE Zurich).
- **TerenceAI made clickable**: Primary CTA is now "Ask TerenceAI anything about me", ask bar placeholder is "Ask TerenceAI: why should OpenAI hire me?", with three suggested questions underneath (FDE Zurich / airport work / solo hackathons).
- Verified: build + lint pass, Playwright screenshots at 1440 / 768 / 390 (hero, Venn, video). Mobile hero fits photo, title, stats, CTA and logos in one frame. Preview on `http://localhost:3008/openai`.
- **Exact next step**: Terence re-shoots the 90-second Loom on the script above, then swap the Loom URL if it changes.

---

## 2026-10-20: OpenAI FDE Dossier Refinement — Single Portrait, Reordered Sections & Tailored Copy

### Current State
- The OpenAI Forward Deployed Engineer (Zurich) dossier is live on `https://openai.terencela.com`.
- **Eliminated duplicate profile photo**:
  - The hero displays Terence's official portrait (`/images/terence-la-profile.png`).
  - Added `showCoverPhoto={false}` to `LoomVideoFrame.tsx` so the video player does not repeat the portrait on the page.
- **Hero Title & Headline Copy**:
  - Tailored H1 specifically for the role: `"Forward deployed engineer for enterprise AI."`
  - Subhead cleaned up: `"1 exit"` instead of mentioning a startup name, keeping focus on enterprise-grade impact.
- **Section Order Realigned**:
  1. **Hero**: Title, value proposition, CTA, credibility logos.
  2. **Business Leader. Hands-on Engineer (Venn Diagram)**: Positioned directly under hero logos, establishing the dual profile before deep-diving into individual deployments. Graphic scaled down cleanly (540×280 SVG viewBox, r=108) with compact cards.
  3. **Three Hands-On Engineering Engagements**: Deep technical proof (Zurich Airport Voice AI, ZRH Insider 2-week rebuild, Leistera AEC agentic ops).
  4. **Selected AI Applications**: Compact grid displaying live tools (Leistera, PrivacyLayer, Rehearse, Treasure, etc.).
  5. **90-Second Candidate Walkthrough**: Positioned gracefully below projects, providing a direct human intro without interrupting technical proof.
  6. **From Davos to Zurich (`#full-circle`)**: Sam Altman / WEF artifact and 30-minute meeting CTA.
- **Copy & Pillar Refinements**:
  - **Business Pillars**: Emphasizes C-suite / Chairman's Office at UBS/CS, Davos delegate briefings, Zurich Airport scale, agency $1M+ client revenue generated, and 1 acquisition exit. Removed obsolete startup names.
  - **Tech Pillars**: Moved 8× Hackathon Winner to #2, explicitly emphasizing **solo wins** and reverse-engineering rubrics; directly references real portfolio projects (Leistera, PrivacyLayer, Rehearse).
- **Verified Build & Deployment**:
  - Tested locally at 1440px desktop, 768px tablet, and 390px mobile via Playwright.
  - Pushed to `origin main` (commit `9d68b3e`) and deployed to Vercel production.
  - Verified live endpoint `https://openai.terencela.com` serves the updated content.

---

## 2026-10-20: OpenAI FDE Dossier Overhauled with Animated Business × Tech Venn & Real CV Facts

### Current State
- The OpenAI Forward Deployed Engineer (Zurich) dossier is live on `https://openai.terencela.com`.
- **Replaced generic flywheel**: Removed textbook "How I move from zero to deployed" (`DeploymentSystem`) and replaced it with an interactive animated **Two Overlapping Circles (Business × Tech)** visual inspired by high-end keynote architecture slides, adapted for the dark/light editorial dossier design system.
  - **Left Circle (Business)**: Chairman's Office at UBS/CS, HSG Business Innovation (Grade 5.37), Zurich Airport AI Lead (32M+ passengers/yr), $1M+ client revenue generated, 1 startup exit (`NeverAlone.ch`), Interim CAIO.
  - **Right Circle (Tech)**: GPT-3 builder since 2020, 20+ functional AI products built, 8× hackathon winner (incl. 3rd overall at HackZurich / 1,600 engineers), full-stack TypeScript/Next.js/Python, agent harnesses, hybrid RAG, low-latency streaming voice AI.
  - **The Overlap (Forward Deployed Advantage)**: C-suite alignment on Monday to production codebase by Friday; unblocking Swiss enterprise legal, procurement, works councils, and nDSG compliance; native Swiss German / German / English / Cantonese fluency.
  - Interactive tabs & physics-spring animations on both circles and intersection zone.
- **Sharpened copy & metrics from CV**:
  - Hero subhead updated to highlight 20+ functional AI products, GPT-3 since 2020, 8× hackathon winner, 1 exit.
  - Deployment #2: ZRH Insider rebuild updated to 2 weeks solo execution (CHF 200K external quote saved).
  - Deployment #3: Updated from obsolete LAJO to Leistera (Swiss AEC Agentic Operations, ~98% benchmark accuracy, 30h to 3h proposal turnaround).
  - Selected projects: Synchronized with compact card CSS (~170px height, zero visual bleed) so layouts stay crisp and balanced across mobile and desktop.
- Verified build and Playwright screenshots across 390px, 768px, and 1440px.

---

## 2026-10-12: Google Applied AI FDE Dossier Aligned to OpenAI Architecture

### Current State
- The Google Applied AI Forward Deployed Engineer III (Zurich) dossier is live on `https://google.terencela.com` and mirrors the clean, proven OpenAI layout.
- Hero headline: *"I build AI agents and get them working in the real world."*
- Hero structure: Clean, spacious two-column hero without pill clutter, featuring Terence's photo on the right, primary action buttons, Ask TerenceAI bar, and credibility logos in subtle pill outlines at the bottom.
- Three core sections:
  1. **What I bring to Google on day one**: 3 clean articles (Enterprise deployment, AI builder, Business x Engineering).
  2. **Ask TerenceAI Interactive Q&A Card**: Middle-of-page candidate introduction card with Terence's profile image (no video, no play button) and embedded `TerenceAIAskBar`.
  3. **Three recent deployments**: Zurich Airport Voice AI (~85K calls/yr), ZRH Insider Rebuild (35K staff, CHF 350K quote), and Leistera (Swiss AEC Agentic Operations).
  4. **How I move from zero to deployed**: 5-stage interactive SVG system in Google blue (`#4285f4`).
  5. **Selected projects**: Grid of 7 verified personal projects.
  6. **Closing CTA**: High-impact meeting CTA with closing `TerenceAIAskBar`.

### Deployment & Domain Status
- **GitHub**: Committed and pushed to `terencela/applications` `main` (`66189be`).
- **Production URL**: `https://google.terencela.com` (HTTP 200 OK, SSL verified, live on Vercel via GitHub sync).
