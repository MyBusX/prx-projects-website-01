import React, { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import StatsSection from "../components/StatsSection.jsx";
import BuildIntentSection from "../components/BuildIntentSection.jsx";
import ServiceCards from "../components/ServiceCards.jsx";
import ProcessSection from "../components/ProcessSection.jsx";
import GallerySection from "../components/GallerySection.jsx";
import ProjectProof from "../components/ProjectProof.jsx";
import CommitmentsSection from "../components/CommitmentsSection.jsx";
import ReviewsSection from "../components/ReviewsSection.jsx";
import FAQSection from "../components/FAQSection.jsx";
import CTASection from "../components/CTASection.jsx";
import ServiceAreaSection from "../components/ServiceAreaSection.jsx";
import { additionalServices, seo, whyChoose } from "../config/siteData.js";
import { setPageMeta } from "../utils/seo.js";

export default function Home() {
  useEffect(() => {
    setPageMeta(seo.home.title, seo.home.description);
  }, []);

  return (
    <>
      <Hero />
      <StatsSection />
      <BuildIntentSection />
      <ProjectProof />
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Core Services</p>
          <h2>Focused contractor services for homes, businesses and managed properties.</h2>
        </div>
        <ServiceCards />
        <div className="mini-service-row">
          {additionalServices.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
      </section>

      <CommitmentsSection />
      <section className="section split-section">
        <div>
          <p className="eyebrow">Why Choose PRX Projects</p>
          <h2>Professional service, practical advice and quote requests that are easy to start.</h2>
        </div>
        <ul className="check-list">
          {whyChoose.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <ProcessSection />
      <ServiceAreaSection />
      <GallerySection />
      <ReviewsSection />
      <CTASection />
      <FAQSection />
    </>
  );
}
