import React from "react";
import { galleryItems } from "../config/siteData.js";

export default function GallerySection({ title = "Featured projects" }) {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">Project Work</p>
        <h2>{title}</h2>
      </div>
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <article key={item.title} className="gallery-card">
            <img src={item.image} alt={item.title} loading="lazy" />
            <div>
              <span>{item.service}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
