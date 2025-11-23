import { projects } from "@/lib/portfolio-data";

export function ProductSchema() {
  const productSchemas = projects.map((project) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: project.title,
    description: project.description,
    image: project.image,
    category: project.category,
    brand: {
      "@type": "Brand",
      name: "3Dworks",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Material",
        value: project.material,
      },
      {
        "@type": "PropertyValue",
        name: "Print Time",
        value: project.printTime,
      },
      {
        "@type": "PropertyValue",
        name: "Dimensions",
        value: project.dimensions,
      },
      ...(project.technology
        ? [
            {
              "@type": "PropertyValue",
              name: "Technology",
              value: project.technology,
            },
          ]
        : []),
    ],
  }));

  return (
    <>
      {productSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

