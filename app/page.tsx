import CertificationBadges from "@/components/CertificationBadges";
import ProfileCard from "@/components/ProfileCard";
import ProjectList, { type Project } from "@/components/ProjectList";
import Toolbox from "@/components/Toolbox";

const projects: Project[] = [
  { number: "01", suit: "♠", title: "NMMC Queuing System", description: "A ticket management system for hospital patients, designed to make queue operations clearer and waiting more manageable.", tags: ["Next.js", "Prisma", "MySQL"], caseStudy: { context: "Built during my internship at Northern Mindanao Medical Center to support patient queuing and ticket management in a hospital setting.", problem: "Hospital teams needed a clearer way to organize patient tickets and keep queue progress manageable during daily operations.", role: "I built the queuing system's web experience and supporting data flows, working across the interface, application logic, and database integration.", stack: ["Next.js", "Prisma", "MySQL"], deploymentNote: "The system is hosted on NMMC's internal server for hospital use. It is not publicly reachable due to healthcare facility policy." } },
  { number: "02", suit: "♣", title: "Bantay Baboy", description: "An IoT monitoring experience that gives livestock caretakers a clearer view of what needs attention.", tags: ["React", "Supabase", "IoT"] },
  { number: "03", suit: "♦", title: "Artificial Greenery", description: "A visual showcase site for discovering low-maintenance greenery that brings warmth into a space.", tags: ["Web Design", "Next.js", "Responsive UI"] },
];

const stackGroups = [
  { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { label: "Backend & data", items: ["Prisma", "MySQL", "Supabase", "REST APIs"] },
  { label: "Systems", items: ["Networking", "Cybersecurity", "Cisco tools"] },
];

export default function Home() {
  return (
    <main>
      <header className="site-nav">
        <nav aria-label="Primary navigation">
          <ul>
            <li><a href="#intro">Home</a></li>
            <li><a href="#background">Background</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#stack">Stack</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="nav-actions">
          <a className="nav-cv" href="/Valmores_CV.pdf" target="_blank" rel="noreferrer">CV</a>
          <a className="nav-status" href="mailto:valmores.karlmcjay@gmail.com"><span className="status-dot" /> Available for work</a>
        </div>
      </header>

      <section className="hero section-shell" id="intro">
        <div className="hero-kicker"><span>Portfolio / 2026</span><span>Based in the Philippines</span></div>
        <div className="hero-layout">
          <div className="hero-content">
            <p className="eyebrow programmer-label" aria-label="PROGRAMMER"><span aria-hidden="true">P</span><span aria-hidden="true">R</span><span aria-hidden="true">O</span><span aria-hidden="true">G</span><span aria-hidden="true">R</span><span aria-hidden="true">A</span><span aria-hidden="true">M</span><span aria-hidden="true">M</span><span aria-hidden="true">E</span><span aria-hidden="true">R</span></p>
            <h1 className="hero-title">Full-stack <em>Web Developer</em></h1>
            <div className="hero-bottom">
              <p className="hero-description">Thoughtful interfaces, useful systems, and digital experiences made to feel clear, capable, and human.</p>
              <div className="hero-actions"><a className="button button-solid" href="#projects">View projects <span aria-hidden="true">↘</span></a><a className="button button-outline" href="#contact">Contact me <span aria-hidden="true">↗</span></a></div>
            </div>
          </div>
          <div className="profile-frame"><ProfileCard /></div>
        </div>
        <a className="scroll-cue" href="#background"><span>Scroll to explore</span><span aria-hidden="true">↓</span></a>
      </section>

      <section className="section-shell split-section" id="background">
        <div className="section-label"><span>01</span><span>Background</span></div>
        <div className="section-body">
          <h2>I like making complex things feel <em>clear.</em></h2>
          <p className="lead-copy">My work sits at the intersection of design, engineering, and the systems that keep people connected. I care about the small decisions that make technology easier to trust.</p>
          <dl className="facts-grid">
            <div><dt className="fact-label">Education</dt><dd><strong>BS Information Technology</strong><span>University of Science and Technology of Southern Philippines (USTP), Cagayan de Oro</span></dd></div>
            <div><dt className="fact-label">Focus</dt><dd><strong>Full-stack &amp; mobile development</strong><span>IoT, networking &amp; cybersecurity</span></dd></div>
            <div><dt className="fact-label">Experience</dt><dd><strong>NMMC Queuing System</strong><span>Internship / product development</span></dd></div>
          </dl>
          <div className="certifications"><span className="fact-label">Certifications</span><CertificationBadges /></div>
        </div>
      </section>

      <section className="section-shell projects-section" id="projects">
        <div className="section-label"><span>02</span><span>Selected projects</span></div>
        <div className="section-body"><div className="section-heading-row"><h2>Made to be <em>useful.</em></h2><span className="project-count">03 / 03</span></div><ProjectList projects={projects} /></div>
      </section>

      <section className="section-shell split-section stack-section" id="stack">
        <div className="section-label"><span>03</span><span>Toolbox</span></div>
        <div className="section-body"><h2>Curious by default.<br /><em>Precise by practice.</em></h2><Toolbox groups={stackGroups} /></div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-shell contact-inner">
          <div className="section-label"><span>04</span><span>Contact</span></div>
          <div className="contact-copy"><p className="eyebrow">Have a good problem?</p><h2>Let&apos;s make<br /><em>something matter.</em></h2><a className="button button-solid" href="mailto:valmores.karlmcjay@gmail.com">valmores.karlmcjay@gmail.com <span aria-hidden="true">↗</span></a><a className="phone-link" href="tel:+639628766984">+63 962 876 6984</a></div>
          <footer className="contact-footer"><span>Karley / Portfolio</span><div><a href="https://github.com/karmacje" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/krlmcjay" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.credly.com/users/karl-mc-jay-valmores/badges/credly" target="_blank" rel="noreferrer">Credly</a></div><span>© 2026</span></footer>
        </div>
      </section>
    </main>
  );
}
