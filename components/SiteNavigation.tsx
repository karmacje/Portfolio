"use client";

import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function updateScrolledState() {
      const scrolled = window.scrollY > 8;
      setIsScrolled(scrolled);

      if (!scrolled) setIsMenuOpen(false);
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

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "Escape" || !isMenuOpen) return;

    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  }

  return (
    <header
      className={`site-header${isScrolled ? " is-scrolled" : ""}${isMenuOpen ? " is-menu-open" : ""}`}
      onKeyDown={handleKeyDown}
    >
      <nav
        ref={navRef}
        aria-label="Primary navigation"
        onPointerLeave={(event) => {
          if (!event.currentTarget.matches(":focus-within")) hideIndicator();
        }}
        onBlurCapture={handleBlur}
      >
        <ul id="primary-navigation-links">
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setIsMenuOpen(false)}
                onPointerEnter={handlePointerEnter}
                onFocus={(event) => showIndicator(event.currentTarget)}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="mobile-menu-utilities">
            <a className="nav-cv" href="/Valmores_CV.pdf" target="_blank" rel="noreferrer">
              CV
            </a>
            <a className="nav-status" href="mailto:valmores.karlmcjay@gmail.com">
              <span className="status-dot" />
              Available for work
            </a>
          </li>
        </ul>
        <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
        <button
          ref={menuButtonRef}
          className="nav-menu-button"
          type="button"
          aria-controls="primary-navigation-links"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>{isMenuOpen ? "Close" : "Menu"}</span>
        </button>
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
