import {
  siApachekafka,
  siDocker,
  siFastapi,
  siFlutter,
  siGooglegemini,
  siOpenjdk,
  siPostgresql,
  siPrometheus,
  siPython,
  siReact,
  siSpringboot,
  siTerraform,
} from "simple-icons";
import TechIcon from "./TechIcon";

// Main stack from the CV skills list, drawn as floating tiles.
const STACK = [
  siOpenjdk,
  siSpringboot,
  siPython,
  siFastapi,
  siReact,
  siFlutter,
  siDocker,
  siTerraform,
  siPostgresql,
  siApachekafka,
  siPrometheus,
  siGooglegemini,
];

// Right side of the hero on wide screens: the main stack as floating tiles.
export default function HeroAside() {
  return (
    <div className="rise absolute right-[3%] bottom-12 hidden w-[236px] flex-col xl:flex 2xl:w-[290px]" style={{ animationDelay: "1200ms" }}>
      <div>
        <p className="font-mono text-[11px] tracking-[0.25em] text-white/65 uppercase">Main stack</p>
        <ul className="mt-4 grid grid-cols-4 gap-2.5 2xl:gap-3.5">
          {STACK.map((icon, i) => (
            <li
              key={icon.slug}
              title={icon.title}
              className={`float grid aspect-square place-items-center rounded-2xl border border-white/40 bg-white/90 shadow-[0_14px_30px_-12px_rgba(3,10,30,0.75)] transition-transform duration-300 hover:scale-110 ${
                i % 2 === 1 ? "mt-5 -mb-5" : ""
              }`}
              style={{ animationDelay: `${(i % 4) * 0.6 + Math.floor(i / 4) * 0.3}s` }}
            >
              <TechIcon icon={icon} brand className="h-6 w-6 2xl:h-7 2xl:w-7" />
              <span className="sr-only">{icon.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
