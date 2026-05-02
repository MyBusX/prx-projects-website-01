import React from "react";
import { services } from "../config/siteData.js";

export default function QuoteForm({ defaultService = "" }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submission = Object.fromEntries(formData.entries());

    // Connect a real form service here later, such as Formspree, Netlify Forms,
    // a CRM endpoint, or the PRX Projects backend API.
    console.log("PRX Projects quote request:", submission);

    event.currentTarget.reset();
    event.currentTarget.querySelector("[data-form-status]").textContent =
      "Thank you. Your quote request has been prepared and logged for connection to a form service.";
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        <span>Phone</span>
        <input name="phone" autoComplete="tel" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        <span>Area</span>
        <input name="area" placeholder="Shere, Pretoria East, Centurion..." required />
      </label>
      <label>
        <span>Service needed</span>
        <select name="serviceNeeded" defaultValue={defaultService || services[0].title}>
          {services.map((service) => (
            <option key={service.slug}>{service.title}</option>
          ))}
          <option>Site Management</option>
          <option>Compliance and Safety</option>
        </select>
      </label>
      <label>
        <span>Urgency</span>
        <select name="urgency">
          <option>This week</option>
          <option>Within 2 weeks</option>
          <option>This month</option>
          <option>Planning ahead</option>
        </select>
      </label>
      <label>
        <span>Preferred contact method</span>
        <select name="preferredContactMethod">
          <option>WhatsApp</option>
          <option>Phone call</option>
          <option>Email</option>
        </select>
      </label>
      <label className="full-span">
        <span>Job description</span>
        <textarea
          name="jobDescription"
          rows="5"
          placeholder="Tell us what needs to be renovated, built, waterproofed, tiled, repaired or painted."
          required
        />
      </label>
      <button className="primary-button full-span" type="submit">
        Submit Quote Request
      </button>
      <p className="form-status full-span" data-form-status role="status" />
    </form>
  );
}
