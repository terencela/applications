"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
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
  theme: "light",
  setTheme: () => undefined,
  toggleTheme: () => undefined,
});

function getInitialTheme(): DossierTheme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark") return "dark";
  return "light";
}

export function applyDossierThemeToDocument(theme: DossierTheme) {
  const root = document.documentElement;
  root.setAttribute("data-dossier-theme", theme);
  root.dataset.dossier = "true";
  root.classList.toggle("dark", theme === "dark");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#0a0b0f" : "#fafaf8");
  }
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function DossierThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<DossierTheme>(() => {
    if (typeof window === "undefined") return "light";
    return getInitialTheme();
  });

  useIsomorphicLayoutEffect(() => {
    applyDossierThemeToDocument(theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
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
