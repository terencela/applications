# Application Dossiers — Handoff

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
