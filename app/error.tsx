"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "glass-card p-8 md:p-12 rounded-2xl max-w-2xl w-full",
          "text-center space-y-6"
        )}
      >
        <div className="flex justify-center">
          <div className="relative">
            <AlertCircle
              size={64}
              className="text-red-500 dark:text-red-400"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            Something went wrong
          </h1>
          <p className="text-muted-foreground">
            We encountered an unexpected error. Please try again.
          </p>
        </div>

        {error.message && (
          <div className="glass-card p-4 rounded-lg text-left">
            <p className="text-sm font-mono text-red-500 dark:text-red-400">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="hover-glow-cyan"
            aria-label="Try again"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/" aria-label="Go to homepage">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

