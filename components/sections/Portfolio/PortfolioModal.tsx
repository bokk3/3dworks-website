"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Box, Ruler, Layers, Settings, Building2, User } from "lucide-react";
import { PortfolioItem } from "@/lib/portfolio-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface PortfolioModalProps {
  project: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PortfolioModal({ project, isOpen, onClose }: PortfolioModalProps) {
  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  // Collect all images for gallery
  const allImages = [
    project.image,
    ...(project.beforeAfterImages || []),
    ...(project.processImages || []),
  ].filter(Boolean);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "max-w-6xl max-h-[90vh] overflow-hidden p-0 gap-0",
          "bg-white dark:bg-zinc-900/95",
          "backdrop-blur-xl",
          "border border-slate-200 dark:border-white/10",
          "shadow-2xl",
          "rounded-md"
        )}
        showCloseButton={true}
      >
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col lg:flex-row h-full max-h-[90vh]"
            >
              {/* Image Gallery - Left Side */}
              <div className="lg:w-1/2 bg-slate-50 dark:bg-zinc-950/50 p-4 lg:p-6">
                {allImages.length > 1 ? (
                  <Carousel className="w-full">
                    <CarouselContent>
                      {allImages.map((img, index) => (
                        <CarouselItem key={index}>
                          <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-slate-200 dark:bg-zinc-800">
                            <Image
                              src={img}
                              alt={`${project.title} - Image ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              quality={85}
                              loading="lazy"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                ) : (
                  <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-slate-200 dark:bg-zinc-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={85}
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              {/* Project Details - Right Side */}
              <div className="lg:w-1/2 overflow-y-auto p-6 lg:p-8 space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl md:text-3xl font-display font-bold mb-2">
                    {project.title}
                  </DialogTitle>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 text-xs font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full uppercase tracking-wider">
                      {project.category.replace("-", " ")}
                    </span>
                  </div>
                </DialogHeader>

                {/* Description */}
                <div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Box size={18} className="text-cyan-500" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Material
                      </span>
                    </div>
                    <p className="text-sm font-semibold">{project.material}</p>
                  </div>

                  <div className="glass-card p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={18} className="text-purple-500" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Print Time
                      </span>
                    </div>
                    <p className="text-sm font-semibold">{project.printTime}</p>
                  </div>

                  <div className="glass-card p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Ruler size={18} className="text-cyan-500" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Dimensions
                      </span>
                    </div>
                    <p className="text-sm font-semibold">{project.dimensions}</p>
                  </div>

                  {project.layerHeight && (
                    <div className="glass-card p-4 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Layers size={18} className="text-purple-500" />
                        <span className="text-sm font-medium text-muted-foreground">
                          Layer Height
                        </span>
                      </div>
                      <p className="text-sm font-semibold">{project.layerHeight}</p>
                    </div>
                  )}

                  {project.technology && (
                    <div className="glass-card p-4 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Settings size={18} className="text-cyan-500" />
                        <span className="text-sm font-medium text-muted-foreground">
                          Technology
                        </span>
                      </div>
                      <p className="text-sm font-semibold">{project.technology}</p>
                    </div>
                  )}
                </div>

                {/* Post Processing */}
                {project.postProcessing && project.postProcessing.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-foreground">
                      Post-Processing
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.postProcessing.map((process, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                        >
                          {process}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Client Information */}
                {(project.clientName || project.clientCompany) && (
                  <div className="glass-card p-4 rounded-md">
                    <h4 className="text-sm font-semibold mb-3 text-foreground">
                      Client Information
                    </h4>
                    <div className="space-y-2">
                      {project.clientName && (
                        <div className="flex items-center gap-2 text-sm">
                          <User size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Client:</span>
                          <span className="font-medium">{project.clientName}</span>
                        </div>
                      )}
                      {project.clientCompany && (
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Company:</span>
                          <span className="font-medium">{project.clientCompany}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

