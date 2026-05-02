import React, { useEffect } from "react";
import ServicePageLayout from "../components/ServicePageLayout.jsx";
import { business } from "../config/siteData.js";
import { setPageMeta } from "../utils/seo.js";

export default function ServicePage({ service }) {
  useEffect(() => {
    setPageMeta(
      `${service.title} | PRX Projects Pretoria & Gauteng`,
      `${service.title} by PRX Projects. ${service.keyword} for clients in Pretoria and Gauteng. Request a WhatsApp or written quote.`,
    );
  }, [service]);

  if (!service) return null;

  return <ServicePageLayout service={{ ...service, location: business.location }} />;
}
