"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Mark from "./Mark";
import { profile, socials } from "@/lib/profile";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const EASE = [0.2, 0.7, 0.2, 1] as const;
const PILL_SPRING = { type: "spring", stiffness: 380, damping: 32 } as const;

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  // Highlight the section that sits in the middle of the viewport.
  useEffect(() => {
    const margin = { rootMargin: "-45% 0px -50% 0px" };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, margin);
    const top = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActive(null);
    }, margin);

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    const hero = document.getElementById("top");
    if (hero) top.observe(hero);

    return () => {
      observer.disconnect();
      top.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Hover previews a link; otherwise the pill rests on the current section.
  const highlight = hovered ?? active;

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="fixed inset-x-3 top-3 z-50 sm:inset-x-4 sm:top-4"
      >
        <nav aria-label="Main" className="flex items-center justify-between gap-3">
          <div
            className={`relative flex items-center overflow-hidden rounded-2xl border px-3 py-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 sm:px-4 ${
              scrolled
                ? "border-white/15 bg-abyss/75 shadow-[0_18px_40px_-20px_rgba(3,10,30,0.9)]"
                : "border-white/10 bg-white/[0.06]"
            }`}
          >
            <a href="#top" className="group flex items-center gap-3 rounded-lg py-1 pr-1" aria-label="Shamika Keshan, back to top">
              <motion.span
                initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 }}
                className="grid h-9 w-9 place-items-center rounded-xl bg-white text-ink"
              >
                <Mark className="h-5 w-5" />
              </motion.span>
              <span className="hidden flex-col leading-none sm:flex">
                <span className="font-display text-[11px] tracking-[0.18em] text-white uppercase">{profile.name}</span>
                <span className="mt-1.5 font-mono text-[10px] tracking-[0.2em] text-white/55 uppercase">{profile.role}</span>
              </span>
            </a>

            <ul className="ml-8 hidden items-center lg:flex xl:ml-16" onMouseLeave={() => setHovered(null)}>
              {SECTIONS.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.35 + i * 0.07 }}
                >
                  <a
                    href={`#${id}`}
                    onMouseEnter={() => setHovered(id)}
                    onFocus={() => setHovered(id)}
                    onBlur={() => setHovered(null)}
                    aria-current={active === id ? "true" : undefined}
                    className={`relative block rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                      highlight === id ? "text-ink" : "text-white/75 hover:text-white"
                    }`}
                  >
                    {highlight === id && (
                      <motion.span layoutId="nav-pill" transition={PILL_SPRING} className="absolute inset-0 rounded-full bg-white" />
                    )}
                    <span className="relative">{label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="ml-6 cursor-pointer rounded-xl p-2.5 text-white sm:ml-16 md:ml-40 lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Reading progress along the bottom edge of the bar. */}
            <motion.span
              aria-hidden="true"
              style={{ scaleX: progress }}
              className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-signal via-[#ff9a6b] to-signal"
            />
          </div>

          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
            className="hidden items-center gap-4 sm:flex"
          >
            <LocalTime />
          </motion.div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="absolute top-[4.5rem] right-0 left-0 origin-top rounded-2xl border border-white/10 bg-abyss/90 p-5 backdrop-blur-xl lg:hidden"
            >
              <motion.ul
                initial="hidden"
                animate="shown"
                variants={{ shown: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
                className="flex flex-col"
              >
                {SECTIONS.map(({ id, label }) => (
                  <motion.li
                    key={id}
                    variants={{ hidden: { opacity: 0, x: -12 }, shown: { opacity: 1, x: 0 } }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-3 font-display text-base tracking-[0.12em] text-white uppercase"
                    >
                      {label}
                      <ArrowUpRight size={16} aria-hidden="true" className="text-white/40" />
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <ul className="mt-3 flex gap-2 border-t border-white/10 pt-4">
                {socials
                  .filter((s) => s.href.startsWith("http"))
                  .map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noreferrer" className="block rounded-full border border-white/15 px-4 py-2 text-sm text-white">
                        {s.label}
                      </a>
                    </li>
                  ))}
              </ul>
              <a
                href={`mailto:${profile.email}`}
                className="mt-4 block rounded-full bg-white py-3 text-center text-sm font-medium text-ink"
              >
                Email me
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </MotionConfig>
  );
}

// Local time in Sri Lanka, rendered after mount so server and client markup match.
function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Colombo" });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  if (!time) return null;
  return (
    <p className="hidden items-center gap-2 rounded-full border border-white/10 bg-abyss/60 px-4 py-2.5 font-mono text-xs tracking-[0.15em] text-white/75 uppercase backdrop-blur-md xl:flex">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
      Sri Lanka {time}
    </p>
  );
}
