import React from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";

export const ServiceDetailModal = ({ isOpen, onClose, service }) => {
  if (!service) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={service.name} size="md">
      <div className="space-y-6">
        {/* Service Icon and Name */}
        <div className="text-center">
          <div className="text-6xl mb-4">{service.icon}</div>
          <p className="text-gray-600 text-lg">{service.description}</p>
        </div>

        {/* Service Details */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg text-gray-900">What we provide:</h3>
          <ul className="space-y-3">
            {service.details.map((detail, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-[#469838] text-lg font-bold mt-1 flex-shrink-0">
                  ✓
                </span>
                <span className="text-gray-700 font-medium">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="pt-4 border-t border-gray-200">
          <Button
            variant="secondary"
            fullWidth
            size="md"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("open-hire-modal", { detail: { serviceId: service.id } })
              );
              onClose();
            }}
          >
            Get Started with {service.name}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceDetailModal;
