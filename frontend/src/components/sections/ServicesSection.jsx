import React, { useState } from "react";
import { SERVICES } from "../../constants/data";
import ServiceDetailModal from "../modals/ServiceDetailModal";

export const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Professional and trusted domestic helpers for every household need.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-2 group"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedService(service);
                  }
                }}
                aria-label={`Learn more about ${service.name}`}
              >
                <div className="text-5xl sm:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
                  {service.description}
                </p>
                <div className="mt-4 text-[#08478B] font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  Learn more →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </>
  );
};

export default ServicesSection;
