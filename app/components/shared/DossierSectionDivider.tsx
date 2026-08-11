"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { dossierLineDrawIn, EASE_OUT } from "@/app/lib/motion";

export function DossierSectionDivider() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-8" aria-hidden="true">
      <motion.div
        className="h-px bg-[var(--dossier-line-strong)]"
        {...(reduceMotion
          ? {}
          : {
              ...dossierLineDrawIn,
            })}
      />
    </div>
  );
}

type DossierBorderDrawInProps = {
  className?: string;
};

/** Animates an existing horizontal border (e.g. border-top) with clip-path draw-in. */
export function DossierBorderDrawIn({ className }: DossierBorderDrawInProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      aria-hidden="true"
      {...(reduceMotion
        ? {}
        : {
            initial: { clipPath: "inset(0 100% 0 0)" },
            whileInView: { clipPath: "inset(0 0 0 0)" },
            viewport: { once: true, amount: 0.3 },
            transition: { duration: 0.65, ease: EASE_OUT },
          })}
    />
  );
}
