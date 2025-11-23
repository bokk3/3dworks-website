"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PortfolioItem } from "@/lib/portfolio-data";
import PortfolioCard from "./PortfolioCard";

interface PortfolioGridProps {
  projects: PortfolioItem[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <PortfolioCard key={project.id} project={project} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
