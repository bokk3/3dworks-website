"use client";

import dynamic from "next/dynamic";

// Dynamic import for QuickQuote (heavy component with calculations)
// Client-side only component, so we use ssr: false
const QuickQuote = dynamic(() => import("./QuickQuote").then((mod) => ({ default: mod.QuickQuote })), {
  ssr: false, // Client-side only component
});

export function QuickQuoteWrapper() {
  return <QuickQuote />;
}

