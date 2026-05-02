import React from "react";
import { business } from "../config/siteData.js";

export default function StatsSection() {
  return (
    <section className="stats-section" aria-label="PRX Projects stats">
      {business.stats.map((stat) => (
        <article key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </article>
      ))}
    </section>
  );
}
