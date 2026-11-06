import {
  ArrowUp,
  ArrowUpRight,
  Boxes,
  Bot,
  CloudCog,
  FlaskConical,
  GraduationCap,
  Mail,
  ShieldCheck,
  Siren,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { siGithub } from "simple-icons";
import CellField from "@/components/CellField";
import CopyEmail from "@/components/CopyEmail";
import HeroAside from "@/components/HeroAside";
import HeroName from "@/components/HeroName";
import ProjectMarquee from "@/components/ProjectMarquee";
import Reveal from "@/components/Reveal";
import SiteNav from "@/components/SiteNav";
import TechIcon from "@/components/TechIcon";
import WhoAmI from "@/components/WhoAmI";
import { capabilities, concepts, education, interests, profile, projects, skills } from "@/lib/profile";
import { techIcon } from "@/lib/tech";

export default function Home() {
  return (
    <>
      {/* One fixed blue grid behind the whole page, with film grain over it. */}
      <div aria-hidden="true" className="fixed inset-0 -z-10">
        <CellField grain />
      </div>
      <SiteNav />
      <main>
        <Hero />
        <Work />
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-3 sm:px-4">
          <Skills />
          <Education />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  const [first, last] = profile.name.split(" ");
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-x-clip lg:h-[100svh] lg:min-h-[720px]">
      {/* Layers, back to front: giant name, portrait, copy. */}
      <div className="relative px-4 pt-[92px] sm:px-6 sm:pt-[100px] lg:absolute lg:inset-x-0 lg:top-[92px] lg:px-[2.5vw] lg:pt-0">
        <HeroName first={first} last={last} />
      </div>

      <div className="relative -mt-[9vw] h-[60svh] min-h-[380px] lg:absolute lg:inset-x-0 lg:top-[36%] lg:bottom-0 lg:mt-0 lg:h-auto lg:min-h-0 xl:top-[26%]">
        {/* Static export has no image optimizer, so the pre-sized WebP is served as is.
            The face sits at 47% of the cutout's width, so that point is centred. */}
        <Image
          src="/portrait/portrait.webp"
          alt={`Portrait of ${profile.name}`}
          width={1192}
          height={1100}
          priority
          unoptimized
          className="rise absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-[47%] drop-shadow-[0_24px_48px_rgba(9,26,64,0.6)] [mask-image:linear-gradient(to_bottom,#000_80%,transparent)]"
          style={{ animationDelay: "500ms" }}
        />
      </div>

      <div
        className="rise relative px-4 pt-6 pb-10 sm:max-w-[520px] sm:px-10 lg:absolute lg:bottom-12 lg:left-12 lg:w-[300px] lg:max-w-none lg:p-0 xl:w-[340px] 2xl:w-[380px]"
        style={{ animationDelay: "1000ms" }}
      >
        <WhoAmI />
      </div>

      <HeroAside />
    </section>
  );
}

// Frosted panel shared by the content sections: dark enough to read on, clear
// enough that the grid shows through, with a faint top highlight as an edge.
const PANEL =
  "rounded-[28px] border border-white/10 bg-abyss/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_60px_-30px_rgba(3,10,30,0.8)] backdrop-blur-md";

function SectionHead({ id, title, note }: { id: string; title: string; note?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-white/15 pb-5 text-white">
      <h2 id={id} className="font-display text-[1.9rem] leading-none tracking-tight uppercase sm:text-[2.75rem] lg:text-[3.5rem]">
        {title}
      </h2>
      {note && <p className="font-mono text-xs tracking-[0.2em] text-white/70 uppercase">{note}</p>}
    </div>
  );
}

// Engineering concepts scrolling past, at the top of the contact section.
const BAND = [
  "Cell-based architecture",
  "Zero trust",
  "Event-driven systems",
  "Hash-chained ledgers",
  "Infrastructure as code",
  "Circuit breakers",
  "Observability",
  "Human in the loop",
];

function ConceptBand() {
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-white/15 bg-abyss/50 py-5 backdrop-blur-sm">
      {/* Two identical copies, so shifting by half the width loops without a seam. */}
      <div className="marquee flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {BAND.map((t, i) => (
              <span key={t} className="flex items-center font-display text-2xl whitespace-nowrap text-white uppercase sm:text-4xl">
                <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.75)]" : ""}>{t}</span>
                <span className="mx-8 inline-block h-3 w-3 rounded-[3px] bg-signal sm:h-3.5 sm:w-3.5" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="pt-24 pb-4 lg:pt-32">
      <div className="mx-auto max-w-[1400px] px-3 sm:px-4">
        <SectionHead id="work-title" title="Work" note={`${projects.length} projects`} />
      </div>
      <ProjectMarquee projects={projects} />
    </section>
  );
}

const CAPABILITY_ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  boxes: Boxes,
  cloud: CloudCog,
  workflow: Workflow,
  bot: Bot,
  siren: Siren,
  phone: Smartphone,
  flask: FlaskConical,
};

function Skills() {
  const toolbox = skills.flatMap((s) => s.items);
  return (
    <section id="skills" aria-labelledby="skills-title" className={`${PANEL} p-6 sm:p-8 lg:p-10`}>
      <SectionHead id="skills-title" title="Skills" note="What I can do" />

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {capabilities.map((c, i) => {
          const Icon = CAPABILITY_ICONS[c.icon];
          return (
            <Reveal as="li" key={c.title} delay={(i % 4) * 0.08} y={28} className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-white transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-signal/40 hover:bg-white/[0.07]">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white transition-colors duration-300 group-hover:bg-signal">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <p className="mt-4 text-[15px] font-semibold">{c.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{c.body}</p>
              </Reveal>
          );
        })}
      </ul>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h3 className="font-mono text-[11px] tracking-[0.25em] text-white/65 uppercase">Fields I&apos;m into</h3>
          <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {interests.map((f) => (
              <li key={f} className="flex items-center gap-4 py-3.5 text-white">
                <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-[2px] bg-signal" />
                <span className="text-base sm:text-lg">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-[11px] tracking-[0.25em] text-white/65 uppercase">Concepts I know</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {concepts.map((c) => (
              <li key={c} className="rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-2 text-sm text-white transition-colors duration-200 hover:border-signal/50">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-6">
        <h3 className="font-mono text-[11px] tracking-[0.25em] text-white/65 uppercase">Toolbox</h3>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {toolbox.map((t) => {
            const icon = techIcon(t);
            return (
              <li key={t} className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/75">
                {icon && <TechIcon icon={icon} className="h-3.5 w-3.5" />}
                {t}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className={`${PANEL} p-6 sm:p-8 lg:p-10`}>
      <SectionHead id="education-title" title="Education" />
      <ul className="mt-8 grid gap-3 md:grid-cols-2">
        {education.map((e, i) => (
          <Reveal as="li" key={e.award} delay={i * 0.1} y={24} className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-white">
              <GraduationCap aria-hidden="true" className="absolute -right-4 -bottom-4 h-28 w-28 text-white/[0.05]" />
              <p className="font-mono text-[11px] tracking-[0.2em] text-signal uppercase">{e.level}</p>
              <p className="mt-3 text-lg font-medium sm:text-xl">{e.award}</p>
              <p className="mt-1.5 text-sm text-white/70">{e.school}</p>
            </Reveal>
        ))}
      </ul>
    </section>
  );
}

function Contact() {
  const links = [
    { label: "GitHub", value: "keshan-dev", href: profile.github, icon: <TechIcon icon={siGithub} className="h-5 w-5" /> },
    { label: "LinkedIn", value: "shamika-keshan", href: profile.linkedin, icon: <span className="font-display text-sm font-bold">in</span> },
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: <Mail size={18} aria-hidden="true" /> },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="pt-24 lg:pt-32">
      <ConceptBand />
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 text-white sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:py-24">
        <Reveal>
          <h2 id="contact-title" className="font-display text-[2.6rem] leading-[0.95] tracking-tight uppercase sm:text-[4.5rem] lg:text-[6rem]">
            Get in
            <br />
            <span className="relative inline-block">
              touch
              <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-1.5 rounded-full bg-gradient-to-r from-signal to-transparent" />
            </span>
          </h2>
          <p className="mt-6 max-w-[460px] text-base leading-relaxed text-white/75">
            Email is the best way to reach me. My code is on GitHub and my work history is on LinkedIn.
          </p>
          <div className="mt-6">
            <CopyEmail email={profile.email} />
          </div>
        </Reveal>

        <ul className="flex flex-col gap-3">
          {links.map((l, i) => (
            <Reveal as="li" key={l.label} delay={0.1 + i * 0.1} y={30}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/15 bg-abyss/60 p-4 backdrop-blur-md transition-colors duration-300 hover:border-white/30 sm:p-5"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-signal transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-ink">{l.icon}</span>
                  <span className="relative min-w-0 flex-1">
                    <span className="block font-mono text-[11px] tracking-[0.2em] text-white/60 uppercase transition-colors group-hover:text-white/80">{l.label}</span>
                    <span className="block truncate text-base sm:text-lg">{l.value}</span>
                  </span>
                  <ArrowUpRight size={22} aria-hidden="true" className="relative shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/15 bg-[#050c24]/85 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-8 sm:px-10 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            {["work", "skills", "education", "contact"].map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="capitalize transition-colors hover:text-white">
                  {id}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <p className="text-xs text-white/55">&copy; {new Date().getFullYear()} {profile.name}</p>
          <a
            href="#top"
            aria-label="Back to top"
            className="group grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 transition-colors hover:bg-white hover:text-ink"
          >
            <ArrowUp size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
