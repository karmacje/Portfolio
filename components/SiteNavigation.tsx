"use client";

import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from "react";

const links = [
  { label: "Home", href: "#intro" },
  { label: "Background", href: "#background" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function SiteNavigation() {
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function updateScrolledState() {
      setIsScrolled(window.scrollY > 24);
    }

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  function showIndicator(link: HTMLAnchorElement) {
    const nav = navRef.current;
    const indicator = indicatorRef.current;

    if (!nav || !indicator) return;

    const linkBounds = link.getBoundingClientRect();
    const navBounds = nav.getBoundingClientRect();

    indicator.style.transform = `translateX(${linkBounds.left - navBounds.left}px) scaleX(${linkBounds.width})`;
    indicator.style.opacity = "1";
  }

  function hideIndicator() {
    if (indicatorRef.current) indicatorRef.current.style.opacity = "0";
  }

  function handlePointerEnter(event: PointerEvent<HTMLAnchorElement>) {
    if (
      event.pointerType === "touch" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    showIndicator(event.currentTarget);
  }

  function handleBlur(event: FocusEvent<HTMLElement>) {
    const nextTarget = event.relatedTarget;

    if (
      (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) ||
      event.currentTarget.matches(":hover")
    ) {
      return;
    }

    hideIndicator();
  }

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <nav
        ref={navRef}
        aria-label="Primary navigation"
        onPointerLeave={(event) => {
          if (!event.currentTarget.matches(":focus-within")) hideIndicator();
        }}
        onBlurCapture={handleBlur}
      >
        <ul>
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onPointerEnter={handlePointerEnter}
                onFocus={(event) => showIndicator(event.currentTarget)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
      </nav>
      <div className="nav-actions">
        <a className="nav-cv" href="/Valmores_CV.pdf" target="_blank" rel="noreferrer">
          CV
        </a>
        <a className="nav-status" href="mailto:valmores.karlmcjay@gmail.com">
          <span className="status-dot" />
          Available for work
        </a>
      </div>
    </header>
  );
}
