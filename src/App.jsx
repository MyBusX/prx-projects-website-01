import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SeoSchema from "./components/SeoSchema.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import Home from "./pages/Home.jsx";
import ServicePage from "./pages/ServicePage.jsx";
import QuoteRequest from "./pages/QuoteRequest.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import { services } from "./config/siteData.js";

export default function App() {
  return (
    <>
      <SeoSchema />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {services.map((service) => (
            <Route
              key={service.slug}
              path={`/services/${service.slug}`}
              element={<ServicePage service={service} />}
            />
          ))}
          <Route path="/quote-request" element={<QuoteRequest />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
