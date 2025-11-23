"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PortfolioFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "all", label: "All Projects" },
  { id: "prototypes", label: "Prototypes" },
  { id: "custom-parts", label: "Custom Parts" },
  { id: "art", label: "Art Pieces" },
  { id: "functional", label: "Functional" },
];

export default function PortfolioFilter({
  activeFilter,
  onFilterChange,
}: PortfolioFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            activeFilter === filter.id
              ? "text-white"
              : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
          )}
        >
          {activeFilter === filter.id && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-cyan-500 rounded-full -z-10"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          {filter.label}
        </button>
      ))}
    </div>
  );
}
