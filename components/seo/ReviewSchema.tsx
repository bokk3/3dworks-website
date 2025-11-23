import { testimonials } from "@/lib/testimonials-data";

export function ReviewSchema() {
  // Calculate aggregate rating
  const totalRatings = testimonials.length;
  const sumRatings = testimonials.reduce((sum, t) => sum + t.rating, 0);
  const averageRating = sumRatings / totalRatings;

  const reviewSchemas = testimonials.map((testimonial) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: testimonial.clientName,
    },
    datePublished: new Date().toISOString().split("T")[0],
    reviewBody: testimonial.testimonial,
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      "@type": "Service",
      name: "3D Printing Services",
      provider: {
        "@type": "Organization",
        name: "3Dworks",
      },
    },
  }));

  // Aggregate rating schema
  const aggregateSchema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: averageRating.toFixed(1),
    reviewCount: totalRatings,
    bestRating: 5,
    worstRating: 1,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateSchema) }}
      />
      {reviewSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

