import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "3Dworks - Precision 3D Printing Services | Rapid Prototyping & Custom Manufacturing",
    template: "%s | 3Dworks",
  },
  description:
    "Professional 3D printing services for rapid prototyping and custom manufacturing. Precision parts for aerospace, automotive, medical, and consumer industries. Fast turnaround, high-quality materials, expert design support.",
  keywords: [
    "3D printing",
    "rapid prototyping",
    "custom manufacturing",
    "3D design",
    "additive manufacturing",
    "PLA printing",
    "resin printing",
    "custom parts",
    "product design",
    "3D modeling",
  ],
  authors: [{ name: "3Dworks" }],
  creator: "3Dworks",
  publisher: "3Dworks",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://3dworks.truyens.pro/"),
  openGraph: {
    title: "3Dworks - Precision 3D Printing Services | Rapid Prototyping & Custom Manufacturing",
    description:
      "Professional 3D printing services for rapid prototyping and custom manufacturing. Precision parts for aerospace, automotive, medical, and consumer industries. Fast turnaround, high-quality materials, expert design support.",
    type: "website",
    locale: "en_US",
    siteName: "3Dworks",
    url: "https://3dworks.truyens.pro",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "3Dworks - Precision 3D Printing Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3Dworks - Precision 3D Printing Services | Rapid Prototyping & Custom Manufacturing",
    description:
      "Professional 3D printing services for rapid prototyping and custom manufacturing. Precision parts for aerospace, automotive, medical, and consumer industries.",
    images: ["/og-image.png"],
    creator: "@3dworks",
  },
  alternates: {
    canonical: "https://3dworks.truyens.pro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes when ready
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { QuickQuoteWrapper } from "@/components/features/QuickQuoteWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <SkipToContent />
        <ScrollProgress />
        <Navbar />
        <main id="main-content" className="flex-grow pt-20" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <QuickQuoteWrapper />
        <BackToTop />
      </body>
    </html>
  );
}
