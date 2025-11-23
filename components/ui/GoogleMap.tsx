"use client";

import { useState } from "react";
import { Loader2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface GoogleMapProps {
  className?: string;
  address?: string;
  lat?: number;
  lng?: number;
}

// Default coordinates for "123 Innovation Drive, Tech City, TC 90210"
const DEFAULT_LAT = 34.0522;
const DEFAULT_LNG = -118.2437;

export function GoogleMap({ 
  className, 
  address = "123 Innovation Drive, Tech City, TC 90210",
  lat = DEFAULT_LAT,
  lng = DEFAULT_LNG 
}: GoogleMapProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  // If no API key, show a placeholder with address
  if (!apiKey) {
    return (
      <div className={cn("relative rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800", className)}>
        <div className="h-full min-h-[180px] max-h-[200px] flex flex-col items-center justify-center p-4 text-center">
          <MapPin className="w-10 h-10 text-orange-500 mb-3" />
          <p className="text-xs font-medium text-foreground mb-1">Visit Us</p>
          <p className="text-[10px] text-muted-foreground">{address}</p>
          <p className="text-[10px] text-muted-foreground mt-1">
            Google Maps API key not configured
          </p>
        </div>
      </div>
    );
  }

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(address)}&zoom=15&center=${lat},${lng}`;

  return (
    <div className={cn("relative rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 h-full", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 z-10">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
        </div>
      )}
      {hasError ? (
        <div className="h-full min-h-[180px] max-h-[200px] flex flex-col items-center justify-center p-4 text-center">
          <MapPin className="w-10 h-10 text-orange-500 mb-3" />
          <p className="text-xs font-medium text-foreground mb-1">Visit Us</p>
          <p className="text-[10px] text-muted-foreground">{address}</p>
        </div>
      ) : (
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: "180px", maxHeight: "200px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          title="3Dworks Location"
        />
      )}
    </div>
  );
}

