/** Zurich time — dossier unlocks at start of August 7, 2026. */
const DOSSIER_RELEASE_MS = Date.parse("2026-08-07T00:00:00+02:00");
const FORCE_DOSSIER_HOLD = false;

export const DOSSIER_HOLD_PREVIEW_IMAGE = "/screenshots/compare/openai-v2-scroll-0.png";

export function isDossierOnHold(now = Date.now()): boolean {
  // Internal/local preview should always show the real page.
  if (process.env.NODE_ENV !== "production") return false;
  if (FORCE_DOSSIER_HOLD) return true;
  return now < DOSSIER_RELEASE_MS;
}
