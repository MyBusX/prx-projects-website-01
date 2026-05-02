import React from "react";
import { serviceAreas } from "../config/siteData.js";

export default function ServiceAreaSection() {
  return (
    <section className="section service-area-section">
      <div>
        <p className="eyebrow">Local Gauteng Contractor</p>
        <h2>Renovation and construction services for Pretoria, Pretoria East and surrounding Gauteng areas.</h2>
      </div>
      <div>
        <p>
          PRX Projects helps homeowners, property managers and businesses plan practical scopes, compare quote options
          and move projects from first conversation to finished work.
        </p>
        <div className="area-list" aria-label="Service areas">
          {serviceAreas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
