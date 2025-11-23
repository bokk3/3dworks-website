"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setShouldAnimate(!mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setShouldAnimate(!e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  if (!shouldAnimate) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
      style={{ scaleX }}
    >
      <div className="h-full w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 dark:from-cyan-400 dark:via-purple-400 dark:to-cyan-400" />
    </motion.div>
  );
}

