import React from "react";
import { reviews } from "../config/siteData.js";

export default function ReviewsSection() {
  return (
    <section className="section muted-section">
      <div className="section-heading">
        <p className="eyebrow">Client Reviews</p>
        <h2>Trusted by homeowners and property teams across Gauteng.</h2>
      </div>
      <div className="review-grid">
        {reviews.map((review) => (
          <article key={review.name}>
            <p>"{review.text}"</p>
            <strong>{review.name}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
