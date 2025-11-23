"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, X, TrendingUp, DollarSign, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  materials,
  type MaterialProperty,
  getRecommendedMaterials,
} from "@/lib/materials-data";

interface MaterialComparisonProps {
  className?: string;
}

export function MaterialComparison({ className }: MaterialComparisonProps) {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([
    "pla",
    "abs",
    "petg",
  ]);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [filterStrength, setFilterStrength] = useState<[number, number]>([0, 100]);
  const [filterFlexibility, setFilterFlexibility] = useState<[number, number]>([
    0, 100,
  ]);
  const [wizardMode, setWizardMode] = useState(false);
  const [wizardRequirements, setWizardRequirements] = useState({
    strength: 0,
    flexibility: 0,
    temperatureResistance: 0,
    maxCost: 0.5,
  });

  const displayedMaterials = useMemo(() => {
    if (wizardMode) {
      return getRecommendedMaterials(wizardRequirements);
    }
    return materials.filter((m) => selectedMaterials.includes(m.id));
  }, [selectedMaterials, wizardMode, wizardRequirements]);

  const toggleMaterial = (id: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const getPropertyColor = (value: number, max: number = 100) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-cyan-500";
    if (percentage >= 40) return "text-yellow-500";
    return "text-orange-500";
  };

  return (
    <section className={cn("section", className)}>
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Material <span className="text-gradient-cyan">Comparison</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Compare materials side-by-side to find the perfect fit for your project
          </p>
        </div>

        {/* Controls */}
        <div className="glass-card p-6 rounded-xl mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant={wizardMode ? "outline" : "default"}
              onClick={() => setWizardMode(false)}
              size="sm"
            >
              Comparison View
            </Button>
            <Button
              variant={wizardMode ? "default" : "outline"}
              onClick={() => setWizardMode(true)}
              size="sm"
            >
              Best for Your Project
            </Button>
            <div className="ml-auto flex gap-2">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                onClick={() => setViewMode("table")}
                size="sm"
              >
                Table
              </Button>
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                onClick={() => setViewMode("cards")}
                size="sm"
              >
                Cards
              </Button>
            </div>
          </div>

          {!wizardMode && (
            <div className="space-y-2">
              <Label>Select Materials to Compare</Label>
              <div className="flex flex-wrap gap-2">
                {materials.map((material) => (
                  <Button
                    key={material.id}
                    variant={selectedMaterials.includes(material.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleMaterial(material.id)}
                  >
                    {selectedMaterials.includes(material.id) && (
                      <Check className="mr-2 h-4 w-4" />
                    )}
                    {material.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {wizardMode && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Min Strength (0-100)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={wizardRequirements.strength}
                  onChange={(e) =>
                    setWizardRequirements((prev) => ({
                      ...prev,
                      strength: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Min Flexibility (0-100)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={wizardRequirements.flexibility}
                  onChange={(e) =>
                    setWizardRequirements((prev) => ({
                      ...prev,
                      flexibility: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Min Temp Resistance (°C)</Label>
                <Input
                  type="number"
                  min="0"
                  value={wizardRequirements.temperatureResistance}
                  onChange={(e) =>
                    setWizardRequirements((prev) => ({
                      ...prev,
                      temperatureResistance: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Max Cost ($/cm³)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={wizardRequirements.maxCost}
                  onChange={(e) =>
                    setWizardRequirements((prev) => ({
                      ...prev,
                      maxCost: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* Comparison Table */}
        {viewMode === "table" && (
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left p-4 font-semibold">Material</th>
                    <th className="text-center p-4 font-semibold">Strength</th>
                    <th className="text-center p-4 font-semibold">Flexibility</th>
                    <th className="text-center p-4 font-semibold">Temp. Resistance</th>
                    <th className="text-center p-4 font-semibold">Cost</th>
                    <th className="text-center p-4 font-semibold">Print Time</th>
                    <th className="text-left p-4 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedMaterials.map((material, index) => (
                    <motion.tr
                      key={material.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <div className="font-semibold">{material.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {material.description}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">
                        <div className="flex items-center justify-center gap-2">
                          <span className={getPropertyColor(material.strength)}>
                            {material.strength}
                          </span>
                          <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                material.strength >= 80
                                  ? "bg-green-500"
                                  : material.strength >= 60
                                  ? "bg-cyan-500"
                                  : material.strength >= 40
                                  ? "bg-yellow-500"
                                  : "bg-orange-500"
                              )}
                              style={{ width: `${material.strength}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">
                        <div className="flex items-center justify-center gap-2">
                          <span className={getPropertyColor(material.flexibility)}>
                            {material.flexibility}
                          </span>
                          <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                material.flexibility >= 60
                                  ? "bg-green-500"
                                  : material.flexibility >= 40
                                  ? "bg-cyan-500"
                                  : "bg-yellow-500"
                              )}
                              style={{ width: `${material.flexibility}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">
                        <span className={getPropertyColor(material.temperatureResistance, 150)}>
                          {material.temperatureResistance}°C
                        </span>
                      </td>
                      <td className="text-center p-4">
                        <div className="flex items-center justify-center gap-1">
                          <DollarSign size={14} />
                          <span>{material.cost.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="text-center p-4">
                        <div className="flex items-center justify-center gap-1">
                          <Clock size={14} />
                          <span>{material.printTime}h</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {material.useCases.slice(0, 2).map((useCase) => (
                            <span
                              key={useCase}
                              className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-md"
                            >
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Comparison Cards */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedMaterials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl hover-lift"
              >
                <h3 className="text-xl font-display font-bold mb-2">{material.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {material.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Strength</span>
                      <span className={getPropertyColor(material.strength)}>
                        {material.strength}/100
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          material.strength >= 80
                            ? "bg-green-500"
                            : material.strength >= 60
                            ? "bg-cyan-500"
                            : "bg-yellow-500"
                        )}
                        style={{ width: `${material.strength}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Flexibility</span>
                      <span className={getPropertyColor(material.flexibility)}>
                        {material.flexibility}/100
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          material.flexibility >= 60
                            ? "bg-green-500"
                            : "bg-cyan-500"
                        )}
                        style={{ width: `${material.flexibility}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Temp. Resistance</span>
                    <span className={getPropertyColor(material.temperatureResistance, 150)}>
                      {material.temperatureResistance}°C
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Cost</span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={14} />
                      {material.cost.toFixed(2)}/cm³
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Print Time</span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {material.printTime}h/100cm³
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold mb-2 text-muted-foreground">
                    Best For:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {material.useCases.map((useCase) => (
                      <span
                        key={useCase}
                        className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-md"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {displayedMaterials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No materials match your requirements. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

