import MagneticLink from "@/components/MagneticLink";
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export type CaseStudy = {
  context: string;
  problem: string;
  role: string;
  stack: string[];
  deploymentNote: string;
};

export type Project = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  caseStudy?: CaseStudy;
  icon?: LucideIcon;
};

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasPublicLinks = project.liveUrl || project.repoUrl;

  return (
    <article className="project-card">
      <div className="project-number">{project.number}</div>
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
      {project.icon && <project.icon className="project-mark" aria-hidden="true" size={52} strokeWidth={1.35} />}
      {!hasPublicLinks && !project.caseStudy && <a className="project-arrow" href="#contact" aria-label={`Ask about ${project.title}`}><ArrowUpRight aria-hidden="true" size={22} /></a>}
    </article>
  );
}