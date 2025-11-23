"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/portfolio-data";
import PortfolioFilter from "./Portfolio/PortfolioFilter";
import PortfolioGrid from "./Portfolio/PortfolioGrid";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="portfolio" className="section relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 dot-pattern opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/5 rounded-full blur-[100px]" />
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
            Featured <span className="text-gradient-cyan">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Explore our collection of precision 3D printed prototypes,
            functional parts, and artistic creations.
          </motion.p>
        </div>

        {/* Filter */}
        <PortfolioFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Grid */}
        <PortfolioGrid projects={filteredProjects} />
      </div>
    </section>
  );
}
