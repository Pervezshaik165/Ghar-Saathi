import React from "react";
import {
  HeroSection,
  ServicesSection,
  WhyChooseUsSection,
  TestimonialsSection,
  ContactSection,
  Footer,
} from "./components/sections";
import Navbar from "./components/common/Navbar";
import ToastProvider from "./components/common/Toast";
import "./App.css";

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-white">
        {/* Navigation/Header */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Why Choose Us Section */}
        <WhyChooseUsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default App;
