import React from "react";
import { NavLink, Link } from "react-router-dom";
import { business, services, whatsappUrl } from "../config/siteData.js";

export default function Header() {
  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <img className="brand-logo" src="/images/prx-projects-logo.jpg" alt={`${business.name} logo`} />
        <span>
          <strong>{business.name}</strong>
          <small>{business.tagline}</small>
        </span>
      </Link>

      <nav className="nav-links" aria-label="Primary navigation">
        <NavLink to="/">Home</NavLink>
        <div className="nav-dropdown">
          <button type="button">Services</button>
          <div className="dropdown-menu">
            {services.map((service) => (
              <NavLink key={service.slug} to={`/services/${service.slug}`}>
                {service.title}
              </NavLink>
            ))}
          </div>
        </div>
        <NavLink to="/quote-request">Quote Request</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <div className="header-actions">
        <a className="whatsapp-link" href={whatsappUrl()} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <Link className="quote-link" to="/quote-request">
          Request Quote
        </Link>
      </div>
    </header>
  );
}
