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

export function Contact() {
  return (
    <section
      id="contact"
      className="section relative overflow-hidden bg-slate-50 dark:bg-[#0a0a0f]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-[0.03] dark:opacity-[0.05]" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Let's Build{" "}
                <span className="text-gradient-purple">Together</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ready to turn your digital designs into physical reality? Upload
                your files or send us a message to get started.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-500">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email Us</h3>
                  <p className="text-muted-foreground">hello@3dworks.com</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Response within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Visit Us</h3>
                  <p className="text-muted-foreground">
                    123 Innovation Drive
                    <br />
                    Tech City, TC 90210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-500">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Business Hours</h3>
                  <p className="text-muted-foreground">
                    Mon - Fri: 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-muted-foreground">
                    Sat: 10:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border/50">
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-500 transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
