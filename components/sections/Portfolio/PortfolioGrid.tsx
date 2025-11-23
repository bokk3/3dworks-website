"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, FilterX } from "lucide-react";
import { PortfolioItem } from "@/lib/portfolio-data";
import { PortfolioCard } from "./PortfolioCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PortfolioGridProps {
  projects: PortfolioItem[];
  onClearFilters?: () => void;
}

export function PortfolioGrid({ projects, onClearFilters }: PortfolioGridProps) {
  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "text-center py-16 px-4",
          "glass-card rounded-xl"
        )}
      >
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Search
              size={64}
              className="text-muted-foreground"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-xl" />
          </div>
        </div>
        <h3 className="text-2xl font-display font-bold mb-2">
          No projects found
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Try adjusting your filters or search query to find what you're looking for.
        </p>
        {onClearFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="hover-glow-cyan"
            aria-label="Clear all filters"
          >
            <FilterX className="mr-2 h-4 w-4" />
            Clear All Filters
          </Button>
        )}
      </motion.div>
    );
  }

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
