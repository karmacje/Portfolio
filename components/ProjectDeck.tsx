"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import ProjectCard, { type Project } from "./ProjectCard";

type ProjectDeckProps = {
  projects: Project[];
};

type AnimatedProjectCardProps = {
  project: Project;
  index: number;
  arrayLength: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
};

function AnimatedProjectCard({
  project,
  index,
  arrayLength,
  scrollProgress,
}: AnimatedProjectCardProps) {
  const start = index / (arrayLength + 1);
  const end = (index + 1) / (arrayLength + 1);
  const rotateStart = start - 1.5;
  const rotateEnd = end / 1.5;
  const y = useTransform(scrollProgress, [start, end], ["0%", "-180%"]);
  const rotate = useTransform(scrollProgress, [rotateStart, rotateEnd], [
    -index + 90,
    0,
  ]);
  const transform = useMotionTemplate`translateZ(${index * 10}px) translateY(${y}) rotate(${rotate}deg)`;
  const x = useTransform(scrollProgress, [rotateStart, rotateEnd], [4, 0]);
  const shadowY = useTransform(scrollProgress, [rotateStart, rotateEnd], [4, 12]);
  const blur = useTransform(scrollProgress, [rotateStart, rotateEnd], [2, 24]);
  const alpha = useTransform(scrollProgress, [rotateStart, rotateEnd], [0.15, 0.2]);
  const filter = useMotionTemplate`drop-shadow(${x}px ${shadowY}px ${blur}px rgba(0, 0, 0, ${alpha}))`;

  return (
    <motion.div
      className="project-deck-card"
      style={{
        filter,
        transform,
        zIndex: (arrayLength - index) * 10,
      }}
    >
      <ProjectCard project={project} />
    </motion.div>
  );
}

export default function ProjectDeck({ projects }: ProjectDeckProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start center", "end end"],
  });

  return (
    <div ref={deckRef} className="project-deck">
      <div className="project-deck-sticky">
        <div className="project-deck-cards">
          {projects.map((project, index) => (
            <AnimatedProjectCard
              arrayLength={projects.length}
              index={index + 2}
              key={project.number}
              project={project}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
