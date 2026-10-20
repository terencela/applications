# Application Dossiers — Handoff

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
