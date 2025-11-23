"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-[0.03] dark:opacity-[0.05]" />

        {/* Gradient Orbs */}
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen dark:bg-cyan-500/10"
        />
        <motion.div
          style={{ y: y2, opacity }}
          className="absolute bottom-20 right-[10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen dark:bg-purple-500/10"
        />
      </div>

      {/* Floating 3D Shapes (Decorative) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-[15%] w-24 h-24 border border-cyan-500/20 rounded-xl backdrop-blur-sm hidden lg:block"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/3 left-[10%] w-16 h-16 border border-purple-500/20 rounded-lg backdrop-blur-sm hidden lg:block"
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-600 dark:text-cyan-400 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 mr-2 animate-pulse" />
            Now accepting new orders
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[1.1]"
          >
            Precision 3D Printing for <br className="hidden md:block" />
            <span className="text-gradient-cyber">Your Vision</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            From rapid prototyping to custom manufacturing — we bring your ideas
            to life with cutting-edge 3D printing technology and
            industrial-grade materials.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <Button
              size="lg"
              className="h-12 px-8 text-base bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20 hover-glow-cyan min-w-[160px]"
              asChild
            >
              <Link href="/portfolio">
                Explore Portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base border-slate-200 hover:bg-slate-100 text-slate-700 dark:border-white/10 dark:text-white dark:hover:bg-white/5 dark:hover:border-cyan-500/50 min-w-[160px]"
              asChild
            >
              <Link href="/quote">
                <Upload className="mr-2 h-4 w-4" /> Upload Design
              </Link>
            </Button>
          </motion.div>

          {/* Stats/Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center border-t border-border/50 w-full mt-8"
          >
            {[
              { label: "Prints Delivered", value: "500+" },
              { label: "Happy Clients", value: "100+" },
              { label: "Materials", value: "20+" },
              { label: "Turnaround", value: "24h" },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold font-display text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
