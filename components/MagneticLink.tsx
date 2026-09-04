"use client";

import { useRef } from "react";

type MagneticLinkProps = {
  href: string;
  children: React.ReactNode;
  variant: "solid" | "outline";
  target?: string;
  rel?: string;
};

export default function MagneticLink({ href, children, variant, target, rel }: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  function handleMove(event: React.MouseEvent<HTMLAnchorElement>) {
    const link = linkRef.current;
    if (!link || window.matchMedia("(hover: none)").matches) return;
    const bounds = link.getBoundingClientRect();
    link.style.setProperty("--magnetic-x", `${(event.clientX - bounds.left - bounds.width / 2) * 0.12}px`);
    link.style.setProperty("--magnetic-y", `${(event.clientY - bounds.top - bounds.height / 2) * 0.12}px`);
  }

  function resetPosition() {
    linkRef.current?.style.setProperty("--magnetic-x", "0px");
    linkRef.current?.style.setProperty("--magnetic-y", "0px");
  }

  return <a ref={linkRef} className={`magnetic-link magnetic-${variant}`} href={href} target={target} rel={rel} onMouseMove={handleMove} onMouseLeave={resetPosition}>{children}</a>;
}
