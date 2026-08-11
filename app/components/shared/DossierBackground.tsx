"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DOSSIER_LOAD_ORB_DURATION, EASE_OUT } from "@/app/lib/motion";

type DossierBackgroundProps = {
  accentColor: string;
};

export function DossierBackground({ accentColor }: DossierBackgroundProps) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <div
        className="dossier-bg-base"
        aria-hidden="true"
      />
      <div className="dossier-grain" aria-hidden="true" />
      <div className="dossier-dot-grid" aria-hidden="true" />
      <div
        className={`dossier-mesh-gradient${reduceMotion ? "" : " dossier-mesh-animate"}`}
        aria-hidden="true"
        style={{
          "--mesh-accent": accentColor,
        } as React.CSSProperties}
      />
      <motion.div
        className={`dossier-accent-orb${reduceMotion ? "" : " dossier-accent-orb-float"}`}
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${accentColor}18 0%, transparent 68%)`,
        }}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DOSSIER_LOAD_ORB_DURATION, ease: EASE_OUT }}
      />
      <motion.div
        className={`dossier-accent-orb dossier-accent-orb-secondary${reduceMotion ? "" : " dossier-accent-orb-float-alt"}`}
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${accentColor}0d 0%, transparent 70%)`,
        }}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DOSSIER_LOAD_ORB_DURATION, ease: EASE_OUT, delay: 0.05 }}
      />
    </>
  );
}
