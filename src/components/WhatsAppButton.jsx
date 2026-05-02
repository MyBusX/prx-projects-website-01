import React from "react";
import { whatsappUrl } from "../config/siteData.js";

export default function WhatsAppButton({ message }) {
  return (
    <a className="floating-whatsapp" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
      WhatsApp
    </a>
  );
}
