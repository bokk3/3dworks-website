"use client";

import { cn } from "@/lib/utils";

interface ImageSkeletonProps {
  className?: string;
  aspectRatio?: "square" | "video" | "auto";
}

export function ImageSkeleton({
  className,
  aspectRatio = "auto",
}: ImageSkeletonProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "",
  };

  return (
    <div
      className={cn(
        "glass-card animate-pulse rounded-md overflow-hidden",
        aspectClasses[aspectRatio],
        className
      )}
    >
      <div className="h-full w-full bg-gradient-to-br from-slate-200/50 via-slate-100/50 to-slate-200/50 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-800/50" />
    </div>
  );
}

