"use client";

import MagneticLink from "@/components/MagneticLink";
import { ArrowDownRight, ArrowUpRight, Leaf, PiggyBank, Ticket } from "lucide-react";

export type CaseStudy = {
  context: string;
  problem: string;
  role: string;
  stack: string[];
  deploymentNote: string;
};

export type Project = {
  number: string;
  suit: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  caseStudy?: CaseStudy;
  icon?: "ticket" | "piggybank" | "leaf";
};

type ProjectCardProps = {
  project: Project;
  onHoldStart?: (event: React.PointerEvent<HTMLElement>) => void;
  onHoldEnd?: (event: React.PointerEvent<HTMLElement>) => void;
  onDragMove?: (event: React.PointerEvent<HTMLElement>) => void;
};

export default function ProjectCard({ project, onHoldStart, onHoldEnd, onDragMove }: ProjectCardProps) {
  const hasPublicLinks = project.liveUrl || project.repoUrl;
  const ProjectIcon = project.icon === "ticket" ? Ticket : project.icon === "piggybank" ? PiggyBank : project.icon === "leaf" ? Leaf : null;
  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    onDragMove?.(event);
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--card-tilt-x", `${x * 8}deg`);
    event.currentTarget.style.setProperty("--card-tilt-y", `${y * -8}deg`);
  }

  function resetTilt(event: React.PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--card-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--card-tilt-y", "0deg");
  }

  function handleHoldStart(event: React.PointerEvent<HTMLElement>) {
    if (event.target instanceof Element && event.target.closest("a, button, summary")) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    onHoldStart?.(event);
  }

  function handleHoldEnd(event: React.PointerEvent<HTMLElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    onHoldEnd?.(event);
  }

  return (
    <article className="project-card" onPointerDown={handleHoldStart} onPointerUp={handleHoldEnd} onPointerCancel={handleHoldEnd} onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
      <div className="project-number"><span>{project.number}</span><span className="project-suit" aria-hidden="true">{project.suit}</span></div>
      <div className="project-card-main">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tag-list">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        {hasPublicLinks && (
          <div className="project-links">
            {project.liveUrl && <MagneticLink href={project.liveUrl} target="_blank" rel="noreferrer" variant="outline">Live demo <ArrowUpRight className="button-icon" aria-hidden="true" size={14} /></MagneticLink>}
            {project.repoUrl && <MagneticLink href={project.repoUrl} target="_blank" rel="noreferrer" variant="outline">Repository <ArrowUpRight className="button-icon" aria-hidden="true" size={14} /></MagneticLink>}
          </div>
        )}
        {project.caseStudy && (
          <details className="case-study">
            <summary className="case-study-trigger">View Case Study <ArrowDownRight className="button-icon" aria-hidden="true" size={14} /></summary>
            <div className="case-study-content">
              <div><span>Context</span><p>{project.caseStudy.context}</p></div>
              <div><span>Problem</span><p>{project.caseStudy.problem}</p></div>
              <div><span>What I built &amp; my role</span><p>{project.caseStudy.role}</p></div>
              <div><span>Tech stack</span><div className="case-study-stack">{project.caseStudy.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
              <div><span>Deployment</span><p>{project.caseStudy.deploymentNote}</p></div>
            </div>
          </details>
        )}
      </div>
      {ProjectIcon && <ProjectIcon className="project-mark" aria-hidden="true" size={52} strokeWidth={1.35} />}
      {!hasPublicLinks && !project.caseStudy && <a className="project-arrow" href="#contact" aria-label={`Ask about ${project.title}`}><ArrowUpRight aria-hidden="true" size={22} /></a>}
    </article>
  );
}