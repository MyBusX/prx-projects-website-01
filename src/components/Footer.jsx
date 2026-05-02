import React from "react";
import { Link } from "react-router-dom";
import { business, services, whatsappUrl } from "../config/siteData.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="footer-brand" to="/">
          <img src="/images/prx-projects-logo.jpg" alt={`${business.name} logo`} />
        </Link>
        <p>{business.positioning}</p>
        <p>{business.location}</p>
      </div>

      <div>
        <h2>Services</h2>
        {services.slice(0, 6).map((service) => (
          <Link key={service.slug} to={`/services/${service.slug}`}>
            {service.title}
          </Link>
        ))}
      </div>

      <div>
        <h2>Contact</h2>
        <a href={`tel:${business.phone}`}>{business.phone}</a>
        <a href={`mailto:${business.email}`}>{business.email}</a>
        <a href={whatsappUrl()} target="_blank" rel="noreferrer">
          WhatsApp PRX Projects
        </a>
      </div>
    </footer>
  );
}
