import React from "react";
import { Link } from "react-router-dom";
import { whatsappUrl } from "../config/siteData.js";

export default function CTASection({
  title = "Ready to price your project?",
  text = "Send PRX Projects your area, service needed and a short job description for a clear next step.",
  message,
}) {
  return (
    <section className="cta-section">
      <div>
        <p className="eyebrow">Get A Quote</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="button-row">
        <a className="primary-button" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
          WhatsApp Quote
        </a>
        <Link className="secondary-button light" to="/quote-request">
          Quote Request Form
        </Link>
      </div>
    </section>
  );
}
