import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import MagneticLink from "@/components/MagneticLink";
import { type Project } from "@/components/ProjectCard";
import CertificationBadges from "../components/CertificationBadges";
import AnimatedHeroTitle from "../components/AnimatedHeroTitle";
import ProjectDeck from "../components/ProjectDeck";
import ProfileCard from "../components/ProfileCard";
import LiquidNavbar, { NimbusIcons } from "@/components/ui/liquid-glass-navbar";
import LogosWithBlurFlip from "@/components/ui/logos-with-blur-flip";

const projects: Project[] = [
  { number: "01", suit: "♠", title: "NMMC Queuing System", description: "A ticket management system for hospital patients, designed to make queue operations clearer and waiting more manageable.", tags: ["Next.js", "Prisma", "MySQL"], icon: "ticket", caseStudy: { context: "Built during my internship at Northern Mindanao Medical Center to support patient queuing and ticket management in a hospital setting.", problem: "Hospital teams needed a clearer way to organize patient tickets and keep queue progress manageable during daily operations.", role: "I built the queuing system's web experience and supporting data flows, working across the interface, application logic, and database integration.", stack: ["Next.js", "Prisma", "MySQL"], deploymentNote: "The system is hosted on NMMC's internal server for hospital use. It is not publicly reachable due to healthcare facility policy." } },
  { number: "02", suit: "♣", title: "Bantay Baboy", description: "An IoT monitoring experience that gives livestock caretakers a clearer view of what needs attention.", tags: ["React", "Supabase", "IoT"], icon: "piggybank" },
  { number: "03", suit: "♦", title: "Artificial Greenery", description: "A visual showcase site for discovering low-maintenance greenery that brings warmth into a space.", tags: ["Web Design", "Next.js", "Responsive UI"], icon: "leaf" },
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
        <LiquidNavbar
          className="portfolio-navbar"
          defaultActive={0}
          items={[
            { label: "Home", href: "#intro", icon: NimbusIcons.home, fx: "glow" },
            { label: "Background", href: "#background", icon: NimbusIcons.user, fx: "wave" },
            { label: "Projects", href: "#projects", icon: NimbusIcons.globe, fx: "spin" },
            { label: "Stack", href: "#stack", icon: NimbusIcons.plane, fx: "plane" },
            { label: "Contact", href: "#contact", icon: NimbusIcons.drop, fx: "drop" },
          ]}
        />
        <div className="nav-actions">
          <a className="nav-cv" href="/Valmores_CV.pdf" target="_blank" rel="noreferrer">CV</a>
          <a className="nav-status" href="mailto:valmores.karlmcjay@gmail.com"><span className="status-dot" /> Available for work</a>
        </div>
      </header>
      <section className="hero section-shell" id="intro"><div className="hero-kicker"><span>Portfolio / 2026</span><span>Based in the Philippines</span></div><div className="hero-layout"><div className="hero-content"><p className="eyebrow programmer-label reveal-one" aria-label="PROGRAMMER"><span aria-hidden="true">P</span><span aria-hidden="true">R</span><span aria-hidden="true">O</span><span aria-hidden="true">G</span><span aria-hidden="true">R</span><span aria-hidden="true">A</span><span aria-hidden="true">M</span><span aria-hidden="true">M</span><span aria-hidden="true">E</span><span aria-hidden="true">R</span></p><AnimatedHeroTitle /><div className="hero-bottom reveal-three"><p className="hero-description">Thoughtful interfaces, useful systems, and digital experiences made to feel clear, capable, and human.</p><div className="hero-actions"><MagneticLink href="#projects" variant="solid">View projects <ArrowDownRight className="button-icon" aria-hidden="true" size={14} /></MagneticLink><MagneticLink href="#contact" variant="outline">Contact me <ArrowUpRight className="button-icon" aria-hidden="true" size={14} /></MagneticLink></div></div></div><div className="profile-frame reveal-three"><ProfileCard /></div></div><a className="scroll-cue" href="#background"><span>Scroll to explore</span><ArrowDown className="button-icon" aria-hidden="true" size={14} /></a></section>
      <section className="section-shell split-section" id="background"><div className="section-label"><span>01</span><span>Background</span></div><div className="section-body"><h2>I like making complex things feel <em>clear.</em></h2><p className="lead-copy">My work sits at the intersection of design, engineering, and the systems that keep people connected. I care about the small decisions that make technology easier to trust.</p><div className="facts-grid"><div><span className="fact-label">Education</span><strong>BS Information Technology</strong><span>University of Science and Technology of Southern Philippines (USTP), Cagayan de Oro</span></div><div><span className="fact-label">Focus</span><strong>Full-stack &amp; mobile development</strong><span>IoT, networking &amp; cybersecurity</span></div><div><span className="fact-label">Experience</span><strong>NMMC Queuing System</strong><span>Internship / product development</span></div></div><div className="certifications"><span className="fact-label">Certifications</span><CertificationBadges /></div></div></section>
      <section className="section-shell projects-section" id="projects"><div className="section-label"><span>02</span><span>Selected projects</span></div><div className="section-body"><div className="section-heading-row"><h2>Made to be <em>useful.</em></h2><span className="project-count">03 / 03</span></div><ProjectDeck projects={projects} /></div></section>
      <section className="section-shell split-section stack-section" id="stack"><div className="section-label"><span>03</span><span>Toolbox</span></div><div className="section-body"><h2>Curious by default.<br /><em>Precise by practice.</em></h2><LogosWithBlurFlip groups={stackGroups} /></div></section>
      <section className="contact-section" id="contact"><div className="section-shell contact-inner"><div className="section-label"><span>04</span><span>Contact</span></div><div className="contact-copy"><p className="eyebrow">Have a good problem?</p><h2>Let&apos;s make<br /><em>something matter.</em></h2><MagneticLink href="mailto:valmores.karlmcjay@gmail.com" variant="solid">valmores.karlmcjay@gmail.com <ArrowUpRight className="button-icon" aria-hidden="true" size={14} /></MagneticLink><a className="phone-link" href="tel:+639628766984">+63 962 876 6984</a></div><div className="contact-footer"><span>Karley / Portfolio</span><div><a href="https://github.com/karmacje" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/krlmcjay" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.credly.com/users/karl-mc-jay-valmores/badges/credly" target="_blank" rel="noreferrer">Credly</a></div><span>© 2026</span></div></div></section>
    </main>
  );
}
