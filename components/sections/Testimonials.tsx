"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/testimonials-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Autoplay functionality
  useEffect(() => {
    if (!api || isPaused) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [api, isPaused]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={cn(
          i < rating
            ? "fill-cyan-500 text-cyan-500"
            : "fill-transparent text-slate-300 dark:text-slate-700"
        )}
      />
    ));
  };

  return (
    <section
      id="testimonials"
      className="section relative overflow-hidden bg-slate-50 dark:bg-[#0a0a0f]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-[0.03] dark:opacity-[0.05]" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-display font-bold"
          >
            What Our <span className="text-gradient-cyan">Clients Say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Trusted by leading companies across industries for precision 3D
            printing solutions
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="glass-card p-8 md:p-12 rounded-xl"
                  >
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <Quote
                        size={32}
                        className="text-gradient-cyan fill-cyan-500/20"
                      />
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-6">
                      {testimonial.testimonial}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-6">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Client Info */}
                    <div className="flex items-center gap-4">
                      {testimonial.companyLogo && (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-500/20">
                          <Image
                            src={testimonial.companyLogo}
                            alt={testimonial.company}
                            fill
                            className="object-cover"
                            sizes="64px"
                            quality={85}
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-display font-bold text-lg">
                          {testimonial.clientName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.company}
                        </p>
                        <p className="text-xs text-cyan-500 mt-1">
                          {testimonial.projectType}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  current === index
                    ? "bg-cyan-500 w-8"
                    : "bg-slate-300 dark:bg-slate-700 hover:bg-cyan-500/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

