"use client";

import { cn } from "@/lib/utils";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only",
        "fixed top-4 left-4 z-50",
        "px-4 py-2 rounded-md",
        "bg-cyan-500 text-white",
        "font-medium text-sm",
        "shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2",
        "transition-all duration-200"
      )}
      onClick={(e) => {
        e.preventDefault();
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
    >
      Skip to main content
    </a>
  );
}

