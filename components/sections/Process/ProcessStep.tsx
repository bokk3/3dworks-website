"use client";

import { motion } from "framer-motion";
import { ProcessStep as ProcessStepType } from "@/lib/process-data";
import { cn } from "@/lib/utils";

interface ProcessStepProps {
  step: ProcessStepType;
  index: number;
  isLast: boolean;
}

export function ProcessStep({ step, index, isLast }: ProcessStepProps) {
  const Icon = step.icon;
  const isEven = index % 2 === 0;

  return (
    <div
      className={cn(
        "relative flex items-center justify-between md:justify-center w-full mb-8 md:mb-0",
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      {/* Center Line (Desktop) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center h-full">
        <div className="w-0.5 h-full bg-gradient-to-b from-cyan-500/50 to-purple-500/50" />
        <div className="absolute top-0 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] z-10" />
      </div>

      {/* Mobile Line */}
      <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/20 to-purple-500/20" />

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={cn(
          "w-[calc(100%-80px)] md:w-[45%] ml-auto md:ml-0 glass-card p-6 rounded-xl hover-lift relative z-10",
          isEven ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"
        )}
      >
        {/* Step Number Badge */}
        <div
          className="absolute -left-12 md:left-auto md:top-6 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-white font-bold shadow-lg z-20
          md:group-even:right-[-60px] md:group-odd:left-[-60px]
        "
        >
          {step.id}
        </div>

        <div className="flex items-start gap-4 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-display font-bold pt-1">{step.title}</h3>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}
