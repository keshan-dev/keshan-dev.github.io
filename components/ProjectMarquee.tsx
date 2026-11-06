"use client";

import { useCallback, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/lib/profile";

// Project cards drifting sideways in a loop. The row holds two identical
// copies, so shifting it by half its width loops without a seam. It pauses
// on hover, on keyboard focus and while a project is open. With reduced
// motion it stays still and scrolls by hand instead.
export default function ProjectMarquee({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <>
      <div className="overflow-x-auto [mask-image:linear-gradient(to_right,transparent,#000_3%,#000_97%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className={`marquee marquee-work flex w-max ${open ? "marquee-paused" : ""}`}>
          {[false, true].map((clone) => (
            <div key={String(clone)} className="flex shrink-0 gap-4 py-14 pr-4">
              {projects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} clone={clone} onOpen={setOpen} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <ProjectModal project={open} onClose={close} />
    </>
  );
}
