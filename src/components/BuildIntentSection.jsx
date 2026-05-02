import React from "react";
import { Link } from "react-router-dom";
import { buildIntents } from "../config/siteData.js";

export default function BuildIntentSection() {
  return (
    <section className="intent-section">
      <div className="section-heading">
        <p className="eyebrow">Start With The Goal</p>
        <h2>What do you want to build, repair or improve?</h2>
      </div>
      <div className="intent-grid">
        {buildIntents.map((intent) => (
          <Link className="intent-card" key={intent.title} to={intent.link}>
            <img src={intent.image} alt={`${intent.title} with PRX Projects`} loading="lazy" />
            <span>Explore</span>
            <div>
              <h3>{intent.title}</h3>
              <p>{intent.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
