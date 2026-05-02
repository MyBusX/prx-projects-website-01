import React from "react";
import { Link } from "react-router-dom";
import { business, whatsappUrl } from "../config/siteData.js";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Pretoria and Gauteng contractor services</p>
        <h1>Build with a contractor who can take the project from idea to handover with ease.</h1>
        <p>{business.positioning}</p>
        <div className="button-row">
          <a className="primary-button" href={whatsappUrl()} target="_blank" rel="noreferrer">
            Get a WhatsApp Quote
          </a>
          <Link className="secondary-button" to="/quote-request">
            Request a Written Quote
          </Link>
        </div>
        <div className="hero-proof" aria-label="PRX Projects service highlights">
          <span>Renovations</span>
          <span>Waterproofing</span>
          <span>Fit-outs</span>
          <span>Finishes</span>
        </div>
      </div>
    </section>
  );
}
