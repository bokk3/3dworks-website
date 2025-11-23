"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PortfolioFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  materialFilter: string;
  onMaterialChange: (material: string) => void;
  technologyFilter: string;
  onTechnologyChange: (technology: string) => void;
  filteredCount: number;
  totalCount: number;
}

const filters = [
  { id: "all", label: "All Projects" },
  { id: "prototypes", label: "Prototypes" },
  { id: "custom-parts", label: "Custom Parts" },
  { id: "art", label: "Art Pieces" },
  { id: "functional", label: "Functional" },
];

const materials = [
  "All Materials",
  "PLA",
  "ABS",
  "PETG",
  "Resin",
  "Nylon",
  "Carbon Fiber Nylon",
  "TPU",
  "Tough PLA",
  "High-Temp Resin",
  "Marble PLA",
  "Silk PLA",
  "White PLA",
];

const technologies = ["All Technologies", "FDM", "SLA", "SLS"];

export function PortfolioFilter({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  materialFilter,
  onMaterialChange,
  technologyFilter,
  onTechnologyChange,
  filteredCount,
  totalCount,
}: PortfolioFilterProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const hasActiveFilters =
    activeFilter !== "all" ||
    materialFilter !== "All Materials" ||
    technologyFilter !== "All Technologies" ||
    searchQuery !== "";

  const clearAllFilters = () => {
    onFilterChange("all");
    onMaterialChange("All Materials");
    onTechnologyChange("All Technologies");
    onSearchChange("");
  };

  return (
    <div className="mb-12 space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          type="text"
          placeholder="Search projects by name or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={cn(
            "pl-10 pr-10 bg-white/95 dark:bg-black/50 backdrop-blur border-slate-200 dark:border-white/10",
            "focus-visible:ring-cyan-500/20 focus-visible:border-cyan-500"
          )}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3">
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

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="border-slate-200 dark:border-white/10"
        >
          <Filter size={16} className="mr-2" />
          Advanced Filters
        </Button>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-cyan-500 hover:text-cyan-600 hover:bg-cyan-500/10"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "overflow-hidden glass-card p-6 rounded-md",
              "bg-white/95 dark:bg-black/50 backdrop-blur border border-slate-200 dark:border-white/10"
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Material</label>
                <Select value={materialFilter} onValueChange={onMaterialChange}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((material) => (
                      <SelectItem key={material} value={material}>
                        {material}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Technology</label>
                <Select value={technologyFilter} onValueChange={onTechnologyChange}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {technologies.map((tech) => (
                      <SelectItem key={tech} value={tech}>
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Count */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-muted-foreground"
        >
          Showing <span className="font-semibold text-cyan-500">{filteredCount}</span> of{" "}
          <span className="font-semibold">{totalCount}</span> projects
        </motion.div>
      )}
    </div>
  );
}
