"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/process-data";
import ProcessStep from "./Process/ProcessStep";

export default function Process() {
  return (
    <section id="process" className="section relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-display font-bold"
          >
            How It <span className="text-gradient-cyan">Works</span>
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

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto py-10">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={step.id}
              step={step}
              index={index}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
