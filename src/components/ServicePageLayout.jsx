import React from "react";
import CTASection from "./CTASection.jsx";
import FAQSection from "./FAQSection.jsx";
import GallerySection from "./GallerySection.jsx";
import ProcessSection from "./ProcessSection.jsx";
import QuoteForm from "./QuoteForm.jsx";
import ReviewsSection from "./ReviewsSection.jsx";
import { whatsappUrl } from "../config/siteData.js";

export default function ServicePageLayout({ service }) {
  return (
    <>
      <section className="page-hero service-hero" style={{ "--service-hero-image": `url(${service.image})` }}>
        <div>
          <p className="eyebrow">{service.keyword}</p>
          <h1>{service.hero}</h1>
          <p>{service.intro}</p>
          <div className="button-row">
            <a className="primary-button" href={whatsappUrl(service.whatsappMessage)} target="_blank" rel="noreferrer">
              WhatsApp For This Service
            </a>
            <a className="secondary-button light" href="#service-quote">
              Request Written Quote
            </a>
          </div>
        </div>
      </section>

      <section className="section split-section">
        <div>
          <p className="eyebrow">Benefits</p>
          <h2>Why clients choose PRX Projects for {service.title.toLowerCase()}.</h2>
        </div>
        <ul className="check-list">
          {service.benefits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section muted-section split-section">
        <div>
          <p className="eyebrow">Included</p>
          <h2>What can be included in the quote.</h2>
        </div>
        <ul className="check-list">
          {service.included.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <ProcessSection />
      <GallerySection title={`${service.title} project examples`} />
      <ReviewsSection />
      <FAQSection items={service.faqs} />
      <CTASection message={service.whatsappMessage} />

      <section className="section quote-panel-section" id="service-quote">
        <div className="section-heading">
          <p className="eyebrow">Quote Form</p>
          <h2>Request a {service.title.toLowerCase()} quote.</h2>
        </div>
        <QuoteForm defaultService={service.title} />
      </section>
    </>
  );
}
