"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageSkeleton } from "@/components/ui/ImageSkeleton";

interface ModelViewerProps {
  modelUrl?: string;
  fallbackImage?: string;
  alt?: string;
  className?: string;
  autoRotate?: boolean;
}

export function ModelViewer({
  modelUrl,
  fallbackImage,
  alt = "3D Model",
  className,
  autoRotate = true,
}: ModelViewerProps) {
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    setIsWebGLSupported(!!gl);
  }, []);

  // If no model URL, show fallback image
  if (!modelUrl) {
    if (fallbackImage) {
      return (
        <div
          className={cn(
            "relative aspect-square rounded-md overflow-hidden",
            "bg-white/90 dark:bg-black/50 backdrop-blur border border-slate-200 dark:border-white/10",
            className
          )}
        >
          <Image
            src={fallbackImage}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
            loading="lazy"
          />
        </div>
      );
    }
    return null;
  }

  // If WebGL is not supported, show fallback
  if (isWebGLSupported === false) {
    return (
      <div
        className={cn(
          "relative aspect-square rounded-md overflow-hidden",
          "bg-white/90 dark:bg-black/50 backdrop-blur border border-slate-200 dark:border-white/10",
          "flex items-center justify-center",
          className
        )}
      >
        {fallbackImage ? (
          <Image
            src={fallbackImage}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
            loading="lazy"
          />
        ) : (
          <div className="text-center p-6">
            <AlertCircle className="mx-auto mb-2 text-muted-foreground" size={24} />
            <p className="text-sm text-muted-foreground">
              3D viewer requires WebGL support
            </p>
          </div>
        )}
      </div>
    );
  }

  // Placeholder for future Three.js integration
  // This can be enhanced later with @react-three/fiber
  return (
    <div
      className={cn(
        "relative aspect-square rounded-md overflow-hidden",
        "bg-white/90 dark:bg-black/50 backdrop-blur border border-slate-200 dark:border-white/10",
        "flex items-center justify-center",
        className
      )}
    >
      {isLoading && (
        <div className="absolute inset-0">
          <ImageSkeleton className="w-full h-full" />
        </div>
      )}
      {hasError ? (
        <div className="text-center p-6">
          <AlertCircle className="mx-auto mb-2 text-red-500" size={24} />
          <p className="text-sm text-muted-foreground">
            Failed to load 3D model
          </p>
          {fallbackImage && (
            <Image
              src={fallbackImage}
              alt={alt}
              width={200}
              height={200}
              className="mt-4 rounded-md"
              quality={85}
              loading="lazy"
            />
          )}
        </div>
      ) : (
        <div className="text-center p-6">
          <Loader2 className="mx-auto mb-2 text-cyan-500 animate-spin" size={24} />
          <p className="text-sm text-muted-foreground mb-2">
            3D Model Viewer
          </p>
          <p className="text-xs text-muted-foreground">
            Three.js integration coming soon
          </p>
          {fallbackImage && (
            <div className="mt-4 relative w-32 h-32 mx-auto rounded-md overflow-hidden">
              <Image
                src={fallbackImage}
                alt={alt}
                fill
                className="object-cover"
                sizes="128px"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

