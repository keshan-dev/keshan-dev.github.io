import type { ReactNode } from "react";
import Image from "next/image";
import { siGithub, siGooglegemini, siPrometheus } from "simple-icons";
import TechIcon from "./TechIcon";
import type { Project } from "@/lib/profile";

// Full-bleed scene for the front of a project card (340 x 520). Arka uses
// real screenshots from its public repository. The others are concept mockups
// of what each system does, built as detailed device renders; the card labels
// them "Concept". Sample values inside the mockups are illustrative.

const STUDIO: Record<string, string> = {
  arka: "radial-gradient(120% 80% at 70% 10%, #3b4bd6 0%, #16207a 45%, #070b2a 100%)",
  "devops-command-center": "radial-gradient(120% 80% at 30% 5%, #b2431b 0%, #3a1410 45%, #0a0608 100%)",
  silverline: "radial-gradient(120% 80% at 70% 5%, #1f8a86 0%, #0d3b45 45%, #050d14 100%)",
  headref: "radial-gradient(120% 80% at 30% 5%, #5d8f57 0%, #1c3326 45%, #060c09 100%)",
  fitzealot: "radial-gradient(120% 80% at 70% 5%, #7b3fd1 0%, #2a1550 45%, #08051a 100%)",
};

export default function ProjectScene({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: STUDIO[project.id] }}>
      {/* Soft key light and a floor the devices stand on. */}
      <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/15 blur-3xl" />
      <div className="absolute inset-x-0 top-[62%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute inset-0 [perspective:900px]">{SCENES[project.id]?.(project)}</div>
    </div>
  );
}

const SCENES: Record<string, (p: Project) => ReactNode> = {
  arka: (p) => {
    const [front, back] = p.shots ?? [];
    return (
      <div className="absolute top-[11%] left-1/2 w-[300px] -translate-x-1/2 [transform-style:preserve-3d] [transform:rotateX(14deg)_rotateY(-16deg)_rotateZ(2deg)]">
        {back && (
          <Browser url="arka.bank/accounts" className="absolute -top-6 -left-10 w-[250px] opacity-90 [transform:translateZ(-40px)]">
            <Image src={back.src} alt="" width={1440} height={900} unoptimized className="block h-auto w-full" />
          </Browser>
        )}
        {front && (
          <Browser url="console.arka.bank/health" className="relative top-10 left-8 w-[260px]">
            <Image src={front.src} alt={front.alt} width={1440} height={900} unoptimized className="block h-auto w-full" />
          </Browser>
        )}
      </div>
    );
  },

  "devops-command-center": () => (
    <Phone className="top-[5%] left-1/2 -translate-x-1/2 [transform-origin:50%_0] [transform:rotateY(-12deg)_rotateX(6deg)_scale(0.76)]">
      <div className="px-3 pt-1 text-[9px] text-white">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold">Incidents</span>
          <span className="rounded-full bg-signal/20 px-1.5 py-0.5 text-[8px] text-[#ffb08f]">1 open</span>
        </div>
        <div className="mt-2 rounded-xl bg-white/[0.07] p-2 ring-1 ring-white/10">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_6px_#ff5a1f]" />
            <span className="font-semibold">checkout-api</span>
            <span className="ml-auto text-white/50">SEV-2</span>
          </div>
          <p className="mt-1 text-white/70">Error rate up after deploy</p>
        </div>
        <p className="mt-2 text-[8px] tracking-wider text-white/45 uppercase">Probable cause</p>
        <p className="mt-0.5 leading-snug text-white/90">Last deploy changed the DB connection pool size.</p>
        <p className="mt-2 text-[8px] tracking-wider text-white/45 uppercase">Evidence</p>
        <ul className="mt-1 space-y-1">
          <Evidence label="Loki" text="Errors spike after rollout" />
          <Evidence icon={siPrometheus} label="Metrics" text="p95 latency climbing" />
          <Evidence icon={siGithub} label="Deploys" text="New release minutes earlier" />
        </ul>
        <div className="mt-2 rounded-xl bg-white/[0.07] p-2 ring-1 ring-white/10">
          <p className="text-white/60">Suggested playbook</p>
          <p className="font-semibold">Rollback</p>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5 text-center">
            <span className="rounded-lg bg-signal py-1 font-semibold">Approve</span>
            <span className="rounded-lg bg-white/10 py-1">Decline</span>
          </div>
        </div>
      </div>
    </Phone>
  ),

  silverline: () => (
    <Browser url="pos.silverline.lk/checkout" dark className="absolute top-[10%] left-1/2 w-[292px] -translate-x-1/2 [transform:rotateX(16deg)_rotateY(14deg)_rotateZ(-2deg)]">
      <div className="grid grid-cols-[1.5fr_1fr] gap-2 bg-[#0c141b] p-2.5 text-[8.5px] text-white">
        <div>
          <p className="text-[8px] tracking-wider text-white/45 uppercase">Cart</p>
          <ul className="mt-1 divide-y divide-white/5">
            {[
              ["Basmati rice 5kg", "2", "4,900"],
              ["Coconut oil 1L", "1", "1,150"],
              ["Tea leaves 400g", "3", "2,670"],
              ["Dhal 1kg", "2", "760"],
            ].map(([item, qty, total], i) => (
              <li key={item} className={`flex items-center gap-1.5 py-1 ${i === 2 ? "rounded bg-[#1f8a86]/25 px-1" : ""}`}>
                <span className="flex-1 truncate">{item}</span>
                <span className="text-white/50">x{qty}</span>
                <span className="w-9 text-right tabular-nums">{total}</span>
              </li>
            ))}
          </ul>
          <p className="mt-1.5 flex gap-1 text-[7.5px] text-white/45">
            <Kbd>F2</Kbd> pay <Kbd>F4</Kbd> discount <Kbd>Esc</Kbd> void
          </p>
        </div>
        <div className="flex flex-col justify-between rounded-lg bg-white/[0.05] p-2 ring-1 ring-white/10">
          <div className="space-y-1">
            <span className="inline-block rounded-full bg-[#1f8a86]/40 px-1.5 py-0.5 text-[7.5px] text-[#9ff3ec]">Promo applied</span>
            <Row k="Subtotal" v="9,480" />
            <Row k="Promotion" v="-948" />
          </div>
          <div>
            <p className="text-[8px] text-white/55">Total (LKR)</p>
            <p className="text-[15px] font-semibold tabular-nums">8,532</p>
            <span className="mt-1 block rounded-md bg-[#2bb3ad] py-1 text-center font-semibold text-[#03201f]">Pay</span>
          </div>
        </div>
      </div>
    </Browser>
  ),

  headref: () => (
    <Browser url="headref.app/issues/HRS-142" className="absolute top-[9%] left-1/2 w-[296px] -translate-x-1/2 [transform:rotateX(14deg)_rotateY(-14deg)_rotateZ(1.5deg)]">
      <div className="bg-white p-2.5 text-[8.5px] text-[#16241b]">
        <div className="flex items-center gap-1.5">
          <span className="rounded bg-[#e6f0ff] px-1 font-mono text-[7.5px] text-[#1d4ed8]">HRS-142</span>
          <span className="font-semibold">Add OAuth token refresh</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5 text-[7.5px]">
          {[
            ["Branch", "feat/hrs-142"],
            ["Pull request", "#58 merged"],
            ["Commits", "3 linked"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-md border border-[#e3e9e4] bg-[#f6f9f6] p-1.5">
              <p className="text-[#6b7a70]">{k}</p>
              <p className="mt-0.5 font-mono">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-md border border-[#e3e9e4] p-2">
          <p className="text-[7.5px] tracking-wider text-[#6b7a70] uppercase">Summary</p>
          <p className="mt-1 leading-snug">
            Refresh flow merged in PR #58 <Cite n={1} />, with tests added in the second commit <Cite n={2} />.
          </p>
          <p className="mt-1.5 flex items-center gap-1 rounded bg-[#fff1ec] px-1.5 py-1 text-[7.5px] text-[#b4401a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f]" />
            1 claim removed: no source record
          </p>
        </div>
      </div>
    </Browser>
  ),

  fitzealot: () => (
    <Phone className="top-[5%] left-1/2 -translate-x-1/2 [transform-origin:50%_0] [transform:rotateY(12deg)_rotateX(6deg)_scale(0.76)]">
      <div className="px-3 pt-1 text-[9px] text-white">
        <p className="text-white/50">Today</p>
        <p className="text-[13px] font-semibold">Upper body</p>
        <p className="mt-0.5 flex items-center gap-1 text-[8px] text-[#c9b2ff]">
          <TechIcon icon={siGooglegemini} className="h-2.5 w-2.5" />
          Plan generated with Gemini
        </p>
        <ul className="mt-2 space-y-1">
          {[
            ["Bench press", "4 x 8"],
            ["Pull-ups", "3 x 10"],
            ["Shoulder press", "3 x 10"],
            ["Plank", "3 x 45s"],
          ].map(([name, sets], i) => (
            <li key={name} className="flex items-center gap-2 rounded-lg bg-white/[0.07] px-2 py-1.5 ring-1 ring-white/10">
              <span className={`grid h-3.5 w-3.5 place-items-center rounded-full text-[7px] ${i < 2 ? "bg-[#7b3fd1]" : "ring-1 ring-white/30"}`}>
                {i < 2 ? "✓" : ""}
              </span>
              <span className="flex-1">{name}</span>
              <span className="text-white/55 tabular-nums">{sets}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[8px] tracking-wider text-white/45 uppercase">This week</p>
        <div className="mt-1 flex h-14 items-end gap-1">
          {[45, 60, 30, 75, 55, 90, 20].map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
              <span className={`w-full rounded-t ${i === 5 ? "bg-gradient-to-t from-[#7b3fd1] to-[#c9b2ff]" : "bg-white/20"}`} style={{ height: `${h}%` }} />
              <span className="text-[6.5px] text-white/40">{"MTWTFSS"[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  ),
};

// Device frames ---------------------------------------------------------

function Phone({ children, className }: { children: ReactNode; className: string }) {
  return (
    <div
      className={`absolute h-[300px] w-[152px] rounded-[30px] bg-[linear-gradient(145deg,#4a4a52,#141418_40%,#2c2c33)] p-[5px] shadow-[0_40px_60px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)] ${className}`}
    >
      <div className="relative h-full overflow-hidden rounded-[25px] bg-[#0b0f1c]">
        <div className="flex items-center justify-between px-4 pt-2 text-[8px] font-semibold text-white">
          <span>9:41</span>
          <span className="h-3.5 w-12 rounded-full bg-black" />
          <span className="flex items-end gap-[1.5px]">
            {[3, 5, 7, 9].map((h) => (
              <span key={h} className="w-[2px] rounded-sm bg-white" style={{ height: h }} />
            ))}
          </span>
        </div>
        <div className="mt-1.5">{children}</div>
        <span className="absolute bottom-1.5 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full bg-white/60" />
        <Glare />
      </div>
    </div>
  );
}

function Browser({ children, url, className, dark = false }: { children: ReactNode; url: string; className: string; dark?: boolean }) {
  return (
    <div
      className={`overflow-hidden rounded-[10px] shadow-[0_40px_60px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12)] ${className}`}
    >
      <div className={`flex items-center gap-1 px-2 py-1.5 ${dark ? "bg-[#1b232b]" : "bg-[#e8ebf0]"}`}>
        {["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"].map((c) => (
          <span key={c} className={`h-1.5 w-1.5 rounded-full ${c}`} />
        ))}
        <span className={`ml-2 flex-1 truncate rounded px-1.5 py-0.5 font-mono text-[7px] ${dark ? "bg-black/30 text-white/50" : "bg-white text-[#6b7280]"}`}>{url}</span>
      </div>
      <div className="relative">
        {children}
        <Glare />
      </div>
    </div>
  );
}

const Glare = () => (
  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.04)_28%,transparent_45%)]" />
);

function Evidence({ icon, label, text }: { icon?: typeof siGithub; label: string; text: string }) {
  return (
    <li className="flex items-center gap-1.5 rounded-lg bg-white/[0.05] px-1.5 py-1">
      <span className="grid h-4 w-4 shrink-0 place-items-center rounded bg-white/10">
        {icon ? <TechIcon icon={icon} className="h-2.5 w-2.5" /> : <span className="text-[6.5px] font-bold">L</span>}
      </span>
      <span className="text-white/50">{label}</span>
      <span className="truncate text-white/85">{text}</span>
    </li>
  );
}

const Kbd = ({ children }: { children: ReactNode }) => <span className="rounded border border-white/20 px-0.5 font-mono">{children}</span>;
const Row = ({ k, v }: { k: string; v: string }) => (
  <p className="flex justify-between text-white/70">
    <span>{k}</span>
    <span className="tabular-nums">{v}</span>
  </p>
);
const Cite = ({ n }: { n: number }) => (
  <sup className="rounded bg-[#e6f0ff] px-0.5 text-[6.5px] text-[#1d4ed8]">{n}</sup>
);
