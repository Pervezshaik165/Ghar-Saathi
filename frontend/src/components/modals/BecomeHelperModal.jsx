import React, { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { FormInput, FormSelect } from "../common/FormInputs";
import { SERVICES } from "../../constants/data";
import { apiUrl } from "../../api/config";
import { useToast } from "../common/Toast";

export const BecomeHelperModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    skillType: "",
    expectedFeeRange: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const showToast = useToast();

  const skillOptions = SERVICES.map((service) => ({
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
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, "")))
      newErrors.phoneNumber = "Phone number must be 10 digits";
    if (!formData.skillType) newErrors.skillType = "Please select a service";
    if (!formData.expectedFeeRange) newErrors.expectedFeeRange = "Please select expected fee range";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      try {
        const selectedSkill = SERVICES.find((s) => String(s.id) === String(formData.skillType));
        const payload = {
          name: formData.fullName,
          phone: formData.phoneNumber,
          skills: selectedSkill ? selectedSkill.name : formData.skillType,
          expectedFeeRange: formData.expectedFeeRange,
          experience: "",
          portfolio: "",
          address: "",
        };

        // Attempt to POST to backend; if backend not available this will fail silently to the user via toast
        fetch(apiUrl('/api/forms/become-helper'), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to submit application");
            if (showToast) showToast({ type: "success", title: "Application submitted", message: "We'll review your profile and contact you." });
          })
          .catch((err) => {
            if (showToast) showToast({ type: "error", title: "Submission failed", message: err.message || "Failed to submit" });
          });

      } finally {
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            fullName: "",
            phoneNumber: "",
            skillType: "",
            expectedFeeRange: "",
          });
          onClose();
        }, 2000);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Become a Helper with Gharsaathi"
      size="lg"
    >
      {submitted ? (
        <div className="py-12 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Application Submitted!
          </h3>
          <p className="text-gray-600">
            Thank you for applying! We'll review your profile and contact you
            within 24-48 hours.
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
            label="Service Offered"
            name="skillType"
            value={formData.skillType}
            onChange={handleChange}
            options={skillOptions}
            error={errors.skillType}
            required
            placeholder="Select the service you offer"
          />

          <FormSelect
            label="Expected Fee (per 6 hrs)"
            name="expectedFeeRange"
            value={formData.expectedFeeRange}
            onChange={handleChange}
            options={feeOptions}
            error={errors.expectedFeeRange}
            required
            placeholder="Select expected fee range"
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
            <Button variant="secondary" fullWidth type="submit">
              Submit Application
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default BecomeHelperModal;
