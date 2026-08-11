"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Play, Clock3, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  dossierLoomChapterItem,
  dossierLoomChapterStagger,
  dossierLoomVideo,
} from "@/app/lib/motion";
import { useDossierTheme } from "@/app/lib/dossier-theme";

interface LoomVideoFrameProps {
  companyName: string;
  roleTitle: string;
  loomUrl?: string;
  videoTitle?: string;
  videoSubtitle?: string;
  accentColor?: string;
  showChapters?: boolean;
  videoOrientation?: "landscape" | "portrait";
  playInModal?: boolean;
  chapters?: Array<{
    time: string;
    title: string;
    desc: string;
  }>;
}

function normalizeLoomUrl(url?: string) {
  if (!url) return url;
  if (url.includes("/embed/")) return url;
  const match = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
  if (!match) return url;
  const [, id] = match;
  return `https://www.loom.com/embed/${id}`;
}

export function LoomVideoFrame({
  companyName,
  roleTitle,
  loomUrl,
  videoTitle = `Why I am the right fit for ${companyName}`,
  videoSubtitle,
  accentColor = "#10a37f",
  showChapters = true,
  videoOrientation = "landscape",
  playInModal = false,
  chapters,
}: LoomVideoFrameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const reduceMotion = useReducedMotion();
  const { theme } = useDossierTheme();
  const isDark = theme === "dark";
  const normalizedLoomUrl = useMemo(() => normalizeLoomUrl(loomUrl), [loomUrl]);
  const isPortrait = videoOrientation === "portrait";
  const frameAspectRatio = isPortrait ? "9 / 16" : "16 / 9";
  const frameMaxWidth = isPortrait ? "max-w-[420px]" : "max-w-[900px]";
  const showInlineVideo = Boolean(normalizedLoomUrl && isPlaying && !playInModal);

  useEffect(() => {
    if (!playInModal || !isPlaying) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPlaying(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isPlaying, playInModal]);

  const defaultChapters = [
    {
      time: "0:00",
      title: "The unconventional fit",
      desc: "AI Lead at Zurich Airport. I create apps and ship them inside the company.",
    },
    {
      time: "0:25",
      title: "Swiss AI deployment",
      desc: "32M+ passengers/year. nDSG and ops constraints from day one.",
    },
    {
      time: "0:55",
      title: "Day 1 value for Zurich",
      desc: "Evals, handoffs, and what I'd do in week one on a Zurich account.",
    },
  ];
  const chapterItems = chapters ?? defaultChapters;

  if (!showChapters) {
    return (
      <div className="dossier-loom-panel dossier-loom-panel-compact overflow-hidden">
        <motion.div className="relative" {...(reduceMotion ? {} : dossierLoomVideo)}>
          {showInlineVideo ? (
            <div className={`relative mx-auto w-full ${frameMaxWidth}`}>
              <div className="relative w-full" style={{ aspectRatio: frameAspectRatio }}>
                <iframe
                  src={normalizedLoomUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                  title={videoTitle}
                />
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="dossier-pressable relative flex w-full min-h-[210px] items-stretch text-left sm:min-h-[230px] md:min-h-[270px]"
              aria-label="Play video pitch"
            >
              <div className="dossier-loom-pattern absolute inset-0" aria-hidden="true" />
              <div className="relative z-10 flex flex-1 flex-col justify-between p-5 md:p-7">
                <div
                  className="inline-flex w-fit items-center gap-1.5 text-xs font-medium md:text-[13px]"
                  style={{ color: accentColor }}
                >
                  <Clock3 className="h-4 w-4" />
                  90 seconds
                </div>
                <div>
                  <div className="flex items-center gap-4 md:gap-5">
                    <span
                      className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full md:h-[4.5rem] md:w-[4.5rem]"
                      style={{
                        backgroundColor: accentColor,
                        color: "#1a1a1a",
                        boxShadow: `0 14px 40px ${accentColor}44`,
                      }}
                    >
                      <Play className="h-7 w-7 translate-x-0.5 fill-current md:h-8 md:w-8" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--dossier-muted)]">
                        Watch video
                      </p>
                      <h4 className="mt-1 text-lg font-semibold tracking-tight text-[var(--dossier-ink)] md:text-2xl">
                        {videoTitle}
                      </h4>
                      <p className="mt-1 text-sm text-[var(--dossier-body)] md:text-[15px]">
                        {videoSubtitle ?? `Quick introduction for the ${roleTitle} role.`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative w-[38%] max-w-[240px] min-w-[112px] shrink-0 border-l border-[var(--dossier-line-strong)] bg-[#101116] sm:min-w-[132px] md:min-w-[180px]">
                <Image
                  src="/images/terence-la-profile.png"
                  alt="Terence La"
                  fill
                  sizes="(max-width: 768px) 38vw, 240px"
                  className="dossier-profile-photo object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
                <div
                  className="pointer-events-none absolute inset-0 flex items-center justify-center md:hidden"
                  aria-hidden="true"
                >
                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-[2px]"
                  >
                    <Play className="h-5 w-5 translate-x-0.5 fill-current" />
                  </span>
                </div>
              </div>
            </button>
          )}
        </motion.div>
        {normalizedLoomUrl && isPlaying && playInModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              className="absolute inset-0"
              aria-label="Close video overlay"
            />
            <div className={`relative z-[1] w-full ${isPortrait ? "max-w-[460px]" : "max-w-[1100px]"}`}>
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className="absolute -top-11 right-0 inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur-sm"
              >
                <X className="h-3.5 w-3.5" />
                Close
              </button>
              <div
                className="relative w-full overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_28px_100px_rgba(0,0,0,0.65)]"
                style={{ aspectRatio: frameAspectRatio }}
              >
                <iframe
                  src={normalizedLoomUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                  title={videoTitle}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="dossier-loom-panel overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <motion.div
          className={`relative min-h-[300px] border-b border-[var(--dossier-line-strong)] lg:col-span-7 lg:min-h-[400px] lg:border-b-0 lg:border-r ${
            isDark ? "bg-[#101116]" : "bg-[#f5f5f2]"
          }`}
          {...(reduceMotion ? {} : dossierLoomVideo)}
        >
          {normalizedLoomUrl && isPlaying ? (
            <iframe
              src={normalizedLoomUrl}
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              title={videoTitle}
            />
          ) : (
            <div className="relative h-full min-h-[300px] w-full overflow-hidden lg:min-h-[400px]">
              <Image
                src="/images/terence-la-profile.png"
                alt="Terence La"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className={`dossier-profile-photo object-cover object-[center_18%] ${isDark ? "opacity-58" : "opacity-70"}`}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: isDark
                    ? `linear-gradient(165deg, rgba(10,11,15,0.12) 0%, rgba(10,11,15,0.74) 68%), radial-gradient(circle at 20% 15%, ${accentColor}22, transparent 52%)`
                    : `linear-gradient(165deg, rgba(250,250,248,0.35) 0%, rgba(250,250,248,0.88) 68%), radial-gradient(circle at 20% 15%, ${accentColor}18, transparent 52%)`,
                }}
              />
              <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
                <div className="flex items-center gap-3 text-xs font-medium" style={{ color: accentColor }}>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    90 seconds
                  </span>
                </div>
                <div className="py-6">
                  <h4 className="max-w-lg text-xl font-semibold tracking-tight text-[var(--dossier-ink)] md:text-2xl">
                    {videoTitle}
                  </h4>
                  <p className="mt-2 text-sm text-[var(--dossier-body)]">
                    {videoSubtitle ?? `Overview for the ${roleTitle} role in Zurich.`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="dossier-pressable inline-flex h-14 w-14 items-center justify-center rounded-full md:h-16 md:w-16"
                  style={{
                    backgroundColor: accentColor,
                    color: "#1a1a1a",
                    boxShadow: `0 14px 48px ${accentColor}44`,
                  }}
                  aria-label="Play video pitch"
                >
                  <Play className="h-6 w-6 translate-x-0.5 fill-current md:h-7 md:w-7" />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <div
          className={`flex flex-col justify-center p-6 lg:col-span-5 lg:p-8 ${
            isDark ? "bg-[#0f1014]" : "bg-[#faf8f4]"
          }`}
        >
          <p className="mb-4 text-sm text-[var(--dossier-muted)]">Video chapters</p>
          <motion.div
            className="space-y-2"
            variants={reduceMotion ? undefined : dossierLoomChapterStagger}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {chapterItems.map((ch, idx) => (
              <motion.button
                key={ch.title}
                type="button"
                variants={reduceMotion ? undefined : dossierLoomChapterItem}
                onClick={() => {
                  setActiveChapter(idx);
                  setIsPlaying(true);
                }}
                className={`dossier-pressable w-full border px-4 py-3.5 text-left transition-colors ${
                  activeChapter === idx
                    ? isDark
                      ? "border-[#2e313a] bg-[#1b1d25] shadow-sm"
                      : "border-[var(--dossier-line-strong)] bg-white shadow-sm"
                    : isDark
                      ? "border-transparent bg-transparent hover:bg-[#171920]"
                      : "border-[var(--dossier-line)] bg-white/40 hover:bg-white/80"
                }`}
                style={
                  activeChapter === idx
                    ? { borderLeftColor: accentColor, borderLeftWidth: 3 }
                    : undefined
                }
              >
                <div className="mb-1 flex items-baseline gap-3 text-xs">
                  <span style={{ color: accentColor }}>{ch.time}</span>
                  <span className="font-medium text-[var(--dossier-ink)]">{ch.title}</span>
                </div>
                <p className="text-xs leading-relaxed text-[var(--dossier-muted)]">{ch.desc}</p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
