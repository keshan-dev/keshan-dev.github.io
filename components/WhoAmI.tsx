"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { profile } from "@/lib/profile";

const COMMAND = "cat whoami.txt";
const START_MS = 2300; // after the name has landed
const TICK_MS = 20;
const CHARS_PER_TICK = 2;

// Terminal card: types one command, then the motto (last word highlighted)
// and a short pitch. The full output sits invisibly underneath the typed
// copy, so the card has its final height from the start. Screen readers get
// the full text at once.
export default function WhoAmI() {
  const reduce = useReducedMotion();
  const motto = profile.motto;
  const text = profile.whoami;
  const total = COMMAND.length + motto.length + text.length;
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let id = 0;
    const startId = window.setTimeout(() => {
      id = window.setInterval(() => {
        setTyped((t) => {
          if (t >= total) window.clearInterval(id);
          return Math.min(t + CHARS_PER_TICK, total);
        });
      }, TICK_MS);
    }, START_MS);
    return () => {
      window.clearTimeout(startId);
      window.clearInterval(id);
    };
  }, [reduce, total]);

  const tick = reduce ? total : typed;
  const cmdShown = COMMAND.slice(0, Math.min(tick, COMMAND.length));
  const mottoTyped = Math.max(0, tick - COMMAND.length);
  const mottoShown = Math.min(mottoTyped, motto.length);
  const textShown = text.slice(0, Math.max(0, mottoTyped - motto.length));
  const done = tick >= total;
  const cursor = <span className={`ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 bg-white/80 ${done ? "blink" : ""}`} />;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#060f2b]/80 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3.5 py-2.5">
        {["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"].map((c) => (
          <span key={c} className={`h-2.5 w-2.5 rounded-full ${c}`} />
        ))}
        <span className="ml-2 font-mono text-[11px] text-white/45">~/root</span>
      </div>

      <div aria-hidden="true" className="px-4 py-3.5 font-mono text-[12px] leading-relaxed">
        <p className="text-white/60">
          <span className="text-signal">❯</span> {cmdShown}
          {tick < COMMAND.length && cursor}
        </p>
        <div className="mt-1.5 grid">
          <div className="invisible [grid-area:1/1]">
            <Motto motto={motto} shown={motto.length} />
            <p className="mt-2">{text}</p>
          </div>
          <div className="[grid-area:1/1]">
            {tick >= COMMAND.length && (
              <Motto motto={motto} shown={mottoShown}>
                {!textShown && cursor}
              </Motto>
            )}
            {textShown && (
              <p className="mt-2 text-white/85">
                {textShown}
                {cursor}
              </p>
            )}
          </div>
        </div>
      </div>

      <p className="sr-only">
        {motto}. {text}
      </p>
    </div>
  );
}

// The first `shown` characters of the motto, with its last word on an
// orange highlight.
function Motto({ motto, shown, children }: { motto: string; shown: number; children?: ReactNode }) {
  const start = motto.lastIndexOf(" ") + 1;
  return (
    <p className="text-[13px] font-semibold text-white uppercase">
      {motto.slice(0, Math.min(shown, start))}
      {shown > start && <span className="rounded-sm bg-signal px-1">{motto.slice(start, shown)}</span>}
      {children}
    </p>
  );
}
