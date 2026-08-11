"use client";

import React from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { isExternalDossier } from "@/app/lib/dossier-config";
import { useDossierTheme } from "@/app/lib/dossier-theme";
import { DossierThemeToggle } from "@/app/components/shared/DossierThemeToggle";
import {
  DOSSIER_HEADER_SCROLL_RANGE,
  DOSSIER_LOAD_HEADER_DELAY,
  DOSSIER_LOAD_HEADER_DURATION,
  EASE_OUT,
} from "@/app/lib/motion";

interface SubpageHeaderProps {
  companyName: string;
  roleTitle: string;
  accentColor: string;
}

export function SubpageHeader({
  companyName,
  roleTitle,
  accentColor,
}: SubpageHeaderProps) {
  const external = isExternalDossier();
  const reduceMotion = useReducedMotion();
  const { theme } = useDossierTheme();
  const { scrollY } = useScroll();

  const headerRgb = theme === "dark" ? "10, 11, 15" : "250, 250, 248";

  const backgroundOpacity = useTransform(
    scrollY,
    DOSSIER_HEADER_SCROLL_RANGE,
    reduceMotion ? [0.88, 0.92] : [0.82, 0.92]
  );
  const blurAmount = useTransform(
    scrollY,
    DOSSIER_HEADER_SCROLL_RANGE,
    reduceMotion ? [16, 16] : [12, 16]
  );
  const borderOpacity = useTransform(
    scrollY,
    DOSSIER_HEADER_SCROLL_RANGE,
    reduceMotion ? [1, 1] : [0.6, 1]
  );

  const backgroundColor = useTransform(
    backgroundOpacity,
    (opacity) => `rgba(${headerRgb}, ${opacity})`
  );
  const backdropFilter = useTransform(blurAmount, (blur) => `blur(${blur}px)`);
  const borderBottomColor = useTransform(
    borderOpacity,
    (opacity) => `color-mix(in srgb, var(--dossier-line) ${opacity * 100}%, transparent)`
  );

  return (
    <motion.header
      key={theme}
      className="dossier-glass-header sticky top-0 z-[60]"
      initial={reduceMotion ? false : { y: "-100%" }}
      animate={{ y: 0 }}
      transition={{
        duration: DOSSIER_LOAD_HEADER_DURATION,
        delay: DOSSIER_LOAD_HEADER_DELAY,
        ease: EASE_OUT,
      }}
      style={{
        backgroundColor,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        borderBottomColor,
      }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-4 md:px-8">
        <div className="min-w-0">
          <p className="truncate text-sm text-[var(--dossier-ink)]">
            <span className="font-semibold">{companyName}</span>
            <span className="text-[var(--dossier-muted)]"> · {roleTitle}</span>
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <DossierThemeToggle />

          <div className="dossier-glass-pill hidden sm:inline-flex">
            <MapPin className="h-3.5 w-3.5" style={{ color: accentColor }} />
            Zurich
          </div>

          <a
            href="https://www.linkedin.com/in/terencela"
            target="_blank"
            rel="noopener noreferrer"
            className="dossier-glass-pill dossier-pressable transition-colors hover:text-[var(--dossier-ink)]"
          >
            LinkedIn
            <ArrowUpRight className="h-3.5 w-3.5 text-[var(--dossier-subtle)]" />
          </a>
        </div>
      </div>

      {external ? null : (
        <div className="sr-only" aria-hidden="true">
          Internal preview mode
        </div>
      )}
    </motion.header>
  );
}
