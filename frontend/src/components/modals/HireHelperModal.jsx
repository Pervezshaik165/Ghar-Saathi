import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { FormInput, FormSelect, FormTextarea } from "../common/FormInputs";
import { SERVICES } from "../../constants/data";
import { apiUrl } from "../../api/config";
import { useToast } from "../common/Toast";

export const HireHelperModal = ({ isOpen, onClose, initialServiceId }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    serviceType: initialServiceId || "",
    feeRange: "",
    address: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = SERVICES.map((service) => ({
    value: service.id,
    label: service.name,
  }));

  const feeOptions = [
    { value: "<500", label: "Under ₹500" },
    { value: "500-999", label: "₹500 - ₹999" },
    { value: "1000-1499", label: "₹1000 - ₹1499" },
    { value: "1500-1999", label: "₹1500 - ₹1999" },
    { value: "2000+", label: "₹2000+" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, "")))
      newErrors.phoneNumber = "Phone number must be 10 digits";
    if (!formData.serviceType) newErrors.serviceType = "Please select a service";
    if (!formData.feeRange) newErrors.feeRange = "Please select a fee range";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  React.useEffect(() => {
    if (initialServiceId) {
      setFormData((prev) => ({ ...prev, serviceType: initialServiceId }));
    }
  }, [initialServiceId, isOpen]);
  const showToast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      if (showToast) showToast({ type: "error", message: "Please fix the highlighted errors" });
      return;
    }

    setSubmitted(true);
    try {
      const selectedService = SERVICES.find((s) => String(s.id) === String(formData.serviceType));
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        service: selectedService ? selectedService.name : formData.serviceType,
        address: formData.address,
        notes: `${formData.additionalInfo || ""}${formData.feeRange ? `\nFee: ${formData.feeRange}` : ""}`,
      };

      const res = await fetch(apiUrl('/api/forms/hire'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error((data && data.message) || "Failed to submit request");
      }

      if (showToast) showToast({ type: "success", title: "Request submitted", message: "We'll contact you shortly to confirm." });

      // Reset form after 2 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          serviceType: "",
          feeRange: "",
          address: "",
          additionalInfo: "",
        });
        onClose();
      }, 2000);
    } catch (err) {
      setSubmitted(false);
      if (showToast) showToast({ type: "error", title: "Submission failed", message: err.message || "Failed to submit" });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Hire a Helper" size="lg">
      {submitted ? (
        <div className="py-12 text-center">
          <div className="text-6xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Request Submitted!
          </h3>
          <p className="text-gray-600">
            We'll contact you shortly to confirm your helper booking.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            error={errors.fullName}
            required
          />

          <FormInput
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            error={errors.email}
            required
          />

          <FormInput
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="10-digit phone number"
            error={errors.phoneNumber}
            required
          />

          <FormSelect
            label="Service Required"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            options={serviceOptions}
            error={errors.serviceType}
            required
            placeholder="Select the service you need"
          />

          <FormSelect
            label="Offered Fee (per 6 hrs)"
            name="feeRange"
            value={formData.feeRange}
            onChange={handleChange}
            options={feeOptions}
            error={errors.feeRange}
            required
            placeholder="Select fee range"
          />

          <FormInput
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your full address"
            error={errors.address}
            required
          />

          <FormTextarea
            label="Additional Information"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Any specific requirements or preferences..."
            rows={4}
          />

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="ghost"
              fullWidth
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button variant="primary" fullWidth type="submit">
              Submit Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default HireHelperModal;
