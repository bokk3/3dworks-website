"use client";

import { motion } from "framer-motion";
import { technologies } from "@/lib/about-data";

interface TechnologyCardProps {
  index: number;
}

export function TechnologyCard({ index }: TechnologyCardProps) {
  const technology = technologies[index];
  if (!technology) return null;

  const Icon = technology.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-xl glass-card hover-lift overflow-hidden"
    >
      {/* Gradient Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div className="relative mb-4 inline-flex p-3 rounded-lg bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
        <Icon size={28} strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-display font-bold mb-1 group-hover:text-orange-500 transition-colors">
          {technology.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {technology.fullName}
        </p>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          {technology.description}
        </p>

        {/* Specs */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start justify-between text-xs">
            <span className="text-muted-foreground">Build Volume:</span>
            <span className="font-medium text-foreground">
              {technology.buildVolume}
            </span>
          </div>
          <div className="flex items-start justify-between text-xs">
            <span className="text-muted-foreground">Resolution:</span>
            <span className="font-medium text-foreground">
              {technology.resolution}
            </span>
          </div>
          <div className="flex items-start justify-between text-xs">
            <span className="text-muted-foreground">Precision:</span>
            <span className="font-medium text-foreground">
              {technology.precision}
            </span>
          </div>
        </div>

        {/* Materials */}
        <div>
          <h4 className="text-sm font-semibold mb-2 text-foreground">
            Materials:
          </h4>
          <div className="flex flex-wrap gap-2">
            {technology.materials.map((material) => (
              <span
                key={material}
                className="px-2 py-1 text-xs rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20"
              >
                {material}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

