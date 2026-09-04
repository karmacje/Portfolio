"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const rotatingWords = ["Web", "Mobile"] as const;

export default function AnimatedHeroTitle() {
  const [wordIndex, setWordIndex] = useState(0);
  const [hasRotated, setHasRotated] = useState(false);
  const wordFrameRef = useRef<HTMLSpanElement>(null);
  const wordSizerRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHasRotated(true);
      setWordIndex((currentIndex) => (currentIndex + 1) % rotatingWords.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const nextWidth = wordSizerRefs.current[wordIndex]?.offsetWidth;
    if (nextWidth) wordFrameRef.current?.style.setProperty("width", `${nextWidth + 4}px`);
  }, [wordIndex]);

  return (
    <h1 className="hero-title reveal-two">
      Full-stack
      <br />
      <em>
        <span className="hero-rotating-word" ref={wordFrameRef} aria-live="polite">
          <span className={hasRotated ? "is-rotating" : ""} key={rotatingWords[wordIndex]}>{rotatingWords[wordIndex]}</span>
          <span className="hero-word-sizers" aria-hidden="true">
            {rotatingWords.map((word, index) => (
              <span key={word} ref={(element) => { wordSizerRefs.current[index] = element; }}>{word}</span>
            ))}
          </span>
        </span>{" "}<span className={`hero-developer${hasRotated ? ` hero-developer-${wordIndex === 1 ? "expand" : "contract"}` : ""}`} key={`developer-${wordIndex}`}>Developer</span>
      </em>
    </h1>
  );
}
