"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useDossierTheme } from "@/app/lib/dossier-theme";

export function DossierThemeToggle() {
  const { theme, toggleTheme } = useDossierTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="dossier-glass-pill dossier-pressable inline-flex items-center gap-1.5"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
