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
    default: "3Dworks - Precision 3D Printing Services",
    template: "%s | 3Dworks",
  },
  description:
    "From rapid prototyping to custom manufacturing - we bring your ideas to life with cutting-edge 3D printing technology. Professional 3D printing services for aerospace, automotive, medical, and consumer products.",
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
    title: "3Dworks - Precision 3D Printing Services",
    description:
      "From rapid prototyping to custom manufacturing - we bring your ideas to life with cutting-edge 3D printing technology.",
    type: "website",
    locale: "en_US",
    siteName: "3Dworks",
    images: [
      {
        url: "/og-image.png", // Add this image to your public folder
        width: 1200,
        height: 630,
        alt: "3Dworks - Precision 3D Printing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3Dworks - Precision 3D Printing Services",
    description:
      "From rapid prototyping to custom manufacturing - we bring your ideas to life with cutting-edge 3D printing technology.",
    images: ["/og-image.png"],
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
import { QuickQuote } from "@/components/features/QuickQuote";
import { BackToTop } from "@/components/ui/BackToTop";
import { SkipToContent } from "@/components/ui/SkipToContent";

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
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <SkipToContent />
        <ScrollProgress />
        <Navbar />
        <main id="main-content" className="flex-grow pt-20" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <QuickQuote />
        <BackToTop />
      </body>
    </html>
  );
}
