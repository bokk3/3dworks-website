"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Box, ArrowUpRight, Boxes } from "lucide-react";
import { PortfolioItem } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { MagneticCard } from "@/components/effects/MagneticCard";
import { analytics } from "@/lib/analytics";

// Dynamic import for PortfolioModal (heavy component with carousel)
const PortfolioModal = dynamic(() => import("./PortfolioModal").then((mod) => ({ default: mod.PortfolioModal })), {
  loading: () => null,
});

interface PortfolioCardProps {
  project: PortfolioItem;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <MagneticCard intensity={0.15} tiltIntensity={3}>
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="group relative rounded-xl overflow-hidden glass-card hover-lift cursor-pointer"
          onClick={() => {
            analytics.trackPortfolioClick(project.id, project.title);
            setIsModalOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              analytics.trackPortfolioClick(project.id, project.title);
              setIsModalOpen(true);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`View details for ${project.title} project`}
        >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} - 3D printed ${project.category} project in ${project.material}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
          loading="lazy"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium text-white bg-black/50 backdrop-blur-md rounded-full border border-white/10 uppercase tracking-wider">
            {project.category.replace("-", " ")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-gray-300 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
          {project.description}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-4 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <div className="flex items-center gap-1.5">
            <Box size={14} className="text-orange-500" />
            <span>{project.material}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-amber-500" />
            <span>{project.printTime}</span>
          </div>
        </div>

        {/* View 3D Model Button */}
        {project.model3dUrl && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                analytics.trackCTAClick("View 3D Model", "portfolio_card");
                setIsModalOpen(true);
              }}
              className="px-3 py-1.5 text-xs font-medium text-white bg-orange-500/90 hover:bg-orange-500 rounded-md backdrop-blur-md border border-white/20 flex items-center gap-1.5 transition-colors"
            >
              <Boxes size={14} />
              View 3D Model
            </motion.button>
          </div>
        )}

        {/* Arrow Icon */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-colors">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
      </motion.div>
    </MagneticCard>
      <PortfolioModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
