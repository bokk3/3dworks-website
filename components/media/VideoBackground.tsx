"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VideoBackgroundProps {
  videoSrc?: string;
  fallbackImage?: string;
  className?: string;
  overlay?: boolean;
}

export function VideoBackground({
  videoSrc,
  fallbackImage,
  className,
  overlay = true,
}: VideoBackgroundProps) {
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setIsReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);

      // Check for mobile device (fallback to image for performance)
      const checkMobile = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        return mobile;
      };
      const isMobileDevice = checkMobile();
      window.addEventListener("resize", checkMobile);

      // Only play video on desktop and if not reduced motion
      setShouldPlay(!mediaQuery.matches && !isMobileDevice);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
        window.removeEventListener("resize", checkMobile);
      };
    }
  }, []);

  // Use fallback image on mobile or if reduced motion
  const useFallback = isMobile || isReducedMotion || !videoSrc;

  if (useFallback && fallbackImage) {
    return (
      <div
        className={cn(
          "absolute inset-0 z-0 bg-cover bg-center",
          className
        )}
        style={{ backgroundImage: `url(${fallbackImage})` }}
      >
        {overlay && (
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
        )}
      </div>
    );
  }

  if (!videoSrc) {
    return null;
  }

  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden", className)}>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/webm" />
        <source src={videoSrc.replace(".webm", ".mp4")} type="video/mp4" />
        {/* Fallback to image if video fails to load */}
        {fallbackImage && (
          <img
            src={fallbackImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </video>
      {overlay && (
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
      )}
    </div>
  );
}

