import React from "react";
import { business, services } from "../config/siteData.js";

export default function SeoSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: business.name,
    url: business.website,
    image: `${business.website}images/prx-projects-logo.jpg`,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shere",
      addressLocality: "Pretoria",
      addressRegion: "Gauteng",
      postalCode: "0083",
      addressCountry: "ZA",
    },
    areaServed: business.areaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    description: business.positioning,
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.shortDescription,
        areaServed: "Pretoria and Gauteng",
        provider: {
          "@type": "Organization",
          name: business.name,
        },
      },
    })),
  };

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}
