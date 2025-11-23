"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import { cn } from "@/lib/utils";
import { analytics } from "@/lib/analytics";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    // Client-side validation
    if (!email.trim()) {
      setError("Email is required.");
      setIsLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);

      const result = await subscribeNewsletter(formData);

      if (result.error) {
        setError(result.error);
      } else {
        analytics.trackNewsletterSignup();
        setSuccess(true);
        setEmail("");
        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <footer className="bg-gray-50 dark:bg-[#0a0a0f] border-t border-border transition-colors duration-300">
      <div className="container section py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-md flex items-center justify-center text-white font-bold text-xl shadow-md">
                3D
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                works
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Precision 3D printing services for rapid prototyping and custom
              manufacturing. Bringing your digital designs to physical reality.
            </p>
            <div className="flex gap-4 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-cyan-500 hover:border-cyan-500 hover:shadow-glow-cyan transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                "Home",
                "Portfolio",
                "Services",
                "Technology",
                "Contact",
                "Get a Quote",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="text-muted-foreground hover:text-cyan-500 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={18} className="text-cyan-500 shrink-0 mt-0.5" />
                <span>
                  123 Innovation Drive,
                  <br />
                  Tech District, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={18} className="text-cyan-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={18} className="text-cyan-500 shrink-0" />
                <span>hello@3dworks.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-foreground">
              Stay Updated
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get project inspiration & 3D printing tips delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className={cn(
                    "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10",
                    "backdrop-blur",
                    "focus:border-cyan-500 focus:ring-cyan-500/20 transition-colors",
                    error && "border-red-400 focus:ring-red-500/20"
                  )}
                  disabled={isLoading}
                />
                {error && (
                  <p className="text-xs text-red-400 mt-1">{error}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white hover-glow-cyan disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subscribing...
                  </>
                ) : (
                  <>
                Subscribe <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </form>
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 flex items-center gap-2 text-sm text-green-500 bg-green-500/10 p-2 rounded-md"
                >
                  <CheckCircle size={16} />
                  <span>Subscribed successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {currentYear} 3Dworks. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-cyan-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-cyan-500 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
