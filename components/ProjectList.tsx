import MagneticButton from "@/components/MagneticButton";

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
};

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="projects-list">
      {projects.map((project) => (
        <li key={project.number}>
          <article className="project-item">
            <div className="project-feature">
              <figure className="project-preview-placeholder">
                <figcaption>Project image placeholder</figcaption>
              </figure>
              <div className="project-item-main">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="tag-list">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                {(project.liveUrl || project.repoUrl) && <nav className="project-links" aria-label={`${project.title} links`}>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <span aria-hidden="true">↗</span></a>}{project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer">Repository <span aria-hidden="true">↗</span></a>}</nav>}
                {project.caseStudy && (
                  <details>
                    <MagneticButton as="summary">View Case Study</MagneticButton>
                    <dl className="case-study-content">
                      <div><dt>Context</dt><dd>{project.caseStudy.context}</dd></div>
                      <div><dt>Problem</dt><dd>{project.caseStudy.problem}</dd></div>
                      <div><dt>What I built &amp; my role</dt><dd>{project.caseStudy.role}</dd></div>
                      <div><dt>Tech stack</dt><dd><ul className="case-study-stack">{project.caseStudy.stack.map((item) => <li key={item}>{item}</li>)}</ul></dd></div>
                      <div><dt>Deployment</dt><dd>{project.caseStudy.deploymentNote}</dd></div>
                    </dl>
                  </details>
                )}
              </div>
            </div>
            <section className="project-testimonial" aria-labelledby={`testimonial-${project.number}`}>
              <figure className="testimonial-portrait-placeholder">
                <figcaption>Portrait placeholder</figcaption>
              </figure>
              <div>
                <h4 id={`testimonial-${project.number}`}>Testimonial</h4>
                <p>Quote, name, role, and portrait pending approval.</p>
              </div>
            </section>
          </article>
        </li>
      ))}
    </ul>
  );
}
