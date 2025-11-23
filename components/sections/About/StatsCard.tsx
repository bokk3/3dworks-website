"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/lib/about-data";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

function AnimatedCounter({ value, duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;

    // Extract numeric value and suffix
    const match = value.match(/(\d+\.?\d*)(.*)/);
    if (!match) {
      setCount(parseFloat(value) || 0);
      return;
    }

    const numericValue = parseFloat(match[1]);
    const suffix = match[2] || "";

    if (isNaN(numericValue)) {
      // For non-numeric values like "0.01mm", just show the value
      return;
    }

    const startTime = Date.now();
    const endValue = numericValue;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = endValue * easeOutQuart;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animate();
  }, [inView, value, duration]);

  // Format the display value
  const formatValue = (val: number, original: string) => {
    const match = original.match(/(\d+\.?\d*)(.*)/);
    if (!match) return original;

    const suffix = match[2] || "";
    
    if (original.includes(".")) {
      // For decimal values like "0.01mm"
      return val.toFixed(2) + suffix;
    } else if (original.includes("+")) {
      // For values like "1000+"
      return Math.floor(val).toLocaleString() + "+";
    } else {
      // For simple numbers
      return Math.floor(val).toLocaleString() + suffix;
    }
  };

  const match = value.match(/(\d+\.?\d*)(.*)/);
  if (!match || isNaN(parseFloat(match[1]))) {
    // For non-numeric values, just display as-is
    return <span ref={ref} className="text-gradient-cyber">{value}</span>;
  }

  return (
    <span ref={ref} className="text-gradient-cyber">
      {formatValue(count, value)}
    </span>
  );
}

export function StatsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-6 rounded-xl text-center hover-lift"
          >
            <div className="inline-flex p-3 rounded-lg bg-orange-500/10 text-orange-500 mb-4">
              <Icon size={24} />
            </div>
            <div className="text-3xl md:text-4xl font-display font-bold mb-2">
              <AnimatedCounter value={stat.value} />
            </div>
            <h3 className="text-lg font-semibold mb-1">{stat.label}</h3>
            {stat.description && (
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

