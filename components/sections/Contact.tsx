"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { ContactForm } from "./Contact/ContactForm";
import { GoogleMap } from "@/components/ui/GoogleMap";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-50 dark:bg-[#0a0a0f] min-h-[calc(100vh-5rem)] flex items-center"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-[0.03] dark:opacity-[0.05]" />

      <div className="container relative z-10 w-full py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-4"
          >
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Let's Build{" "}
                <span className="text-gradient-amber">Together</span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Ready to turn your digital designs into physical reality? Upload
                your files or send us a message to get started.
              </p>
            </div>

            {/* Compact Grid for Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500 mb-2">
                  <Mail size={18} />
                </div>
                <h3 className="text-xs font-semibold mb-1">Email Us</h3>
                <p className="text-xs text-muted-foreground">hello@3dworks.com</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  24h response
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 mb-2">
                  <MapPin size={18} />
                </div>
                <h3 className="text-xs font-semibold mb-1">Visit Us</h3>
                <p className="text-xs text-muted-foreground leading-tight">
                  123 Innovation Dr
                  <br />
                  Tech City, TC
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500 mb-2">
                  <Clock size={18} />
                </div>
                <h3 className="text-xs font-semibold mb-1">Hours</h3>
                <p className="text-xs text-muted-foreground leading-tight">
                  Mon-Fri: 9-6
                  <br />
                  Sat: 10-2
                </p>
              </div>
            </div>

            {/* Google Maps Widget */}
            <div>
              <h4 className="font-bold mb-3 text-sm">Find Us</h4>
              <GoogleMap 
                address="123 Innovation Drive, Tech City, TC 90210"
                className="w-full max-h-[200px]"
              />
            </div>

            <div className="pt-3 border-t border-border/50">
              <h4 className="font-bold mb-3 text-sm">Follow Us</h4>
              <div className="flex gap-3">
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-orange-500/10 hover:text-orange-500 transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <div className="flex flex-col">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
