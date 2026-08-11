"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import { EASE_OUT } from "@/app/lib/motion";

interface InterviewTeaserModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  roleTitle: string;
  blueprintItems: string[];
  pitch: string;
  pitchSub: string;
  blueprintLabel?: string;
  accentColor?: string;
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function InterviewTeaserModal({
  isOpen,
  onClose,
  companyName,
  roleTitle,
  blueprintItems,
  pitch,
  pitchSub,
  blueprintLabel = "First 90 days",
  accentColor = "#10a37f",
}: InterviewTeaserModalProps) {
  const reduceMotion = useReducedMotion();
  const tapProps = reduceMotion ? {} : { whileTap: { scale: 0.97 } };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101114]/70 p-4 backdrop-blur-md"
          style={{ ["--hero-accent" as string]: accentColor }}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-2xl overflow-hidden border border-[#c9c5bc] bg-[#f2efe8] p-6 text-left shadow-[0_28px_90px_rgba(16,17,20,0.22)] md:p-8"
            initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.15, ease: EASE_OUT },
            }}
            transition={
              reduceMotion
                ? { duration: 0.15, ease: EASE_OUT }
                : { type: "spring", stiffness: 300, damping: 25 }
            }
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="interview-modal-title"
          >
            <motion.button
              type="button"
              onClick={onClose}
              className="dossier-pressable absolute right-5 top-5 rounded-full p-2 text-[#6a6965] transition-colors hover:bg-[#e9e5dc] hover:text-[#101114]"
              aria-label="Close modal"
              {...tapProps}
            >
              <X className="h-5 w-5" />
            </motion.button>

            <div
              className="mb-2 flex items-center gap-2 text-xs font-medium"
              style={{ color: accentColor }}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Why me for {companyName}</span>
            </div>

            <h3
              id="interview-modal-title"
              className="mb-2 text-2xl font-semibold tracking-tight text-[#101114] md:text-3xl"
            >
              {roleTitle}
            </h3>

            <p className="mb-3 text-sm leading-relaxed text-[#44433f]">{pitch}</p>
            <p className="mb-6 text-sm leading-relaxed text-[#6a6965]">{pitchSub}</p>

            <div className="mb-8 space-y-3">
              <p className="text-xs font-medium text-[#6a6965]">{blueprintLabel}</p>
              {blueprintItems.map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-start gap-3 border border-[#c9c5bc] bg-white p-3"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT, delay: index * 0.05 }}
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accentColor }} />
                  <span className="text-xs leading-relaxed text-[#44433f]">{item}</span>
                </motion.div>
              ))}
            </div>

            <div
              className="flex flex-col items-center justify-between gap-4 border bg-white p-4 sm:flex-row"
              style={{ borderColor: `${accentColor}55` }}
            >
              <div>
                <div className="text-sm font-semibold text-[#101114]">Ready for the deep dive?</div>
                <div className="text-xs text-[#6a6965]">Terence La · Zurich, Switzerland</div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <motion.a
                  href="https://www.linkedin.com/in/terencela"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dossier-pressable dossier-cta-accent flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#101114]"
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 10px 35px ${accentColor}45`,
                  }}
                  {...tapProps}
                >
                  <LinkedInIcon />
                  <span>Connect on LinkedIn</span>
                </motion.a>
                <motion.a
                  href={`mailto:terencela93@gmail.com?subject=Interview%20-%20Terence%20La%20-%20${encodeURIComponent(companyName)}`}
                  className="dossier-pressable flex items-center gap-1.5 border border-[#c9c5bc] bg-[#faf8f4] px-3 py-2.5 text-xs font-medium text-[#101114] transition-colors hover:bg-[#e9e5dc]"
                  {...tapProps}
                >
                  <Mail className="h-4 w-4 text-[#6a6965]" />
                  <span>Email</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
