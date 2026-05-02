import React, { useEffect } from "react";
import QuoteForm from "../components/QuoteForm.jsx";
import CTASection from "../components/CTASection.jsx";
import { seo } from "../config/siteData.js";
import { setPageMeta } from "../utils/seo.js";

export default function QuoteRequest() {
  useEffect(() => {
    setPageMeta(seo.quote.title, seo.quote.description);
  }, []);

  return (
    <>
      <section className="page-hero">
        <div>
          <p className="eyebrow">Quote Request</p>
          <h1>Request a contractor quote from PRX Projects.</h1>
          <p>
            Send your details for renovation, construction, waterproofing, tiling, carpentry, painting or finishing
            work in Pretoria and Gauteng.
          </p>
        </div>
      </section>
      <section className="section quote-panel-section">
        <QuoteForm />
      </section>
      <CTASection />
    </>
  );
}
