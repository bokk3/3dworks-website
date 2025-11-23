"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PortfolioSkeletonProps {
  count?: number;
  className?: string;
}

export function PortfolioSkeleton({ count = 6, className }: PortfolioSkeletonProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card rounded-xl overflow-hidden"
        >
          {/* Image Skeleton */}
          <div className="relative aspect-[4/3] bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10"
              style={{
                backgroundSize: "200% 100%",
              }}
            />
          </div>

          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4">
              <motion.div
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10 rounded-md"
                style={{
                  backgroundSize: "200% 100%",
                }}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full">
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.2,
                  }}
                  className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10 rounded"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />
              </div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6">
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.4,
                  }}
                  className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10 rounded"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />
              </div>
            </div>

            {/* Specs */}
            <div className="flex gap-4">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20">
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.6,
                  }}
                  className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10 rounded"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />
              </div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16">
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.8,
                  }}
                  className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10 rounded"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

