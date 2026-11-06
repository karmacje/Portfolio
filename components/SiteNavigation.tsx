"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

const links = [
  { label: "Home", href: "#intro" },
  { label: "Background", href: "#background" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

const mobileViewportQuery = "(max-width: 760px)";

function subscribeToMobileViewport(callback: () => void) {
  const mediaQuery = window.matchMedia(mobileViewportQuery);
  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getMobileViewportSnapshot() {
  return window.matchMedia(mobileViewportQuery).matches;
}

function getMobileViewportServerSnapshot() {
  return false;
}

export default function SiteNavigation() {
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const scrolledStateRef = useRef(false);
  const focusAfterScrollRef = useRef<"menu" | "inline-link" | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobileViewport = useSyncExternalStore(
    subscribeToMobileViewport,
    getMobileViewportSnapshot,
    getMobileViewportServerSnapshot,
  );
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const showMenuButton = isMobileViewport && isScrolled;
  const hideInlineLinks = showMenuButton && !isMenuOpen;

  useEffect(() => {
    const mobileViewport = window.matchMedia(mobileViewportQuery);

    function closeMenuOnDesktop(event: MediaQueryListEvent) {
      if (!event.matches) {
        if (document.activeElement === menuButtonRef.current) {
          focusAfterScrollRef.current = "inline-link";
        }

        setIsMenuOpen(false);
      }
    }

    mobileViewport.addEventListener("change", closeMenuOnDesktop);

    return () => mobileViewport.removeEventListener("change", closeMenuOnDesktop);
  }, []);

  useEffect(() => {
    const focusTarget = focusAfterScrollRef.current;

    if (focusTarget === "menu" && showMenuButton) {
      focusAfterScrollRef.current = null;
      menuButtonRef.current?.focus();
    } else if (focusTarget === "inline-link" && !showMenuButton) {
      focusAfterScrollRef.current = null;
      navRef.current
        ?.querySelector<HTMLAnchorElement>("#primary-navigation-links a")
        ?.focus();
    }
  }, [showMenuButton]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled =
      latest >= 50 || (scrolledStateRef.current && latest > 45);

    if (scrolledStateRef.current === scrolled) return;

    if (
      scrolled &&
      isMobileViewport &&
      navRef.current
        ?.querySelector<HTMLUListElement>("#primary-navigation-links")
        ?.contains(document.activeElement)
    ) {
      focusAfterScrollRef.current = "menu";
    } else if (!scrolled && document.activeElement === menuButtonRef.current) {
      focusAfterScrollRef.current = "inline-link";
    }

    scrolledStateRef.current = scrolled;
    setIsScrolled(scrolled);

    if (!scrolled) setIsMenuOpen(false);
  });

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
        <ul
          id="primary-navigation-links"
          inert={hideInlineLinks}
        >
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
        <motion.button
          ref={menuButtonRef}
          className="nav-menu-button"
          type="button"
          aria-controls="primary-navigation-links"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          inert={!showMenuButton}
          tabIndex={showMenuButton ? 0 : -1}
          onClick={() => setIsMenuOpen((open) => !open)}
          initial={false}
          animate={{
            opacity: showMenuButton ? 1 : 0,
            transform: `translate3d(0, 0, 0) scale(${shouldReduceMotion || showMenuButton ? 1 : 0.5})`,
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0.18, ease: "easeOut" }
              : showMenuButton
                ? { type: "spring", duration: 0.5, bounce: 0.2 }
                : { duration: 0.18, ease: "easeOut" }
          }
        >
          <span
            className={isMenuOpen ? "menu-icon is-open" : "menu-icon"}
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </span>
          {!isMenuOpen && <span>Menu</span>}
        </motion.button>
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
