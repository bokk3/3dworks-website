"use client";

// Google Analytics 4 event tracking
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Initialize GA4
export function initGA() {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });
  }
}

// Track page views
export function trackPageView(url: string) {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

// Track custom events
export function trackEvent(
  eventName: string,
  eventParams?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }
) {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID && window.gtag) {
    window.gtag("event", eventName, {
      ...eventParams,
    });
  }
}

// Specific event tracking functions
export const analytics = {
  // Form submissions
  trackFormSubmission: (formType: "contact" | "quote" | "newsletter") => {
    trackEvent("form_submission", {
      category: "engagement",
      form_type: formType,
    });
  },

  // Portfolio interactions
  trackPortfolioClick: (projectId: string, projectTitle: string) => {
    trackEvent("portfolio_click", {
      category: "engagement",
      project_id: projectId,
      project_title: projectTitle,
    });
  },

  // CTA button clicks
  trackCTAClick: (ctaName: string, location: string) => {
    trackEvent("cta_click", {
      category: "engagement",
      cta_name: ctaName,
      location: location,
    });
  },

  // File uploads
  trackFileUpload: (fileType: string, fileSize: number) => {
    trackEvent("file_upload", {
      category: "engagement",
      file_type: fileType,
      file_size: fileSize,
    });
  },

  // Newsletter signups
  trackNewsletterSignup: () => {
    trackEvent("newsletter_signup", {
      category: "conversion",
    });
  },

  // Section scroll depth
  trackScrollDepth: (depth: number) => {
    trackEvent("scroll_depth", {
      category: "engagement",
      scroll_depth: depth,
    });
  },

  // Time on page
  trackTimeOnPage: (timeInSeconds: number) => {
    trackEvent("time_on_page", {
      category: "engagement",
      time_seconds: timeInSeconds,
    });
  },
};

