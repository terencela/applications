"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ProductVisual } from "@/app/components/shared/ProductVisual";
import { dossierInView, EASE_OUT } from "@/app/lib/motion";

type SideProjectsGridProps = {
  accentColor?: string;
};

const TILT_SPRING = { stiffness: 400, damping: 30 };

const projects = [
  {
    name: "KI Unlocked",
    category: "AI workflow platform",
    stage: "Active",
    description:
      "Enterprise AI workflows with measurable ROI. 40% workflow reduction across client deployments.",
    evidence: "8+ enterprise clients",
    visual: "knowledge",
    accent: "green",
  },
  {
    name: "perseedU",
    category: "Web3 charity",
    stage: "Venture",
    description:
      "Transparent donation infrastructure with personal tokens. Top 10 at venture.ch in finance.",
    evidence: "1,100+ community members",
    visual: "gtm",
    accent: "violet",
  },
  {
    name: "ZooMania",
    category: "Sustainability",
    stage: "HackZurich 2021",
    description:
      "Gamified eco-purchases for families. Winner at Europe's largest hackathon.",
    evidence: "HackZurich winner",
    visual: "travel",
    accent: "cyan",
  },
  {
    name: "NeverAlone.ch",
    category: "E-commerce",
    stage: "Exit",
    description:
      "Emergency marketplace for small businesses during COVID. Built and exited in weeks.",
    evidence: "50 vendors onboarded in 4 weeks",
    visual: "messages",
    accent: "coral",
  },
  {
    name: "TL Innovations",
    category: "Sales & GTM",
    stage: "Agency",
    description:
      "Sales funnels, copywriting, and outbound for Swiss enterprise clients including HSG Family Institute.",
    evidence: "$0.5M revenue, 10 clients",
    visual: "rehearse",
    accent: "lime",
  },
  {
    name: "SmartCredit.io",
    category: "DeFi lending",
    stage: "Funded",
    description:
      "Decentralized lending platform. CMO role leading to major funding milestone.",
    evidence: "Raised 1,200 ETH",
    visual: "privacy",
    accent: "blue",
  },
];

type ProjectCardProps = {
  project: (typeof projects)[number];
  index: number;
  accentColor: string;
  reduceMotion: boolean | null;
  canHover: boolean;
};

function ProjectCard({ project, index, accentColor, reduceMotion, canHover }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, reduceMotion ? { stiffness: 1000, damping: 100 } : TILT_SPRING);
  const springY = useSpring(pointerY, reduceMotion ? { stiffness: 1000, damping: 100 } : TILT_SPRING);
  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!canHover || reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.article
      ref={ref}
      className={`dossier-project-card accent-${project.accent}`}
      style={
        canHover && !reduceMotion
          ? { rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }
          : undefined
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.4, ease: EASE_OUT, delay: index * 0.05 }}
    >
      <ProductVisual type={project.visual} />
      <div className="flex flex-col p-6 md:p-7">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[11px] font-medium" style={{ color: accentColor }}>
            {project.category}
          </span>
          <span className="text-[11px] text-[var(--dossier-muted)]">{project.stage}</span>
        </div>
        <h4 className="text-xl font-semibold tracking-tight text-[var(--dossier-ink)]">
          {project.name}
        </h4>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--dossier-body)]">
          {project.description}
        </p>
        <p className="mt-5 border-t border-[var(--dossier-line-strong)] pt-4 text-xs text-[var(--dossier-muted)]">
          {project.evidence}
        </p>
      </div>
    </motion.article>
  );
}

export function SideProjectsGrid({ accentColor = "#10a37f" }: SideProjectsGridProps) {
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

  return (
    <section className="dossier-section !pb-0">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <motion.div
          {...(reduceMotion ? {} : dossierInView)}
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h3 className="dossier-hero-title !text-[clamp(32px,4vw,56px)]">
              Projects with <em>real outcomes</em>
            </h3>
            <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-[var(--dossier-body)]">
              I spot trends early, build things fast. Side ventures that prove execution depth beyond one
              employer context.
            </p>
          </div>

          <motion.a
            href="https://github.com/terencela"
            target="_blank"
            rel="noopener noreferrer"
            className="dossier-text-link dossier-pressable inline-flex items-center gap-2"
            {...tapProps}
          >
            github.com/terencela
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </motion.div>

        <div className="dossier-project-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              accentColor={accentColor}
              reduceMotion={reduceMotion}
              canHover={canHover}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
