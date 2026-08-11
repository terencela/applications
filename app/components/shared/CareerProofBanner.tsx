"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { CareerProofItem } from "@/app/lib/dossier-config";
import {
  dossierProofItem,
  dossierProofStagger,
  dossierViewport,
  EASE_OUT,
} from "@/app/lib/motion";
import { DossierBorderDrawIn, DossierSectionDivider } from "@/app/components/shared/DossierSectionDivider";

type CareerProofBannerProps = {
  accentColor?: string;
  intro: string;
  items: CareerProofItem[];
};

export function CareerProofBanner({
  accentColor = "#10a37f",
  intro,
  items,
}: CareerProofBannerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="dossier-section !py-0">
      <DossierSectionDivider />
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 pt-16">
        <motion.p
          className="mb-8 max-w-[65ch] text-base leading-relaxed text-[var(--dossier-body)]"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={dossierViewport}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          {intro}
        </motion.p>

        <DossierBorderDrawIn className="h-px bg-[var(--dossier-line-strong)]" />

        <motion.div
          className="dossier-proof-list border-t-0"
          variants={reduceMotion ? undefined : dossierProofStagger}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={dossierViewport}
        >
          {items.map((item, index) => (
            <motion.article
              key={item.label}
              className="dossier-proof-row"
              variants={reduceMotion ? undefined : dossierProofItem}
            >
              <b style={{ color: index === 0 ? accentColor : "var(--dossier-ink)" }}>{item.stat}</b>
              <div>
                <strong>{item.label}</strong>
              </div>
              <p>{item.sub}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
