"use client";

import Image from "next/image";
import { Network, Router, ShieldCheck, Waypoints, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

type LogoGroup = {
  label: string;
  items: string[];
};

type LogosWithBlurFlipProps = {
  groups: LogoGroup[];
};

const logoSlugs: Record<string, string> = {
  "Next.js": "nextdotjs",
  React: "react",
  TypeScript: "typescript",
  "Tailwind CSS": "tailwindcss",
  Prisma: "prisma",
  MySQL: "mysql",
  Supabase: "supabase",
  "REST APIs": "fastapi",
  "Cisco tools": "cisco",
};

const fallbackIcons: Record<string, LucideIcon> = {
  Networking: Network,
  Cybersecurity: ShieldCheck,
  "Cisco tools": Router,
  "REST APIs": Waypoints,
};

function LogoMark({ item }: { item: string }) {
  const slug = logoSlugs[item];
  const FallbackIcon = fallbackIcons[item];

  if (!slug) {
    return FallbackIcon ? <FallbackIcon className="tool-logo-fallback" aria-hidden="true" size={24} strokeWidth={1.5} /> : <span className="tool-logo-fallback" aria-hidden="true" />;
  }

  return (
    <span className="tool-logo-mark" aria-hidden="true">
      <Image src={`https://cdn.simpleicons.org/${slug}`} alt="" width={24} height={24} unoptimized />
    </span>
  );
}

export default function LogosWithBlurFlip({ groups }: LogosWithBlurFlipProps) {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveGroupIndex((current) => (current + 1) % groups.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [groups.length]);

  const activeGroup = groups[activeGroupIndex];

  return (
    <div className="toolbox-logo-groups">
      <div className="toolbox-logo-group" key={activeGroup.label}>
        <span className="toolbox-logo-group-label">{activeGroup.label}</span>
        <div className="toolbox-logo-grid">
          {activeGroup.items.map((item, itemIndex) => (
            <div className="tool-logo-card" key={item} style={{ "--toolbox-item": itemIndex } as React.CSSProperties}>
              <LogoMark item={item} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
