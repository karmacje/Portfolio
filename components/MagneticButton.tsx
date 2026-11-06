"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { HTMLMotionProps, Transition } from "motion/react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";

type ButtonVariant = "solid" | "outline";

type MagneticLinkProps = Omit<
  HTMLMotionProps<"a">,
  | "children"
  | "className"
  | "initial"
  | "onMouseLeave"
  | "onMouseMove"
  | "style"
  | "variants"
  | "whileFocus"
  | "whileHover"
> & {
  as?: "a";
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type MagneticSummaryProps = Omit<
  HTMLMotionProps<"summary">,
  | "children"
  | "className"
  | "initial"
  | "onMouseLeave"
  | "onMouseMove"
  | "style"
  | "variants"
  | "whileFocus"
  | "whileHover"
> & {
  as: "summary";
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type MagneticButtonProps = MagneticLinkProps | MagneticSummaryProps;

const buttonVariants = {
  idle: {},
  hover: {},
};

const arrowVariants = {
  idle: { rotate: 0 },
  hover: { rotate: 45 },
};

function buttonContents(children: ReactNode, transition: Transition) {
  return (
    <>
      <span className="magnetic-button__label">{children}</span>
      <motion.span
        className="magnetic-button__icon"
        variants={arrowVariants}
        transition={transition}
        aria-hidden="true"
      >
        <svg
          aria-hidden="true"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 17 17 7M7 7h10v10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      </motion.span>
    </>
  );
}

function getButtonClassName(
  element: "a" | "summary" | undefined,
  variant: ButtonVariant,
  className?: string,
) {
  return [
    "magnetic-button",
    `magnetic-button--${variant}`,
    element === "summary" && "magnetic-button--disclosure",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function MagneticButton(props: MagneticButtonProps) {
  const springX = useSpring(0, { stiffness: 300, damping: 15 });
  const springY = useSpring(0, { stiffness: 300, damping: 15 });
  const transform = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`;
  const reduceMotion = useReducedMotion() ?? false;
  const arrowTransition: Transition = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 300, damping: 15 };

  function handleMouseMove(event: ReactMouseEvent<HTMLElement>) {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - bounds.left;
    const mouseY = event.clientY - bounds.top;

    event.currentTarget.style.setProperty("--mouse-x", `${mouseX}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${mouseY}px`);
    springX.set((mouseX - bounds.width / 2) * 0.2);
    springY.set((mouseY - bounds.height / 2) * 0.2);
  }

  function handleMouseLeave() {
    springX.set(0);
    springY.set(0);
  }

  const motionProps = {
    variants: buttonVariants,
    initial: "idle",
    whileHover: "hover",
    whileFocus: "hover",
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { transform },
  };

  if (props.as === "summary") {
    const { as, variant = "outline", className, children, ...summaryProps } = props;

    return (
      <motion.summary
        {...summaryProps}
        {...motionProps}
        className={getButtonClassName(as, variant, className)}
      >
        {buttonContents(children, arrowTransition)}
      </motion.summary>
    );
  }

  const { as, variant = "outline", className, children, ...linkProps } = props;

  return (
    <motion.a
      {...linkProps}
      {...motionProps}
      className={getButtonClassName(as, variant, className)}
    >
      {buttonContents(children, arrowTransition)}
    </motion.a>
  );
}
