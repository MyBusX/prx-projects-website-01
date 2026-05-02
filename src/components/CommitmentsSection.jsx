import React from "react";
import { commitments } from "../config/siteData.js";

export default function CommitmentsSection() {
  return (
    <section className="section commitments-section">
      <div className="section-heading">
        <p className="eyebrow">The PRX Standard</p>
        <h2>Built around safety, preparation, clean delivery and accountable communication.</h2>
      </div>
      <div className="commitment-grid">
        {commitments.map((commitment, index) => (
          <article key={commitment.title}>
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <h3>{commitment.title}</h3>
            <p>{commitment.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
