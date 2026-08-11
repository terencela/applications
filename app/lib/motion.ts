/** Shared motion tokens for dossier pages (emil-design-eng aligned). */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** UI entrance duration — keep under 300ms per spec. */
export const DOSSIER_UI_DURATION = 0.28;

export const DOSSIER_WORD_STAGGER = 0.04;
export const DOSSIER_CTA_STAGGER = 0.08;
export const DOSSIER_SUBTITLE_DELAY = 0.3;
export const DOSSIER_PROFILE_DELAY = 0.4;
export const DOSSIER_HEADER_SCROLL_RANGE: [number, number] = [0, 100];

/** Page-load sequence timings (ms-scale mapped to seconds). */
export const DOSSIER_LOAD_ORB_DURATION = 0.2;
export const DOSSIER_LOAD_HEADER_DELAY = 0.1;
export const DOSSIER_LOAD_HEADER_DURATION = 0.2;
export const DOSSIER_LOAD_HERO_DELAY = 0.2;
export const DOSSIER_LOAD_HERO_STAGGER = 0.07;
export const DOSSIER_LOAD_PROFILE_DURATION = 0.3;

export const dossierReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

export const dossierStagger = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: DOSSIER_LOAD_HERO_DELAY,
      staggerChildren: DOSSIER_LOAD_HERO_STAGGER,
    },
  },
};

export const dossierItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
};

export const dossierProfileReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DOSSIER_LOAD_PROFILE_DURATION,
      delay: DOSSIER_PROFILE_DELAY,
      ease: EASE_OUT,
    },
  },
};

export const dossierInView = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.45, ease: EASE_OUT },
};

export const dossierDemoInView = {
  initial: { opacity: 0, y: 40, scale: 0.96 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: EASE_OUT },
};

export const dossierLoomVideo = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: EASE_OUT },
};

export const dossierLoomChapterStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

export const dossierLoomChapterItem = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

export const dossierFitStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const dossierFitPointItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

export const dossierFitIconSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 14,
  mass: 0.6,
};

export const dossierStatInView = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.35, ease: EASE_OUT },
};

export const dossierViewport = { once: true, amount: 0.3 } as const;

/** Proof items: fade up 24px, 60ms stagger. */
export const dossierProofStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export const dossierProofItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/** Credibility logos: slide from left, 50ms stagger. */
export const dossierCredibilityStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

export const dossierCredibilityItem = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

/** Timeline steps: horizontal reveal, sequential on scroll. */
export const dossierTimelineStep = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/** Toolkit pillars: fade up with stagger. */
export const dossierPillarStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export const dossierPillarItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

/** Section divider: horizontal line draw-in via clip-path. */
export const dossierLineDrawIn = {
  initial: { clipPath: "inset(0 100% 0 0)" },
  whileInView: { clipPath: "inset(0 0 0 0)" },
  viewport: dossierViewport,
  transition: { duration: 0.65, ease: EASE_OUT },
};
