"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { analytics } from "@/lib/analytics";

const materials = [
  { value: "pla", label: "PLA", basePrice: 0.05 },
  { value: "abs", label: "ABS", basePrice: 0.06 },
  { value: "petg", label: "PETG", basePrice: 0.07 },
  { value: "resin", label: "Resin", basePrice: 0.15 },
  { value: "nylon", label: "Nylon", basePrice: 0.12 },
  { value: "carbon-fiber", label: "Carbon Fiber Nylon", basePrice: 0.25 },
];

interface QuoteData {
  length: string;
  width: string;
  height: string;
  material: string;
  quantity: string;
  rush: boolean;
}

export function QuickQuote() {
  const [isOpen, setIsOpen] = useState(false);
  const [quoteData, setQuoteData] = useState<QuoteData>({
    length: "",
    width: "",
    height: "",
    material: "",
    quantity: "1",
    rush: false,
  });

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const calculatePrice = (): number => {
    const length = parseFloat(quoteData.length) || 0;
    const width = parseFloat(quoteData.width) || 0;
    const height = parseFloat(quoteData.height) || 0;
    const quantity = parseInt(quoteData.quantity) || 1;
    const material = materials.find((m) => m.value === quoteData.material);

    if (!material || length === 0 || width === 0 || height === 0) {
      return 0;
    }

    // Calculate volume in cm³
    const volume = (length * width * height) / 1000; // Convert mm³ to cm³
    const basePrice = volume * material.basePrice;
    const quantityMultiplier = quantity > 10 ? 0.85 : quantity > 5 ? 0.9 : 1; // Bulk discount
    const rushMultiplier = quoteData.rush ? 1.5 : 1;

    return Math.round(basePrice * quantity * quantityMultiplier * rushMultiplier);
  };

  const estimatedPrice = calculatePrice();

  const handleInputChange = (field: keyof QuoteData, value: string | boolean) => {
    setQuoteData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40",
          "w-14 h-14 rounded-full",
          "bg-cyan-500 hover:bg-cyan-600 text-white",
          "shadow-lg shadow-cyan-500/30",
          "flex items-center justify-center",
          "transition-colors"
        )}
        aria-label="Quick Quote Calculator"
      >
        <Calculator size={24} />
      </motion.button>

      {/* Slide-in Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={cn(
                "fixed top-0 right-0 bottom-0 z-50",
                "w-full max-w-md",
                "bg-white dark:bg-zinc-900/95",
                "backdrop-blur-xl",
                "border-l border-slate-200 dark:border-white/10",
                "shadow-2xl",
                "overflow-y-auto"
              )}
            >
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-display font-bold">Quick Quote</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get an instant estimate for your project
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  {/* Dimensions */}
                  <div className="space-y-2">
                    <Label>Dimensions (mm)</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Input
                          type="number"
                          placeholder="L"
                          value={quoteData.length}
                          onChange={(e) => handleInputChange("length", e.target.value)}
                          className="bg-background"
                          min="1"
                        />
                      </div>
                      <div>
                        <Input
                          type="number"
                          placeholder="W"
                          value={quoteData.width}
                          onChange={(e) => handleInputChange("width", e.target.value)}
                          className="bg-background"
                          min="1"
                        />
                      </div>
                      <div>
                        <Input
                          type="number"
                          placeholder="H"
                          value={quoteData.height}
                          onChange={(e) => handleInputChange("height", e.target.value)}
                          className="bg-background"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Material */}
                  <div className="space-y-2">
                    <Label>Material</Label>
                    <Select
                      value={quoteData.material}
                      onValueChange={(value) => handleInputChange("material", value)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        {materials.map((material) => (
                          <SelectItem key={material.value} value={material.value}>
                            {material.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      placeholder="1"
                      value={quoteData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      className="bg-background"
                      min="1"
                    />
                  </div>

                  {/* Rush Option */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="rush"
                      checked={quoteData.rush}
                      onChange={(e) => handleInputChange("rush", e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                    />
                    <Label htmlFor="rush" className="cursor-pointer">
                      Rush delivery (50% surcharge)
                    </Label>
                  </div>

                  {/* Price Estimate */}
                  {estimatedPrice > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "p-4 rounded-md",
                        "bg-gradient-to-br from-cyan-500/10 to-purple-500/10",
                        "border border-cyan-500/20"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Estimated Price:</span>
                        <span className="text-2xl font-display font-bold text-cyan-500">
                          ${estimatedPrice}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        * This is an estimate. Final price may vary based on complexity and finishing options.
                      </p>
                    </motion.div>
                  )}

                  {/* CTA */}
                  <div className="pt-4 space-y-3">
                    <Button
                      asChild
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      <Link
                        href="#contact"
                        onClick={() => {
                          analytics.trackCTAClick("Request Detailed Quote", "quick_quote");
                          setIsOpen(false);
                        }}
                      >
                        Request Detailed Quote <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      For accurate pricing, upload your 3D model or contact us directly
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

