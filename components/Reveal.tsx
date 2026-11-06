"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion } from "framer-motion";

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Rises into place the first time it scrolls into view.
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 48,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li";
}) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <MotionConfig reducedMotion="user">
      <Tag
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: EASE, delay }}
        className={className}
      >
        {children}
      </Tag>
    </MotionConfig>
  );
}
