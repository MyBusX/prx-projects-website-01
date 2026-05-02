import React from "react";
import { processSteps } from "../config/siteData.js";

export default function ProcessSection() {
  return (
    <section className="section muted-section">
      <div className="section-heading">
        <p className="eyebrow">Our Process</p>
        <h2>Simple, clear and focused on getting your project moving.</h2>
      </div>
      <div className="process-grid">
        {processSteps.map((step, index) => (
          <article key={step.title}>
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
