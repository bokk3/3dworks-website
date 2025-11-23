"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calculator, ArrowRight, Upload, File, Trash2 } from "lucide-react";
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
import {
  calculateQuote,
  materials,
  finishOptions,
  type QuoteInput,
  type QuoteBreakdown,
  parseSTLDimensions,
  parseOBJDimensions,
} from "@/lib/quote-calculator";
import { analytics } from "@/lib/analytics";

interface AdvancedQuoteCalculatorProps {
  onRequestQuote?: (data: QuoteInput & { breakdown: QuoteBreakdown }) => void;
}

export function AdvancedQuoteCalculator({
  onRequestQuote,
}: AdvancedQuoteCalculatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isParsingFile, setIsParsingFile] = useState(false);
  const [quoteData, setQuoteData] = useState<QuoteInput>({
    length: undefined,
    width: undefined,
    height: undefined,
    volume: undefined,
    material: "pla",
    infill: 20,
    layerHeight: 0.2,
    quantity: 1,
    finish: "as-printed",
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

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (extension !== "stl" && extension !== "obj" && extension !== "step") {
      alert("Please upload a STL, OBJ, or STEP file");
      return;
    }

    setUploadedFile(file);
    setIsParsingFile(true);

    try {
      let dimensions;
      if (extension === "stl") {
        dimensions = await parseSTLDimensions(file);
      } else if (extension === "obj") {
        dimensions = await parseOBJDimensions(file);
      } else {
        // STEP files - placeholder for now
        dimensions = { length: 100, width: 100, height: 100, volume: 1000 };
      }

      setQuoteData((prev) => ({
        ...prev,
        length: dimensions.length,
        width: dimensions.width,
        height: dimensions.height,
        volume: dimensions.volume,
      }));
    } catch (error) {
      console.error("Error parsing file:", error);
      alert("Failed to parse file. Please enter dimensions manually.");
    } finally {
      setIsParsingFile(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const breakdown = calculateQuote(quoteData);
  const selectedMaterial = materials.find((m) => m.id === quoteData.material);

  const handleInputChange = (
    field: keyof QuoteInput,
    value: string | number | boolean
  ) => {
    setQuoteData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRequestQuote = () => {
    if (onRequestQuote) {
      onRequestQuote({ ...quoteData, breakdown });
    }
    // Navigate to contact form with pre-filled data
    const params = new URLSearchParams({
      quote: "true",
      length: quoteData.length?.toString() || "",
      width: quoteData.width?.toString() || "",
      height: quoteData.height?.toString() || "",
      material: quoteData.material,
      quantity: quoteData.quantity.toString(),
      finish: quoteData.finish,
      rush: quoteData.rush.toString(),
      estimatedPrice: breakdown.total.toString(),
    });
    window.location.href = `/contact?${params.toString()}`;
  };

  const saveQuote = () => {
    const quote = {
      ...quoteData,
      breakdown,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("savedQuote", JSON.stringify(quote));
    alert("Quote saved! You can retrieve it later.");
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
        aria-label="Advanced Quote Calculator"
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
                "w-full max-w-2xl",
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
                    <h2 className="text-2xl font-display font-bold">
                      Advanced Quote Calculator
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get a detailed estimate for your 3D printing project
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full"
                  >
                    <X size={20} />
                  </Button>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label>3D Model File (Optional)</Label>
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className={cn(
                      "border-2 border-dashed rounded-lg p-6",
                      "border-slate-300 dark:border-slate-700",
                      "hover:border-cyan-500 transition-colors",
                      "text-center cursor-pointer"
                    )}
                  >
                    <input
                      type="file"
                      accept=".stl,.obj,.step"
                      onChange={handleFileInput}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      {isParsingFile ? (
                        <div className="space-y-2">
                          <div className="animate-spin h-8 w-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto" />
                          <p className="text-sm text-muted-foreground">
                            Parsing file...
                          </p>
                        </div>
                      ) : uploadedFile ? (
                        <div className="space-y-2">
                          <File className="mx-auto text-cyan-500" size={32} />
                          <p className="text-sm font-medium">{uploadedFile.name}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setUploadedFile(null);
                              setQuoteData((prev) => ({
                                ...prev,
                                length: undefined,
                                width: undefined,
                                height: undefined,
                                volume: undefined,
                              }));
                            }}
                          >
                            <Trash2 size={14} className="mr-2" /> Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="mx-auto text-muted-foreground" size={32} />
                          <p className="text-sm">
                            <span className="text-cyan-500">Click to upload</span> or drag
                            and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            STL, OBJ, or STEP files
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="length">Length (mm)</Label>
                    <Input
                      id="length"
                      type="number"
                      value={quoteData.length || ""}
                      onChange={(e) =>
                        handleInputChange("length", parseFloat(e.target.value) || 0)
                      }
                      placeholder="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (mm)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={quoteData.width || ""}
                      onChange={(e) =>
                        handleInputChange("width", parseFloat(e.target.value) || 0)
                      }
                      placeholder="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (mm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={quoteData.height || ""}
                      onChange={(e) =>
                        handleInputChange("height", parseFloat(e.target.value) || 0)
                      }
                      placeholder="100"
                    />
                  </div>
                </div>

                {/* Material */}
                <div className="space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <Select
                    value={quoteData.material}
                    onValueChange={(value) => handleInputChange("material", value)}
                  >
                    <SelectTrigger id="material">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((material) => (
                        <SelectItem key={material.id} value={material.id}>
                          {material.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Print Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="infill">
                      Infill: {quoteData.infill}%
                    </Label>
                    <Input
                      id="infill"
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={quoteData.infill}
                      onChange={(e) =>
                        handleInputChange("infill", parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="layerHeight">Layer Height (mm)</Label>
                    <Select
                      value={quoteData.layerHeight.toString()}
                      onValueChange={(value) =>
                        handleInputChange("layerHeight", parseFloat(value))
                      }
                    >
                      <SelectTrigger id="layerHeight">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedMaterial?.layerHeightOptions.map((lh) => (
                          <SelectItem key={lh} value={lh.toString()}>
                            {lh}mm
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Quantity & Finish */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quoteData.quantity}
                      onChange={(e) =>
                        handleInputChange("quantity", parseInt(e.target.value) || 1)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="finish">Finish</Label>
                    <Select
                      value={quoteData.finish}
                      onValueChange={(value) =>
                        handleInputChange("finish", value as QuoteInput["finish"])
                      }
                    >
                      <SelectTrigger id="finish">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {finishOptions.map((finish) => (
                          <SelectItem key={finish.id} value={finish.id}>
                            {finish.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Rush Option */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rush"
                    checked={quoteData.rush}
                    onChange={(e) => handleInputChange("rush", e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="rush" className="cursor-pointer">
                    Rush delivery (50% surcharge)
                  </Label>
                </div>

                {/* Price Breakdown */}
                <div className="glass-card p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold mb-3">Price Breakdown</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Material:</span>
                      <span>${breakdown.materialCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time & Labor:</span>
                      <span>${breakdown.timeCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Finishing:</span>
                      <span>${breakdown.finishingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping:</span>
                      <span>${breakdown.shippingCost.toFixed(2)}</span>
                    </div>
                    {breakdown.bulkDiscount > 0 && (
                      <div className="flex justify-between text-green-500">
                        <span>Bulk Discount:</span>
                        <span>-${breakdown.bulkDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    {breakdown.rushSurcharge > 0 && (
                      <div className="flex justify-between text-orange-500">
                        <span>Rush Surcharge:</span>
                        <span>+${breakdown.rushSurcharge.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-cyan-500">
                          ${breakdown.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={saveQuote}
                    className="flex-1"
                  >
                    Save Quote
                  </Button>
                  <Button
                    onClick={handleRequestQuote}
                    className="flex-1 hover-glow-cyan"
                  >
                    Request Official Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

