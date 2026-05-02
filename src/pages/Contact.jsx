import React, { useEffect } from "react";
import QuoteForm from "../components/QuoteForm.jsx";
import { business, seo, whatsappUrl } from "../config/siteData.js";
import { setPageMeta } from "../utils/seo.js";

export default function Contact() {
  useEffect(() => {
    setPageMeta(seo.contact.title, seo.contact.description);
  }, []);

  return (
    <>
      <section className="page-hero">
        <div>
          <p className="eyebrow">Contact PRX Projects</p>
          <h1>Speak to a Pretoria contractor about your project.</h1>
          <p>{business.positioning}</p>
        </div>
      </section>

      <section className="section contact-grid">
        <div className="contact-card">
          <h2>Contact details</h2>
          <a href={`tel:${business.phone}`}>{business.phone}</a>
          <a href={`mailto:${business.email}`}>{business.email}</a>
          <a href={business.website}>{business.website}</a>
          <p>{business.location}</p>
          <a className="primary-button" href={whatsappUrl()} target="_blank" rel="noreferrer">
            WhatsApp PRX Projects
          </a>
        </div>
        <QuoteForm />
      </section>
    </>
  );
}
