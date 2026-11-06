import CertificationBadges from "@/components/CertificationBadges";
import MagneticButton from "@/components/MagneticButton";
import ProfileCard from "@/components/ProfileCard";
import ProjectList, { type Project } from "@/components/ProjectList";
import SiteNavigation from "@/components/SiteNavigation";
import Toolbox from "@/components/Toolbox";

const projects: Project[] = [
  { number: "01", suit: "♠", title: "NMMC Queuing System", description: "A ticket management system for hospital patients, designed to make queue operations clearer and waiting more manageable.", tags: ["Next.js", "Prisma", "MySQL"], caseStudy: { context: "Built during my internship at Northern Mindanao Medical Center to support patient queuing and ticket management in a hospital setting.", problem: "Hospital teams needed a clearer way to organize patient tickets and keep queue progress manageable during daily operations.", role: "I built the queuing system's web experience and supporting data flows, working across the interface, application logic, and database integration.", stack: ["Next.js", "Prisma", "MySQL"], deploymentNote: "The system is hosted on NMMC's internal server for hospital use. It is not publicly reachable due to healthcare facility policy." } },
  { number: "02", suit: "♣", title: "Bantay Baboy", description: "An IoT monitoring experience that gives livestock caretakers a clearer view of what needs attention.", tags: ["React", "Supabase", "IoT"] },
];

const stackGroups = [
  { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { label: "Backend & data", items: ["Prisma", "MySQL", "Supabase", "REST APIs"] },
  { label: "Systems", items: ["Networking", "Cybersecurity", "Cisco tools"] },
];

export default function Home() {
  return (
    <>
      <SiteNavigation />
      <main>
        <section className="hero section" id="intro">
          <div className="hero-layout section-grid">
            <div className="hero-content">
              <p className="eyebrow">Full-stack web developer</p>
              <h1 className="hero-title">I build useful things.</h1>
              <div className="hero-bottom">
                <p className="hero-description">Thoughtful interfaces, useful systems, and digital experiences made to feel capable and human.</p>
                <div className="hero-actions"><MagneticButton className="magnetic-button--contact" href="#contact">Contact me</MagneticButton></div>
              </div>
            </div>
            <div className="profile-frame"><ProfileCard /></div>
          </div>
          <a className="scroll-cue" href="#background"><span>Scroll to explore</span><span aria-hidden="true">↓</span></a>
        </section>

        <section className="section split-section" id="background">
          <div className="section-label">Background</div>
          <div className="section-body">
            <h2>I make complexity feel clear.</h2>
            <p className="lead-copy">My work sits at the intersection of design, engineering, and the systems that keep people connected. I care about the small decisions that make technology easier to trust.</p>
            <dl className="facts-grid">
              <div><dt className="fact-label">Education</dt><dd><strong>BS Information Technology</strong><span>University of Science and Technology of Southern Philippines (USTP), Cagayan de Oro</span></dd></div>
              <div><dt className="fact-label">Focus</dt><dd><strong>Full-stack &amp; mobile development</strong><span>IoT, networking &amp; cybersecurity</span></dd></div>
              <div><dt className="fact-label">Experience</dt><dd><strong>NMMC Queuing System</strong><span>Internship / product development</span></dd></div>
            </dl>
            <div className="certifications"><span className="fact-label">Certifications</span><CertificationBadges /></div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-label">Selected projects</div>
          <div className="section-body"><div className="section-heading-row"><h2>Made to be useful.</h2><span className="project-count">Two projects</span></div><ProjectList projects={projects} /></div>
        </section>

        <section className="section split-section stack-section" id="stack">
          <div className="section-label">Toolbox</div>
          <div className="section-body"><h2>Curious. Precise. Useful.</h2><Toolbox groups={stackGroups} /></div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section contact-inner">
            <div className="section-label">Contact</div>
            <div className="contact-copy"><p className="eyebrow">Have a good problem?</p><h2>Let&apos;s make<br />something matter.</h2><MagneticButton className="contact-cta" href="mailto:valmores.karlmcjay@gmail.com" variant="solid">Email me</MagneticButton><a className="email-address" href="mailto:valmores.karlmcjay@gmail.com">valmores.karlmcjay@gmail.com</a><a className="phone-link" href="tel:+639628766984">+63 962 876 6984</a></div>
          </div>
        </section>
      </main>
      <footer className="contact-footer section">
        <a className="footer-mark" href="#intro" aria-label="Back to top">krl</a>
        <nav className="footer-socials" aria-label="Social links">
          <a href="https://github.com/karmacje" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/krlmcjay" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.credly.com/users/karl-mc-jay-valmores/badges/credly" target="_blank" rel="noreferrer">Credly</a>
        </nav>
        <span>© 2026</span>
      </footer>
    </>
  );
}
