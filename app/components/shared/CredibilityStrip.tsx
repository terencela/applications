"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  dossierCredibilityItem,
  dossierCredibilityStagger,
  dossierViewport,
} from "@/app/lib/motion";

const credentials = [
  { name: "PwC", detail: "Transfer pricing" },
  { name: "Credit Suisse", detail: "Chairman's Office" },
  { name: "Zurich Airport", detail: "AI Lead" },
  { name: "Forbes", detail: "30 Under 30 DACH" },
  { name: "TEDx", detail: "2x speaker" },
  { name: "HSG", detail: "Master's degree" },
];

export function CredibilityStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="dossier-credibility dossier-credibility-tight" aria-label="Enterprise credentials">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <motion.ul
          className="dossier-credibility-list"
          variants={reduceMotion ? undefined : dossierCredibilityStagger}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={dossierViewport}
        >
          {credentials.map((item) => (
            <motion.li
              key={item.name}
              variants={reduceMotion ? undefined : dossierCredibilityItem}
            >
              <b>{item.name}</b>
              <span>{item.detail}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
