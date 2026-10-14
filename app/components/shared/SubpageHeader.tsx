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

  const isDark = theme === "dark";
  const headerBg = isDark ? "rgba(10, 11, 15, 0.92)" : "rgba(250, 250, 248, 0.92)";

  return (
    <header
      key={theme}
      className="dossier-glass-header sticky top-0 z-[60] border-b border-[var(--dossier-line-strong)]"
      style={{
        backgroundColor: headerBg,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
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
    </header>
  );
}
