"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { analytics } from "@/lib/analytics";

const navLinks = [
  { name: "Home", href: "/", sectionId: "hero" },
  { name: "Portfolio", href: "#portfolio", sectionId: "portfolio" },
  { name: "Services", href: "#services", sectionId: "services" },
  { name: "About", href: "#about", sectionId: "about" },
  { name: "Contact", href: "#contact", sectionId: "contact" },
];

const NAVBAR_HEIGHT = 80; // Offset for fixed navbar

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for active section detection
  useEffect(() => {
    // Only run on homepage
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = navLinks
      .map((link) => link.sectionId)
      .filter((id) => id !== "hero")
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    // Create observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });

        // If no section is intersecting and we're at the top, set to hero
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0 && window.scrollY < 100) {
          setActiveSection("hero");
        }
      },
      {
        rootMargin: `-${NAVBAR_HEIGHT}px 0px -50% 0px`,
        threshold: 0.1,
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    // Check initial position
    if (window.scrollY < 100) {
      setActiveSection("hero");
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pathname]);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - NAVBAR_HEIGHT;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "glass py-3 shadow-sm" : "bg-transparent py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-md flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-glow-cyan transition-all duration-300">
              3D
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground group-hover:text-gradient-cyber transition-all duration-300">
              works
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === "/" && activeSection === link.sectionId;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "text-sm font-medium transition-colors relative group",
                    isActive
                      ? "text-cyan-500"
                      : "text-muted-foreground hover:text-cyan-500"
                  )}
                >
                  {link.name}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-cyan-500 transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              className="bg-cyan-500 hover:bg-cyan-600 text-white border-none hover-glow-cyan transition-all duration-300"
              size="sm"
              onClick={() => {
                analytics.trackCTAClick("Get Started", "navbar");
                const contactSection = document.getElementById("contact");
                if (contactSection && pathname === "/") {
                  const elementPosition = contactSection.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - NAVBAR_HEIGHT;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground hover:text-cyan-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-24 px-6"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-between text-2xl font-display font-medium transition-colors py-2 border-b border-border/50",
                      pathname === "/" && activeSection === link.sectionId
                        ? "text-cyan-500"
                        : "text-foreground hover:text-cyan-500"
                    )}
                  >
                    {link.name}
                    <ChevronRight size={20} className="text-muted-foreground" />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Button
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white h-12 text-lg hover-glow-cyan"
                  onClick={() => {
                    analytics.trackCTAClick("Get Started", "mobile_menu");
                    const contactSection = document.getElementById("contact");
                    if (contactSection && pathname === "/") {
                      const elementPosition = contactSection.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - NAVBAR_HEIGHT;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
