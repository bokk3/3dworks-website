"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/process-data";
import { ProcessStep } from "./Process/ProcessStep";

export function Process() {
  return (
    <section id="process" className="section relative overflow-hidden py-12 md:py-16">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-1/2 h-1/2 bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-display font-bold"
          >
            How It <span className="text-gradient-cyber">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            From your initial idea to the final delivered part, our streamlined
            process ensures quality and speed at every step.
          </motion.p>
        </div>

        {/* Horizontal Timeline Container */}
        <div className="relative space-y-12 lg:space-y-16">
          {/* First Row */}
          <div className="relative">
            {/* Timeline Line for First Row */}
            <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-orange-500/20 via-orange-500/40 to-amber-500/20 z-0" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative items-stretch">
              {processSteps.slice(0, 3).map((step, index) => (
                <ProcessStep
                  key={step.id}
                  step={step}
                  index={index}
                  isLast={index === 2}
                  isFirstRow={true}
                />
              ))}
            </div>
          </div>

          {/* Second Row */}
          <div className="relative">
            {/* Timeline Line for Second Row */}
            <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-orange-500/20 via-orange-500/40 to-amber-500/20 z-0" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative items-stretch">
              {processSteps.slice(3, 6).map((step, index) => (
                <ProcessStep
                  key={step.id}
                  step={step}
                  index={index + 3}
                  isLast={index === 2}
                  isFirstRow={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
