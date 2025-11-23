"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Box, Ruler, Layers, Settings, Building2, User, Boxes, ImageIcon } from "lucide-react";
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
import { ModelViewer } from "@/components/media/ModelViewer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PortfolioModalProps {
  project: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PortfolioModal({ project, isOpen, onClose }: PortfolioModalProps) {
  const [viewMode, setViewMode] = useState<"images" | "3d">("images");

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

  // Reset view mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setViewMode(project?.model3dUrl ? "images" : "images");
    }
  }, [isOpen, project?.model3dUrl]);

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
          "max-w-[84vw] lg:max-w-[83vw] xl:max-w-[82vw] 2xl:max-w-[81vw] max-h-[84vh] overflow-hidden p-0 gap-0",
          "bg-white dark:bg-zinc-900/98",
          "backdrop-blur-xl",
          "border-2 border-slate-200 dark:border-white/20",
          "shadow-2xl",
          "rounded-xl"
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
              className="flex flex-col lg:flex-row h-full max-h-[83vh]"
            >
              {/* Image Gallery / 3D Viewer - Left Side */}
              <div className="lg:w-1/2 bg-slate-50 dark:bg-zinc-950/50 p-8 lg:p-12">
                {/* View Mode Toggle */}
                {project.model3dUrl && (
                  <div className="flex gap-3 mb-6">
                    <Button
                      variant={viewMode === "images" ? "default" : "outline"}
                      size="default"
                      onClick={() => setViewMode("images")}
                      className={cn(
                        viewMode === "images" 
                          ? "bg-orange-500 hover:bg-orange-600 text-white" 
                          : "",
                        "px-6 py-2.5 text-base"
                      )}
                    >
                      <ImageIcon size={18} className="mr-2" />
                      Images
                    </Button>
                    <Button
                      variant={viewMode === "3d" ? "default" : "outline"}
                      size="default"
                      onClick={() => setViewMode("3d")}
                      className={cn(
                        viewMode === "3d" 
                          ? "bg-orange-500 hover:bg-orange-600 text-white" 
                          : "",
                        "px-6 py-2.5 text-base"
                      )}
                    >
                      <Boxes size={18} className="mr-2" />
                      3D Model
                    </Button>
                  </div>
                )}

                {/* Content based on view mode */}
                {viewMode === "3d" && project.model3dUrl ? (
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 dark:bg-zinc-800 shadow-2xl border border-slate-300 dark:border-zinc-700">
                    <ModelViewer
                      modelUrl={project.model3dUrl}
                      fallbackImage={project.image}
                      alt={`${project.title} - 3D Model`}
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <>
                    {allImages.length > 1 ? (
                      <Carousel className="w-full">
                        <CarouselContent>
                          {allImages.map((img, index) => (
                            <CarouselItem key={index}>
                              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 dark:bg-zinc-800 shadow-2xl border border-slate-300 dark:border-zinc-700">
                                <Image
                                  src={img}
                                  alt={`${project.title} - Image ${index + 1}`}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 1024px) 100vw, 50vw"
                                  quality={95}
                                  loading="lazy"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-6 w-12 h-12" />
                        <CarouselNext className="right-6 w-12 h-12" />
                      </Carousel>
                    ) : (
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 dark:bg-zinc-800 shadow-2xl border border-slate-300 dark:border-zinc-700">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          quality={95}
                          loading="lazy"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Project Details - Right Side */}
              <div className="lg:w-1/2 overflow-y-auto p-10 lg:p-14 space-y-10">
                <DialogHeader>
                  <DialogTitle className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6 leading-tight">
                    {project.title}
                  </DialogTitle>
                  <div className="flex items-center gap-3">
                    <span className="px-5 py-2 text-base font-medium text-orange-600 dark:text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-full uppercase tracking-wider">
                      {project.category.replace("-", " ")}
                    </span>
                  </div>
                </DialogHeader>

                {/* Description */}
                <div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg lg:text-xl xl:text-2xl">
                    {project.description}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="glass-card p-6 rounded-xl hover-lift border border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Box size={24} className="text-orange-500" />
                      <span className="text-base font-medium text-muted-foreground">
                        Material
                      </span>
                    </div>
                    <p className="text-lg font-semibold">{project.material}</p>
                  </div>

                  <div className="glass-card p-6 rounded-xl hover-lift border border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock size={24} className="text-amber-500" />
                      <span className="text-base font-medium text-muted-foreground">
                        Print Time
                      </span>
                    </div>
                    <p className="text-lg font-semibold">{project.printTime}</p>
                  </div>

                  <div className="glass-card p-6 rounded-xl hover-lift border border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Ruler size={24} className="text-orange-500" />
                      <span className="text-base font-medium text-muted-foreground">
                        Dimensions
                      </span>
                    </div>
                    <p className="text-lg font-semibold">{project.dimensions}</p>
                  </div>

                  {project.layerHeight && (
                    <div className="glass-card p-6 rounded-xl hover-lift border border-slate-200 dark:border-white/10">
                      <div className="flex items-center gap-3 mb-4">
                        <Layers size={24} className="text-amber-500" />
                        <span className="text-base font-medium text-muted-foreground">
                          Layer Height
                        </span>
                      </div>
                      <p className="text-lg font-semibold">{project.layerHeight}</p>
                    </div>
                  )}

                  {project.technology && (
                    <div className="glass-card p-6 rounded-xl hover-lift col-span-2 border border-slate-200 dark:border-white/10">
                      <div className="flex items-center gap-3 mb-4">
                        <Settings size={24} className="text-orange-500" />
                        <span className="text-base font-medium text-muted-foreground">
                          Technology
                        </span>
                      </div>
                      <p className="text-lg font-semibold">{project.technology}</p>
                    </div>
                  )}
                </div>

                {/* Post Processing */}
                {project.postProcessing && project.postProcessing.length > 0 && (
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-foreground">
                      Post-Processing
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {project.postProcessing.map((process, index) => (
                        <span
                          key={index}
                          className="px-5 py-2.5 text-base rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium"
                        >
                          {process}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Client Information */}
                {(project.clientName || project.clientCompany) && (
                  <div className="glass-card p-6 rounded-xl border border-slate-200 dark:border-white/10">
                    <h4 className="text-xl font-semibold mb-5 text-foreground">
                      Client Information
                    </h4>
                    <div className="space-y-4">
                      {project.clientName && (
                        <div className="flex items-center gap-4 text-lg">
                          <User size={20} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Client:</span>
                          <span className="font-semibold">{project.clientName}</span>
                        </div>
                      )}
                      {project.clientCompany && (
                        <div className="flex items-center gap-4 text-lg">
                          <Building2 size={20} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Company:</span>
                          <span className="font-semibold">{project.clientCompany}</span>
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

