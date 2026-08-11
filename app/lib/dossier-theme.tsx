"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type DossierTheme = "light" | "dark";

const STORAGE_KEY = "dossier-theme";

type DossierThemeContextValue = {
  theme: DossierTheme;
  setTheme: (theme: DossierTheme) => void;
  toggleTheme: () => void;
};

const DossierThemeContext = createContext<DossierThemeContextValue>({
  theme: "dark",
  setTheme: () => undefined,
  toggleTheme: () => undefined,
});

function getInitialTheme(): DossierTheme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light") return "light";
  return "dark";
}

function applyThemeToDocument(theme: DossierTheme) {
  const root = document.documentElement;
  root.dataset.dossierTheme = theme;
  root.dataset.dossier = "true";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#0a0b0f" : "#fafaf8");
  }
}

export function DossierThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<DossierTheme>(getInitialTheme);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
    applyThemeToDocument(theme);
  }, [theme]);

  const setTheme = useCallback((next: DossierTheme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <DossierThemeContext.Provider value={value}>{children}</DossierThemeContext.Provider>;
}

export function useDossierTheme() {
  return useContext(DossierThemeContext);
}
