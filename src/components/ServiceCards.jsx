import React from "react";
import { Link } from "react-router-dom";
import { services } from "../config/siteData.js";

export default function ServiceCards() {
  return (
    <div className="service-grid">
      {services.map((service) => (
        <article className="service-card" key={service.slug}>
          <img src={service.image} alt={`${service.title} by PRX Projects`} loading="lazy" />
          <div>
            <span className="service-chip">{service.keyword}</span>
            <h3>{service.title}</h3>
            <p>{service.shortDescription}</p>
            <Link to={`/services/${service.slug}`}>View service</Link>
          </div>
        </article>
      ))}
    </div>
  );
}
