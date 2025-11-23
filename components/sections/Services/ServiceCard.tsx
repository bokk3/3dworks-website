"use client";

import { motion } from "framer-motion";
import { ServiceItem } from "@/lib/services-data";
import { Check } from "lucide-react";

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-8 rounded-xl glass-card hover-lift overflow-hidden"
    >
      {/* Gradient Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div className="relative mb-6 inline-flex p-3 rounded-lg bg-cyan-500/10 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
        <Icon size={32} strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-display font-bold mb-3 group-hover:text-cyan-500 transition-colors">
          {service.title}
        </h3>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Specs List */}
        <ul className="space-y-2">
          {service.specs.map((spec, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm text-muted-foreground/80"
            >
              <Check size={14} className="text-cyan-500" />
              <span>{spec}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
