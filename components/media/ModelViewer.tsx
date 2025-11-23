"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageSkeleton } from "@/components/ui/ImageSkeleton";

// Dynamic import for 3D viewer (heavy component)
const ModelViewer3D = dynamic(
  () => import("./ModelViewer3D").then((mod) => ({ default: mod.ModelViewer3D })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    ),
  }
);

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

  // Use 3D viewer if model URL is provided and WebGL is supported
  if (modelUrl && isWebGLSupported) {
    return (
      <ModelViewer3D
        modelUrl={modelUrl}
        fallbackImage={fallbackImage}
        className={className}
        alt={alt}
      />
    );
  }

  // Fallback to image if no model URL or WebGL not supported
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
      ) : fallbackImage ? (
        <div className="relative w-full h-full">
          <Image
            src={fallbackImage}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        </div>
      ) : (
        <div className="text-center p-6">
          <p className="text-sm text-muted-foreground">
            {isWebGLSupported === false
              ? "WebGL not supported on this device."
              : "No 3D model available."}
          </p>
        </div>
      )}
    </div>
  );
}

