"use client";

import { useRef, useState } from "react";
import ProjectCard, { type Project } from "./ProjectCard";

type ProjectDeckProps = {
  projects: Project[];
};

export default function ProjectDeck({ projects }: ProjectDeckProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [deckProjects, setDeckProjects] = useState(projects);
  const deckRef = useRef<HTMLDivElement>(null);
  const dragOriginRef = useRef({ x: 0, y: 0 });

  function handleHoldStart(event: React.PointerEvent<HTMLElement>) {
    dragOriginRef.current = { x: event.clientX, y: event.clientY };
    setIsHolding(true);
  }

  function handleDragMove(event: React.PointerEvent<HTMLElement>) {
    if (!isHolding) return;
    deckRef.current?.style.setProperty("--drag-x", `${event.clientX - dragOriginRef.current.x}px`);
    deckRef.current?.style.setProperty("--drag-y", `${event.clientY - dragOriginRef.current.y}px`);
  }

  function handleHoldEnd() {
    if (!isHolding) return;
    setIsHolding(false);
    deckRef.current?.style.removeProperty("--drag-x");
    deckRef.current?.style.removeProperty("--drag-y");
    setDeckProjects((currentProjects) => [...currentProjects.slice(1), currentProjects[0]]);
  }

  return (
    <div ref={deckRef} className={`projects-grid project-deck${isHolding ? " is-holding" : ""}`}>
      {deckProjects.map((project) => (
        <ProjectCard
          key={project.number}
          project={project}
          onHoldStart={handleHoldStart}
          onHoldEnd={handleHoldEnd}
          onDragMove={handleDragMove}
        />
      ))}
    </div>
  );
}
