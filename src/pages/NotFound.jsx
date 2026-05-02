import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div>
        <p className="eyebrow">Page Not Found</p>
        <h1>This page is not available.</h1>
        <p>Return to PRX Projects home or request a quote for your project.</p>
        <div className="button-row">
          <Link className="primary-button" to="/">
            Home
          </Link>
          <Link className="secondary-button light" to="/quote-request">
            Quote Request
          </Link>
        </div>
      </div>
    </section>
  );
}
