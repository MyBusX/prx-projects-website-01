import React from "react";
import { faqs } from "../config/siteData.js";

export default function FAQSection({ items = faqs }) {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">FAQ</p>
        <h2>Common questions before requesting a quote.</h2>
      </div>
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
