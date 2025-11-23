"use client";

import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
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
            <Search
              size={64}
              className="text-cyan-500 dark:text-cyan-400"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-gradient-cyan">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-display font-bold">
            Page Not Found
          </h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="hover-glow-cyan">
            <Link href="/" aria-label="Go to homepage">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/portfolio" aria-label="View portfolio">
              <Search className="mr-2 h-4 w-4" />
              Browse Portfolio
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

