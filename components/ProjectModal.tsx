"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { ProjectBadge } from "./ProjectCard";
import ProjectScene from "./ProjectScene";
import TechIcon from "./TechIcon";
import { techIcon } from "@/lib/tech";
import type { Project } from "@/lib/profile";

const EASE = [0.2, 0.7, 0.2, 1] as const;
const noop = () => () => {};

// Project details in a dialog. It is portalled to <body> because the card
// row is a moving transform, which would otherwise trap fixed positioning.
// Closes on Escape, the close button or a backdrop click, and hands focus
// back to the button that opened it.
export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const isClient = useSyncExternalStore(noop, () => true, () => false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [project, onClose]);

  if (!isClient) return null;

  return createPortal(
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {project && (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] grid place-items-center p-3 [perspective:1600px] sm:p-6"
          >
            <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-[#020617]/75 backdrop-blur-sm" />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              initial={{ opacity: 0, y: 70, rotateX: 18, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, rotateX: 10, scale: 0.95 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative grid max-h-[90svh] w-full max-w-[1000px] grid-rows-[minmax(0,1fr)] overflow-hidden rounded-[28px] border border-white/15 bg-[#060d26] text-white shadow-[0_60px_120px_-40px_rgba(0,0,0,0.95)] md:grid-cols-[340px_minmax(0,1fr)]"
            >
              <div className="relative hidden md:block md:min-h-[520px]">
                <ProjectScene project={project} />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#060d26] to-transparent" />
              </div>

              <div className="relative min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:26px_26px]" />

                <div className="relative flex items-start gap-4">
                  <ProjectBadge project={project} />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-white/60 uppercase">{project.context}</p>
                    <h2 id="project-dialog-title" className="mt-1.5 font-display text-2xl leading-tight uppercase sm:text-3xl">
                      {project.name}
                    </h2>
                    <p className="mt-1 text-white/70">{project.subtitle}</p>
                  </div>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border border-white/20 bg-white/10 transition-colors hover:bg-white hover:text-ink"
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>

                <dl className="relative mt-6 grid grid-cols-3 gap-3">
                  {project.facts.map(([v, k]) => (
                    <div key={k} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                      <dt className="text-[11px] text-white/55">{k}</dt>
                      <dd className="mt-0.5 text-sm font-semibold sm:text-base">{v}</dd>
                    </div>
                  ))}
                </dl>

                <h3 className="relative mt-7 font-mono text-[11px] tracking-[0.25em] text-white/60 uppercase">What I built</h3>
                <ul className="relative mt-3 grid gap-3 sm:grid-cols-2">
                  {project.highlights.map((h, i) => (
                    <motion.li
                      key={h.title}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: EASE, delay: 0.2 + i * 0.07 }}
                      className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <p className="flex items-center gap-2 text-sm font-semibold">
                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-[2px] bg-signal" />
                        {h.title}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-white/70">{h.body}</p>
                    </motion.li>
                  ))}
                </ul>

                <h3 className="relative mt-7 font-mono text-[11px] tracking-[0.25em] text-white/60 uppercase">Stack</h3>
                <ul className="relative mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((t) => {
                    const icon = techIcon(t);
                    return (
                      <li key={t} className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/85">
                        {icon && <TechIcon icon={icon} className="h-3.5 w-3.5" />}
                        {t}
                      </li>
                    );
                  })}
                </ul>

                {project.links.length > 0 && (
                  <div className="relative mt-7 flex flex-wrap gap-2">
                    {project.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-3 rounded-full bg-white py-1.5 pr-1.5 pl-5 text-sm font-medium text-ink"
                      >
                        {l.label} on GitHub
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-white transition-colors group-hover:bg-signal">
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>,
    document.body,
  );
}
