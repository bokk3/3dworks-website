"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, CheckCircle, Circle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { QuoteRequest } from "@/app/actions/admin";

interface QuotesOverviewProps {
  quotes: QuoteRequest[];
  onStatusChange?: (id: string, status: "new" | "replied") => void;
}

export function QuotesOverview({
  quotes: initialQuotes,
  onStatusChange,
}: QuotesOverviewProps) {
  const [quotes, setQuotes] = useState<QuoteRequest[]>(initialQuotes);
  const [filterStatus, setFilterStatus] = useState<"all" | "new" | "replied">("all");

  useEffect(() => {
    setQuotes(initialQuotes);
  }, [initialQuotes]);

  const filteredQuotes = quotes.filter((quote) => {
    if (filterStatus === "all") return true;
    return quote.status === filterStatus;
  });

  const handleStatusChange = (id: string, status: "new" | "replied") => {
    setQuotes((prev) =>
      prev.map((quote) => (quote.id === id ? { ...quote, status } : quote))
    );
    onStatusChange?.(id, status);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold flex items-center gap-2">
            <Calculator className="text-cyan-500" size={24} />
            Quote Requests
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredQuotes.length} quote{filteredQuotes.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filter */}
        <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Quotes</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quotes List */}
      <div className="space-y-4">
        {filteredQuotes.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-xl">
            <p className="text-muted-foreground">No quote requests found.</p>
          </div>
        ) : (
          filteredQuotes.map((quote, index) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "glass-card p-6 rounded-xl",
                quote.status === "new" && "border-l-4 border-cyan-500"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">Quote #{quote.id.slice(0, 8)}</h3>
                    {quote.status === "new" && (
                      <span className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(quote.timestamp).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleStatusChange(
                      quote.id,
                      quote.status === "new" ? "replied" : "new"
                    )
                  }
                >
                  {quote.status === "new" ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Replied
                    </>
                  ) : (
                    <>
                      <Circle className="mr-2 h-4 w-4" />
                      Mark as New
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quote.length && quote.width && quote.height && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Dimensions</p>
                    <p className="font-medium">
                      {quote.length} × {quote.width} × {quote.height} mm
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Material</p>
                  <p className="font-medium capitalize">{quote.material}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                  <p className="font-medium">{quote.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Finish</p>
                  <p className="font-medium capitalize">{quote.finish}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rush</p>
                  <p className="font-medium">{quote.rush ? "Yes" : "No"}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-sm text-muted-foreground mb-1">Estimated Price</p>
                  <p className="font-bold text-lg text-cyan-500 flex items-center gap-1">
                    <DollarSign size={18} />
                    {quote.estimatedPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

