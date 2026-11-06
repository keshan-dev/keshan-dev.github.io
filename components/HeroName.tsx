"use client";

import { useEffect, useState } from "react";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";

const EASE = [0.2, 0.7, 0.2, 1] as const;
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&";
const SCRAMBLE_MS = 1100;
const LETTER_DELAY = 0.35;
const LETTER_STAGGER = 0.09;

// Load sequence: the first name decodes out of random glyphs while each letter
// of the surname flips up out of a blur. Once every letter has landed, a warm
// light sweeps across the surname and an underline draws in. Screen readers
// get the plain name from aria-label.
export default function HeroName({ first, last }: { first: string; last: string }) {
  const letters = [...last];
  const landed = LETTER_DELAY + (letters.length - 1) * LETTER_STAGGER + 0.9;

  return (
    <MotionConfig reducedMotion="user">
      <h1 aria-label={`${first} ${last}`} className="text-white uppercase">
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="flex items-center gap-3 font-display text-[6.2vw] tracking-[0.32em] sm:text-[3.4vw] lg:text-[2.1vw]"
        >
          <span className="h-[0.5em] w-[0.5em] shrink-0 rounded-[2px] bg-signal shadow-[0_0_18px_rgba(255,90,31,0.8)]" />
          <Scramble text={first} />
        </motion.span>

        <span
          aria-hidden="true"
          className="relative -mt-[1vw] flex justify-between font-display text-[15.4vw] leading-[0.95] tracking-tight [perspective:900px] [filter:drop-shadow(0_0_28px_rgba(150,190,255,0.45))]"
        >
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: "60%", rotateX: -85, scale: 1.25, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: "0%", rotateX: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: EASE, delay: LETTER_DELAY + i * LETTER_STAGGER }}
              style={{ transformOrigin: "50% 100%", animationDelay: `${landed + i * 0.07}s` }}
              className="name-letter block pb-[0.04em]"
            >
              {ch}
            </motion.span>
          ))}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE, delay: landed - 0.2 }}
            className="absolute right-0 -bottom-[0.06em] left-0 h-[3px] origin-left rounded-full bg-gradient-to-r from-signal via-[#ff9a6b] to-transparent sm:h-1"
          />
        </span>
      </h1>
    </MotionConfig>
  );
}

// Cycles random glyphs, settling one character at a time from the left.
// Starts from the final text so server and client markup match.
function Scramble({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    const id = window.setInterval(() => {
      const settled = Math.floor(((performance.now() - start) / SCRAMBLE_MS) * text.length);
      if (settled >= text.length) {
        setShown(text);
        window.clearInterval(id);
        return;
      }
      setShown(
        [...text].map((ch, i) => (i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(""),
      );
    }, 45);
    return () => window.clearInterval(id);
  }, [text, reduce]);

  return <span className="tabular-nums">{shown}</span>;
}
