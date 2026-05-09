import React from "react";
import { CONTACT_INFO } from "../../constants/data";

export const ContactSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#08478B] to-[#469838] text-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Need a Trusted Helper?
          </h2>
          <p className="text-base sm:text-lg opacity-95">
            Contact Gharsaathi Domestic Service today.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Phone */}
          <div className="bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
              📞
            </div>
            <h3 className="font-bold text-base sm:text-lg mb-2">Phone</h3>
            <p className="text-sm sm:text-base opacity-90">
              <a href={`tel:${CONTACT_INFO.phone}`} className="hover:underline">
                {CONTACT_INFO.phone}
              </a>
            </p>
          </div>

          {/* Email */}
          <div className="bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
              ✉️
            </div>
            <h3 className="font-bold text-base sm:text-lg mb-2">Email</h3>
            <p className="text-sm sm:text-base opacity-90">
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline">
                {CONTACT_INFO.email}
              </a>
            </p>
          </div>

          {/* Address */}
          <div className="bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
              📍
            </div>
            <h3 className="font-bold text-base sm:text-lg mb-2">Address</h3>
            <p className="text-sm sm:text-base opacity-90">
              {CONTACT_INFO.address}
            </p>
          </div>

          {/* Website */}
          <div className="bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
              🌐
            </div>
            <h3 className="font-bold text-base sm:text-lg mb-2">Website</h3>
            <p className="text-sm sm:text-base opacity-90">
              <a href="#" className="hover:underline">
                {CONTACT_INFO.website}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
