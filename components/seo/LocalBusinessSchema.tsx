import { testimonials } from "@/lib/testimonials-data";

export function LocalBusinessSchema() {
  // Calculate aggregate rating from testimonials
  const totalRatings = testimonials.length;
  const sumRatings = testimonials.reduce((sum, t) => sum + t.rating, 0);
  const averageRating = sumRatings / totalRatings;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "3Dworks",
    image: "https://3dworks.truyens.pro/og-image.png",
    "@id": "https://3dworks.truyens.pro",
    url: "https://3dworks.truyens.pro",
    telephone: "+1-555-123-4567",
    email: "hello@3dworks.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Innovation Drive",
      addressLocality: "Tech District",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7128,
      longitude: -74.006,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    paymentAccepted: ["Cash", "Credit Card", "Bank Transfer", "PayPal"],
    currenciesAccepted: "USD",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 40.7128,
        longitude: -74.006,
      },
      geoRadius: {
        "@type": "Distance",
        value: "50",
        unitCode: "MI",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      reviewCount: totalRatings,
      bestRating: 5,
      worstRating: 1,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "3D Printing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Rapid Prototyping",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Manufacturing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Design & Modeling",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

