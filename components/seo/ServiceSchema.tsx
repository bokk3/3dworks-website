import { services } from "@/lib/services-data";

export function ServiceSchema() {
  const serviceSchemas = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "3Dworks",
      url: "https://3dworks.truyens.pro",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: "3D Printing Service",
    category: service.title,
  }));

  return (
    <>
      {serviceSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

