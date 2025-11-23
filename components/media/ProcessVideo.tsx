"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessVideoProps {
  videoUrl?: string;
  animationUrl?: string; // For GIFs
  thumbnailImage?: string;
  alt?: string;
  className?: string;
}

export function ProcessVideo({
  videoUrl,
  animationUrl,
  thumbnailImage,
  alt = "Process video",
  className,
}: ProcessVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  // Use animation (GIF) if available, otherwise use video
  const hasVideo = Boolean(videoUrl);
  const hasAnimation = Boolean(animationUrl);
  const hasMedia = hasVideo || hasAnimation;

  if (!hasMedia && !thumbnailImage) {
    return null;
  }

  // If only thumbnail image, show static image
  if (!hasMedia && thumbnailImage) {
    return (
      <div className={cn("relative aspect-video rounded-md overflow-hidden", className)}>
        <Image
          src={thumbnailImage}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  // Handle animation (GIF)
  if (hasAnimation && !hasVideo) {
    return (
      <div className={cn("relative aspect-video rounded-md overflow-hidden", className)}>
        <Image
          src={animationUrl!}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized // GIFs are already optimized
        />
      </div>
    );
  }

  // Handle video
  if (hasVideo) {
    return (
      <div
        className={cn(
          "relative aspect-video rounded-md overflow-hidden bg-slate-200 dark:bg-zinc-800 group",
          className
        )}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={setVideoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        {/* Play/Pause Overlay */}
        {showControls && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <button
              onClick={() => {
                if (videoRef) {
                  if (isPlaying) {
                    videoRef.pause();
                  } else {
                    videoRef.play();
                  }
                }
              }}
              className="w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-lg"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause size={20} className="text-slate-900 dark:text-white" />
              ) : (
                <Play size={20} className="text-slate-900 dark:text-white ml-0.5" />
              )}
            </button>
          </div>
        )}
        {/* Thumbnail overlay when paused */}
        {!isPlaying && thumbnailImage && (
          <div className="absolute inset-0">
            <Image
              src={thumbnailImage}
              alt={alt}
              fill
              className="object-cover opacity-50"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
    );
  }

  return null;
}

