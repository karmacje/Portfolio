"use client";

import { Award, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const certifications = [
  { name: "Cisco CyberOps Associate", detail: "Security operations", icon: ShieldCheck },
  { name: "Ethical Hacking", detail: "Offensive security foundations", icon: Award },
];

const glowDuration = 1800;
const clickWindow = 6000;
const clickLimit = 3;

export default function CertificationBadges() {
  const [activeCertification, setActiveCertification] = useState<string | null>(null);
  const [isAlternateTheme, setIsAlternateTheme] = useState(false);
  const clickTimes = useRef<number[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function activateGlow(event: React.MouseEvent<HTMLButtonElement>, certificationName: string) {
    const now = Date.now();
    clickTimes.current = clickTimes.current.filter((time) => now - time < clickWindow);
    if (clickTimes.current.length >= clickLimit) return;

    clickTimes.current.push(now);
    setActiveCertification(certificationName);
    const nextTheme = !document.documentElement.classList.contains("alternate-theme");
    setIsAlternateTheme(nextTheme);
    document.documentElement.classList.toggle("alternate-theme", nextTheme);
    sessionStorage.setItem("portfolio-theme", nextTheme ? "alternate" : "default");
    const bounds = event.currentTarget.getBoundingClientRect();
      const fallbackX = bounds.left + bounds.width / 2;
      const fallbackY = bounds.top + bounds.height / 2;
      document.documentElement.style.setProperty("--ripple-x", `${event.clientX || fallbackX}px`);
      document.documentElement.style.setProperty("--ripple-y", `${event.clientY || fallbackY}px`);
    document.documentElement.classList.add("certification-flash");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveCertification(null);
      document.documentElement.classList.remove("certification-flash");
      document.documentElement.style.removeProperty("--ripple-x");
      document.documentElement.style.removeProperty("--ripple-y");
    }, glowDuration);
  }

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    document.documentElement.classList.remove("certification-flash");
    document.documentElement.style.removeProperty("--ripple-x");
    document.documentElement.style.removeProperty("--ripple-y");
  }, []);

  useEffect(() => {
    const savedTheme = sessionStorage.getItem("portfolio-theme");
    const alternateTheme = savedTheme === "alternate";
    setIsAlternateTheme(alternateTheme);
    document.documentElement.classList.toggle("alternate-theme", alternateTheme);
  }, []);

  return (
    <div className="certification-badges">
      {certifications.map(({ name, detail, icon: Icon }) => (
        <button className={`certification-badge${activeCertification === name ? " is-active" : ""}`} key={name} type="button" onClick={(event) => activateGlow(event, name)} aria-label={`${isAlternateTheme ? "Switch to light theme with" : "Switch to dark theme with"} ${name} certification`}>
          <span className="certification-badge-inner">
            <span className="certification-badge-face certification-badge-front"><span className="certification-badge-icon"><Icon aria-hidden="true" size={24} strokeWidth={1.5} /></span><span className="certification-badge-copy"><strong>{name}</strong><span>{detail}</span></span><span className="certification-badge-mark" aria-hidden="true">+</span></span>
            <span className="certification-badge-face certification-badge-back" aria-hidden="true"><span className="certification-card-suit">{name === "Ethical Hacking" ? "♦" : "♠"}</span><strong>Verified skill</strong><span>{detail}</span></span>
          </span>
        </button>
      ))}
    </div>
  );
}