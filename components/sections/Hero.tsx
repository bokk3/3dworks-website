"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ParallaxElement } from "@/components/effects/ParallaxSection";
import { analytics } from "@/lib/analytics";
// import { VideoBackground } from "@/components/media/VideoBackground";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Enhanced parallax effects with different speeds for depth
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const y3 = useTransform(scrollY, [0, 500], [0, 100]); // Slower background element
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Video Background - Disabled for now */}
      {/* <VideoBackground
        videoSrc="/videos/hero-3d-printing.webm"
        fallbackImage="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&h=1080&fit=crop"
        overlay
      /> */}

      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-[0.03] dark:opacity-[0.05]" />

        {/* Gradient Orbs with enhanced parallax */}
        <ParallaxElement speed={0.4} direction="down">
          <motion.div
            style={{ opacity }}
            className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen dark:bg-orange-500/10 transform-gpu"
          />
        </ParallaxElement>
        <ParallaxElement speed={0.3} direction="up">
          <motion.div
            style={{ opacity }}
            className="absolute bottom-20 right-[10%] w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen dark:bg-amber-500/10 transform-gpu"
          />
        </ParallaxElement>
        {/* Additional depth layer */}
        <ParallaxElement speed={0.2} direction="down">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-full blur-[150px] transform-gpu" />
        </ParallaxElement>
      </div>

      {/* Floating 3D Shapes (Decorative) with parallax */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <ParallaxElement speed={0.15} direction="down">
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
            className="absolute top-1/4 right-[15%] w-24 h-24 border border-orange-500/20 rounded-xl backdrop-blur-sm hidden lg:block transform-gpu"
          />
        </ParallaxElement>
        <ParallaxElement speed={0.25} direction="up">
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
            className="absolute bottom-1/3 left-[10%] w-16 h-16 border border-amber-500/20 rounded-lg backdrop-blur-sm hidden lg:block transform-gpu"
          />
        </ParallaxElement>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          {/* Main Headline with staggered word animation */}
          <motion.h1
            initial="hidden"
            animate="visible"
            className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[1.1]"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-block"
            >
              Precision 3D Printing{" "}
            </motion.span>
            <br className="hidden md:block" />
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="inline-block"
            >
              for{" "}
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-gradient-cyber inline-block"
            >
              Your Vision
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
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
            transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <Button
              size="lg"
              className="h-12 px-8 text-base bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 hover-glow-orange min-w-[160px]"
              asChild
            >
              <Link
                href="/portfolio"
                onClick={() => analytics.trackCTAClick("Explore Portfolio", "hero")}
              >
                Explore Portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base border-slate-200 hover:bg-slate-100 text-slate-700 dark:border-white/10 dark:text-white dark:hover:bg-white/5 dark:hover:border-orange-500/50 min-w-[160px]"
              asChild
            >
              <Link
                href="/quote"
                onClick={() => analytics.trackCTAClick("Upload Design", "hero")}
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Design
              </Link>
            </Button>
          </motion.div>

          {/* Stats/Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
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
