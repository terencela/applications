"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Lock,
  BarChart3,
  FileCode2,
  Users,
  ChevronRight,
} from "lucide-react";
import type { AdoptionPillar, AdoptionUseCase } from "@/app/lib/dossier-config";
import {
  dossierPillarItem,
  dossierPillarStagger,
  dossierViewport,
  EASE_OUT,
} from "@/app/lib/motion";

const pillarIcons = [BarChart3, Lock, FileCode2, Users];

interface EnterpriseAdoptionToolkitProps {
  title: string;
  subtitle: string;
  adoptionPillars: AdoptionPillar[];
  useCases: AdoptionUseCase[];
  accentColor?: string;
}

export function EnterpriseAdoptionToolkit({
  title,
  subtitle,
  adoptionPillars,
  useCases,
  accentColor = "#10a37f",
}: EnterpriseAdoptionToolkitProps) {
  const [activeTab, setActiveTab] = useState<"framework" | "case_analysis">("framework");
  const [activePillar, setActivePillar] = useState(0);
  const reduceMotion = useReducedMotion();
  const selected = adoptionPillars[activePillar];
  const SelectedIcon = pillarIcons[activePillar % pillarIcons.length];

  return (
    <motion.div
      className="w-full overflow-hidden border border-[var(--dossier-line-strong)] bg-[var(--dossier-panel)]"
      initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={dossierViewport}
      transition={{ duration: 0.55, ease: EASE_OUT }}
    >
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--dossier-line-strong)] px-6 py-5 md:px-8">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-[var(--dossier-ink)]">{title}</h3>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-[var(--dossier-muted)]">{subtitle}</p>
        </div>

        <div className="flex border border-[var(--dossier-line-strong)] bg-[#faf8f4] p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("framework")}
            className={`dossier-pressable px-3 py-1.5 transition-colors ${
              activeTab === "framework"
                ? "font-semibold text-[#101114]"
                : "text-[var(--dossier-muted)] hover:text-[var(--dossier-ink)]"
            }`}
            style={activeTab === "framework" ? { backgroundColor: accentColor } : undefined}
          >
            Core patterns
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("case_analysis")}
            className={`dossier-pressable px-3 py-1.5 transition-colors ${
              activeTab === "case_analysis"
                ? "font-semibold text-[#101114]"
                : "text-[var(--dossier-muted)] hover:text-[var(--dossier-ink)]"
            }`}
            style={activeTab === "case_analysis" ? { backgroundColor: accentColor } : undefined}
          >
            DACH scenarios
          </button>
        </div>
      </div>

      <div className="p-0">
        {activeTab === "framework" ? (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_1.05fr]">
            <motion.div
              className="border-b border-[var(--dossier-line-strong)] lg:border-b-0 lg:border-r"
              variants={reduceMotion ? undefined : dossierPillarStagger}
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={dossierViewport}
            >
              {adoptionPillars.map((pillar, index) => {
                const Icon = pillarIcons[index % pillarIcons.length];
                const isActive = activePillar === index;
                return (
                  <motion.button
                    key={pillar.title}
                    type="button"
                    onClick={() => setActivePillar(index)}
                    variants={reduceMotion ? undefined : dossierPillarItem}
                    className={`dossier-pressable flex w-full items-start gap-3 border-b border-[var(--dossier-line-strong)] px-6 py-5 text-left transition-colors last:border-b-0 md:px-8 ${
                      isActive ? "bg-[#faf8f4]" : "hover:bg-[#faf8f4]/70"
                    }`}
                    style={isActive ? { borderLeft: `3px solid ${accentColor}` } : undefined}
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accentColor }} />
                    <div className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-[var(--dossier-ink)]">
                        {pillar.title}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-[var(--dossier-muted)]">
                        {pillar.desc}
                      </span>
                    </div>
                    <ChevronRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--dossier-subtle)]"
                      style={{ opacity: isActive ? 1 : 0.4 }}
                    />
                  </motion.button>
                );
              })}
            </motion.div>

            <div className="overflow-hidden px-6 py-8 md:px-10 md:py-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activePillar}
                  initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
                  transition={
                    reduceMotion ? { duration: 0 } : { duration: 0.55, ease: EASE_OUT }
                  }
                >
                  <div className="mb-4 flex items-center gap-2">
                    <SelectedIcon className="h-4 w-4" style={{ color: accentColor }} />
                    <span className="text-sm font-semibold" style={{ color: accentColor }}>
                      {selected.title}
                    </span>
                  </div>
                  <p className="max-w-[55ch] text-sm leading-relaxed text-[var(--dossier-muted)]">
                    {selected.desc}
                  </p>
                  <div className="mt-8 border-t border-[var(--dossier-line-strong)] pt-6">
                    <p className="text-xs font-medium text-[var(--dossier-ink)]">My proof</p>
                    <p className="mt-2 max-w-[55ch] text-sm leading-relaxed text-[var(--dossier-muted)]">
                      {selected.howTerenceSolves}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-[var(--dossier-line-strong)]">
            {useCases.map((uc, index) => (
              <motion.div
                key={uc.industry}
                className="grid gap-4 px-6 py-6 md:grid-cols-[1.1fr_1fr_auto] md:items-start md:px-8 md:py-7"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={dossierViewport}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: index * 0.05 }}
              >
                <div>
                  <p className="text-sm font-semibold text-[var(--dossier-ink)]">{uc.industry}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--dossier-muted)]">
                    <span className="font-medium text-[var(--dossier-ink)]">Blocker: </span>
                    {uc.friction}
                  </p>
                </div>
                <p className="text-xs leading-relaxed text-[var(--dossier-muted)]">
                  <span className="font-medium" style={{ color: accentColor }}>
                    How I unblock:{" "}
                  </span>
                  {uc.solution}
                </p>
                <span
                  className="self-start border px-3 py-1.5 text-[11px] leading-snug"
                  style={{
                    borderColor: `${accentColor}55`,
                    color: accentColor,
                    backgroundColor: `${accentColor}10`,
                  }}
                >
                  {uc.adoptionImpact}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
