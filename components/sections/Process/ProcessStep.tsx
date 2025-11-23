"use client";

import { motion } from "framer-motion";
import { ProcessStep as ProcessStepType } from "@/lib/process-data";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface ProcessStepProps {
  step: ProcessStepType;
  index: number;
  isLast: boolean;
  isFirstRow?: boolean;
}

export function ProcessStep({ step, index, isLast, isFirstRow = true }: ProcessStepProps) {
  const Icon = step.icon;
  const colPosition = index % 3; // 0, 1, or 2

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Step Number Badge - Positioned on timeline */}
      <div className="relative z-20 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white font-bold shadow-lg flex items-center justify-center text-lg border-4 border-background">
          {step.id}
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 w-12 h-12 rounded-full bg-orange-500/20 blur-md -z-10" />
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="glass-card p-6 rounded-xl hover-lift relative z-10 w-full h-full flex flex-col"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500 flex-shrink-0">
            <Icon size={22} />
          </div>
          <h3 className="text-lg font-display font-bold leading-tight pt-0.5">{step.title}</h3>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
          {step.description}
        </p>

        {/* Arrow connector on mobile */}
        {!isLast && (
          <div className="lg:hidden flex justify-center mt-4">
            <ChevronRight className="text-orange-500/50" size={20} />
          </div>
        )}
      </motion.div>
    </div>
  );
}
