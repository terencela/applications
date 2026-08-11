"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Mail, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/app/lib/motion";

interface LinkedInCTAProps {
  companyName: string;
  roleTitle: string;
  body?: string;
  accentColor?: string;
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function LinkedInCTA({
  companyName,
  roleTitle,
  body,
  accentColor = "#10a37f",
}: LinkedInCTAProps) {
  const reduceMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const tapProps = reduceMotion ? {} : { whileTap: { scale: 0.97 } };
  const profileHover =
    canHover && !reduceMotion
      ? { whileHover: { scale: 1.03 }, transition: { duration: 0.2, ease: EASE_OUT } }
      : {};

  return (
    <section className="dossier-footer-cta dossier-section" style={{ ["--hero-accent" as string]: accentColor }}>
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <motion.div
          className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end"
          initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <div>
            <div className="mb-8 flex items-center gap-4">
              <motion.div
                className="dossier-footer-profile relative h-16 w-16 shrink-0 overflow-hidden"
                {...profileHover}
              >
                <Image
                  src="/images/terence-la-profile.png"
                  alt="Terence La"
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              </motion.div>
              <div>
                <p className="dossier-footer-name text-sm font-medium">Terence La</p>
                <p className="dossier-footer-meta text-xs">Zurich, Switzerland · Swiss citizen</p>
              </div>
            </div>

            <h2 className="dossier-hero-title !text-[clamp(36px,4.5vw,64px)]">
              Let&apos;s talk about <em>{companyName}</em> in Zurich.
            </h2>

            <p className="dossier-footer-body mt-5 max-w-[65ch] text-base leading-relaxed">
              {body ??
                `I am actively speaking with teams for the ${roleTitle} role. If you want a technical walkthrough and a concrete plan, I would love to connect.`}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <motion.a
                href="https://www.linkedin.com/in/terencela"
                target="_blank"
                rel="noopener noreferrer"
                className="dossier-pressable dossier-cta-accent inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold"
                style={{
                  backgroundColor: accentColor,
                  color: "#101114",
                  boxShadow: `0 12px 45px ${accentColor}40`,
                }}
                {...tapProps}
              >
                <LinkedInIcon />
                Connect on LinkedIn
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>

              <motion.a
                href={`mailto:terencela93@gmail.com?subject=Terence%20La%20-%20${encodeURIComponent(companyName)}`}
                className="dossier-footer-email dossier-pressable inline-flex items-center gap-2 bg-transparent px-6 py-3.5 text-sm font-medium transition-colors"
                {...tapProps}
              >
                <Mail className="h-4 w-4 text-[var(--dossier-muted)]" />
                terencela93@gmail.com
              </motion.a>
            </div>
          </div>

          <div className="dossier-footer-aside hidden text-right text-xs leading-relaxed md:block">
            <p>Notice period: immediate / flexible</p>
            <p className="mt-2">English · German · Swiss German · Cantonese · French</p>
            <p className="dossier-footer-copy mt-6">© {new Date().getFullYear()} Terence La</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
