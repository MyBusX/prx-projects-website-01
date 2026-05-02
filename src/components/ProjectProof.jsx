import React from "react";
import { Link } from "react-router-dom";
import { whatsappUrl } from "../config/siteData.js";

export default function ProjectProof() {
  return (
    <section className="project-proof">
      <div className="proof-copy">
        <p className="eyebrow">Real Project Work</p>
        <h2>Proof clients can see before they ask for a quote.</h2>
        <p>
          A strong quote starts with trust. PRX Projects leads with visible workmanship, practical project planning and
          direct communication, so clients know what kind of team they are inviting onto site.
        </p>
        <div className="button-row">
          <a className="primary-button" href={whatsappUrl()} target="_blank" rel="noreferrer">
            WhatsApp Photos For A Quote
          </a>
          <Link className="secondary-button light" to="/quote-request">
            Send Project Details
          </Link>
        </div>
      </div>
      <div className="proof-images" aria-label="PRX Projects project photo preview">
        <img src="/images/kitchen-renovation.jpg" alt="Completed kitchen renovation" loading="lazy" />
        <img src="/images/commercial-aluminium.jpg" alt="Commercial exterior project" loading="lazy" />
        <img src="/images/building-renovation.jpg" alt="Commercial fit-out project" loading="lazy" />
      </div>
    </section>
  );
}
