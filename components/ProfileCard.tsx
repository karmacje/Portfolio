"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProfileCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <button
      className={`profile-card${isFlipped ? " is-flipped" : ""}`}
      type="button"
      aria-label={isFlipped ? "Show profile photo" : "Reveal Karley's signature"}
      aria-pressed={isFlipped}
      onClick={() => setIsFlipped((current) => !current)}
    >
      <span className="profile-card-inner">
        <span className="profile-card-face profile-card-front">
          <Image src="/Profile.JPG" alt="Portrait of Karley Valmores" fill priority sizes="(max-width: 700px) 58vw, (max-width: 980px) 32vw, 290px" />
        </span>
        <span className="profile-card-face profile-card-back" aria-hidden={!isFlipped}>
          <span className="profile-signature" aria-hidden="true">k.mcJ.</span>
          <span className="profile-signature-line" aria-hidden="true" />
          <span className="profile-card-caption">Karl Mc Jay G. Valmores</span>
        </span>
      </span>
    </button>
  );
}
