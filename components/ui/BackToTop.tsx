"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setShouldAnimate(!mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setShouldAnimate(!e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);

      // Check scroll position
      const handleScroll = () => {
        setIsVisible(window.scrollY > 500);
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Check initial position

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldAnimate ? "smooth" : "auto",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-24 right-6 z-40",
            "w-12 h-12 rounded-md",
            "bg-white dark:bg-white/5",
            "backdrop-blur-md",
            "border border-slate-200 dark:border-white/10",
            "shadow-lg",
            "text-slate-700 dark:text-white",
            "flex items-center justify-center",
            "hover:border-cyan-500 hover:shadow-cyan-500/20",
            "hover:bg-cyan-50 dark:hover:bg-cyan-500/10",
            "transition-all duration-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
          )}
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

