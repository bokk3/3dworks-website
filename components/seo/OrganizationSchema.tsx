export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "3Dworks",
    url: "https://3dworks.truyens.pro",
    logo: "https://3dworks.truyens.pro/logo.png",
    description:
      "Precision 3D printing services for rapid prototyping and custom manufacturing. Bringing your digital designs to physical reality with cutting-edge 3D printing technology.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Innovation Drive",
      addressLocality: "Tech District",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "Customer Service",
      email: "hello@3dworks.com",
      areaServed: "US",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.facebook.com/3dworks",
      "https://www.twitter.com/3dworks",
      "https://www.instagram.com/3dworks",
      "https://www.linkedin.com/company/3dworks",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

