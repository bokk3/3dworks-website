"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { companyStory, technologies } from "@/lib/about-data";
import { StatsCard } from "./About/StatsCard";
import { TechnologyCard } from "./About/TechnologyCard";

export function About() {
  return (
    <section
      id="about"
      className="section relative overflow-hidden bg-slate-50 dark:bg-[#0a0a0f]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-[0.03] dark:opacity-[0.05]" />

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
            <span className="text-gradient-cyan">Precision</span> Meets{" "}
            <span className="text-gradient-purple">Innovation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Combining cutting-edge technology with decades of expertise to bring
            your vision to life
          </motion.p>
        </div>

        {/* Main Content: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="glass-card p-8 rounded-xl">
              {companyStory.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Industries Served */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-display font-bold text-lg mb-4">
                Industries We Serve
              </h3>
              <div className="flex flex-wrap gap-3">
                {companyStory.industries.map((industry) => (
                  <span
                    key={industry}
                    className="px-4 py-2 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium border border-cyan-500/20"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card p-4 rounded-xl overflow-hidden">
              <div className="relative aspect-[4/3] rounded-md overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop"
                  alt="3D printer in action creating precision parts"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <StatsCard />
        </div>

        {/* Technology & Equipment Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our <span className="text-gradient-cyan">Technology</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              State-of-the-art 3D printing technologies and equipment to meet
              your most demanding requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {technologies.map((tech, index) => (
              <TechnologyCard key={tech.id} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

