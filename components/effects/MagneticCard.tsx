"use client";

import { useRef, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  tiltIntensity?: number;
}

export function MagneticCard({
  children,
  className,
  intensity = 0.2,
  tiltIntensity = 5,
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Transform for tilt effect
  const rotateX = useTransform(ySpring, [-50, 50], [tiltIntensity, -tiltIntensity]);
  const rotateY = useTransform(xSpring, [-50, 50], [-tiltIntensity, tiltIntensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * intensity;
    const distanceY = (e.clientY - centerY) * intensity;

    // Limit movement to 10px max
    x.set(Math.max(-10, Math.min(10, distanceX)));
    y.set(Math.max(-10, Math.min(10, distanceY)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Check for reduced motion
  const shouldAnimate =
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <motion.div
      ref={ref}
      onMouseMove={shouldAnimate ? handleMouseMove : undefined}
      onMouseLeave={shouldAnimate ? handleMouseLeave : undefined}
      style={
        shouldAnimate
          ? {
              x: xSpring,
              y: ySpring,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
          : undefined
      }
      className={cn(
        "transform-gpu will-change-transform",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

