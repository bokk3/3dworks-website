"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  respectReducedMotion?: boolean;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className,
  respectReducedMotion = true,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  // Check for reduced motion preference
  const shouldAnimate =
    !respectReducedMotion ||
    (typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  return (
    <motion.div
      ref={ref}
      style={shouldAnimate ? { y } : undefined}
      className={cn("transform-gpu will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxElementProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: "up" | "down";
}

export function ParallaxElement({
  children,
  speed = 0.3,
  className,
  direction = "down",
}: ParallaxElementProps) {
  const { scrollY } = useScroll();
  const y = useTransform(
    scrollY,
    [0, 1000],
    direction === "down" ? [0, 200 * speed] : [0, -200 * speed]
  );

  const shouldAnimate =
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <motion.div
      style={shouldAnimate ? { y } : undefined}
      className={cn("transform-gpu will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

