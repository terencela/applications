# Application Dossiers — Handoff

## 2026-10-12: Google Applied AI FDE Dossier Optimization

### Current State
- The Google Applied AI Forward Deployed Engineer III (Zurich) dossier is live and deployed to Vercel production.
- Hero replaced with the exact requested headline: *"I build AI agents and get them working in the real world."*
- Above-the-fold proof features:
  1. Zurich Airport Voice AI: ~85K calls/year, 8 FTE call center, concept to working PoC in 2 weeks, advanced to formal enterprise tender (strictly noted as PoC -> Tender, NOT in production).
  2. ZRH Insider Platform Rebuild: ~35K staff, 2 native codebases (iOS Swift + Android Kotlin) consolidated into 1 Capacitor 8 + React 19 foundation, externally agency-quoted at CHF 300K–350K.
  3. Leistera: Flagship agentic AI document & norm intelligence system under KI Unlocked founder experience, with hybrid retrieval (BM25 + vector + Cohere rerank) and exact PDF bounding-box source grounding.
- Removed unverified claims (no 98% accuracy, no 60% time saved).
- Added technical agent orchestration section covering Cursor, Claude Code, Codex, and parallel agent workflows with automated "Plan → Build → Verify → Check" loops.
- Added interactive 5-stage architecture specification with illustrative execution trace.
- Responsive mobile & desktop QA completed with visual screenshots.

### Deployment & Domain Status
- **GitHub**: Committed and pushed to `terencela/applications` (`befc11b`, `d030ac6`).
- **Vercel Project**: `terencela-dossier` (`prj_2tb6CdljZnJSDfwGBQWmzahdK57I`).
- **Vercel Production Deployment**: `https://terencela-dossier-na1e50l8x-terencelas-projects.vercel.app/google` (SSO deployment protection disabled, publicly accessible).
- **Subdomain**: `google.terencela.com` is attached to `terencela-dossier`.
- **Pending User Action**: Add DNS `A` record on Namecheap: `google` -> `76.76.21.21`.
