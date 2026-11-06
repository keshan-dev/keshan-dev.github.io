"use client";

import { useState } from "react";

type Status = "idle" | "copied" | "failed";

const LABELS: Record<Status, string> = {
  idle: "Copy",
  copied: "Copied",
  failed: "Copy failed",
};

// Pill showing the email address with an inline copy button.
// "glass" sits on the cobalt canvas, "light" on the grey frame.
const TONES = {
  glass: {
    pill: "bg-black/30 backdrop-blur-md border-white/10 text-white",
    button: "bg-white text-ink hover:bg-white/85",
  },
  light: {
    pill: "bg-white border-ink/10 text-ink",
    button: "bg-ink text-white hover:bg-ink/85",
  },
};

export default function CopyEmail({ email, tone = "glass" }: { email: string; tone?: keyof typeof TONES }) {
  const [status, setStatus] = useState<Status>("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    window.setTimeout(() => setStatus("idle"), 2000);
  }

  const styles = TONES[tone];

  return (
    <div className={`relative flex h-[52px] w-full max-w-[420px] items-center rounded-full border sm:h-14 ${styles.pill}`}>
      <a
        href={`mailto:${email}`}
        className="min-w-0 truncate rounded-full px-5 text-sm underline-offset-4 hover:underline sm:px-6"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className={`absolute top-1.5 right-1.5 bottom-1.5 cursor-pointer rounded-full px-4 text-xs font-medium transition-colors duration-200 sm:px-5 sm:text-sm ${styles.button}`}
      >
        {LABELS[status]}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === "idle" ? "" : LABELS[status]}
      </span>
    </div>
  );
}
