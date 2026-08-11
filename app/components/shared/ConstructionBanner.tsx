"use client";

import { useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "labs-construction-banner-dismissed";

export function ConstructionBanner() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(STORAGE_KEY) !== "1";
  });

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 top-0 z-[9999] border-b border-amber-400/30 bg-amber-500 px-4 py-4 text-[#1a1a1a] shadow-lg"
      role="status"
    >
      <div className="mx-auto flex max-w-5xl items-start justify-between gap-4">
        <p className="text-sm font-semibold leading-snug md:text-base">
          This page is under construction and will be live August 7.
        </p>
        <button
          type="button"
          onClick={() => {
            window.localStorage.setItem(STORAGE_KEY, "1");
            setVisible(false);
          }}
          className="shrink-0 rounded-full p-1.5 transition hover:bg-black/10"
          aria-label="Dismiss banner"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
