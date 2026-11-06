"use client";

import type { PointerEvent } from "react";
import Image from "next/image";
import { MotionConfig, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import ProjectScene from "./ProjectScene";
import type { Project } from "@/lib/profile";

const EASE = [0.2, 0.7, 0.2, 1] as const;
const TILT_SPRING = { stiffness: 170, damping: 18, mass: 0.6 };
const MAX_TILT = 10;

// Tall project card: full-bleed scene, title, three facts and a "See more"
// button that opens the project details. It flies in the first time it comes
// into view and tilts toward a mouse pointer. A clone is the second copy in
// the scrolling row: hidden from assistive tech and out of the tab order.
export default function ProjectCard({
  project: p,
  index,
  clone = false,
  onOpen,
}: {
  project: Project;
  index: number;
  clone?: boolean;
  onOpen: (p: Project) => void;
}) {
  const reduce = useReducedMotion();
  const inProgress = p.context === "In progress";

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), TILT_SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), TILT_SPRING);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(380px circle at ${gx} ${gy}, rgba(255,255,255,0.22), transparent 55%)`;

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <MotionConfig reducedMotion="user">
      <motion.article
        id={clone ? undefined : p.id}
        aria-labelledby={clone ? undefined : `${p.id}-name`}
        aria-hidden={clone || undefined}
        initial={{ opacity: 0, y: 110, rotateY: -32, rotateX: 14, scale: 0.88 }}
        whileInView={{ opacity: 1, y: 0, rotateY: 0, rotateX: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.1, ease: EASE, delay: (index % 5) * 0.12 }}
        className="w-[320px] shrink-0 [perspective:1400px] sm:w-[340px]"
      >
        <div onPointerMove={onMove} onPointerLeave={onLeave}>
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative h-[520px] overflow-hidden rounded-[26px] border border-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
          >
            <ProjectScene project={p} />
            <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#040817] from-40% via-[#040817]/90 to-transparent" />

            <div className="absolute inset-x-4 top-4 flex items-center justify-between">
              <ProjectBadge project={p} />
              <span className="rounded-full border border-white/20 bg-black/30 px-2.5 py-1 font-mono text-[10px] tracking-[0.15em] text-white/85 uppercase backdrop-blur-md">
                {p.shots?.length ? "Screenshot" : "Concept"}
              </span>
            </div>

            <div className="absolute inset-x-5 bottom-5 text-white">
              <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-white/65 uppercase">
                <span className={`h-1.5 w-1.5 rounded-full ${inProgress ? "bg-signal shadow-[0_0_8px_#ff5a1f]" : "bg-white/50"}`} />
                {p.context}
              </p>
              <h3 id={clone ? undefined : `${p.id}-name`} className="mt-2 font-display text-[22px] leading-tight uppercase">
                {p.name}
              </h3>
              <p className="mt-1 text-sm text-white/70">{p.subtitle}</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
                {p.facts.map(([v, k]) => (
                  <div key={k}>
                    <dt className="sr-only">{k}</dt>
                    <dd className="text-[13px] leading-tight font-semibold">{v}</dd>
                    <dd className="mt-0.5 text-[10.5px] text-white/55">{k}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                onClick={() => onOpen(p)}
                tabIndex={clone ? -1 : undefined}
                aria-haspopup="dialog"
                aria-label={`See more about ${p.name}`}
                className="group mt-4 flex w-full cursor-pointer items-center justify-between rounded-full border border-white/20 bg-white/10 py-1.5 pr-1.5 pl-5 text-sm font-medium backdrop-blur-md transition-colors duration-300 hover:bg-white/20"
              >
                See more
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                  <ChevronRight size={18} aria-hidden="true" />
                </span>
              </button>
            </div>

            <motion.div aria-hidden="true" style={{ background: glare }} className="pointer-events-none absolute inset-0 mix-blend-overlay" />
          </motion.div>
        </div>
      </motion.article>
    </MotionConfig>
  );
}

// The project's own mark when it has one, otherwise its initial.
export function ProjectBadge({ project: p }: { project: Project }) {
  return (
    <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/20 bg-black/30 backdrop-blur-md">
      {p.logo ? (
        <Image src={p.logo} alt="" width={40} height={40} unoptimized className={p.logo.endsWith(".svg") ? "h-full w-full" : "h-6 w-6"} />
      ) : (
        <span className="font-display text-sm text-white">{p.name[0]}</span>
      )}
    </span>
  );
}
