import React from "react";
import Button from "../common/Button";
import HireHelperModal from "../modals/HireHelperModal";
import BecomeHelperModal from "../modals/BecomeHelperModal";
import { SERVICES } from "../../constants/data";
import { apiUrl } from "../../api/config";
import { useToast } from "../common/Toast";

export const HeroSection = () => {
  const [showHireModal, setShowHireModal] = React.useState(false);
  const [showBecomeModal, setShowBecomeModal] = React.useState(false);
  const [hireInitialServiceId, setHireInitialServiceId] = React.useState(null);

  const [quickInquiry, setQuickInquiry] = React.useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [qiStatus, setQiStatus] = React.useState({
    loading: false,
    success: null,
    error: null,
  });

  const showToast = useToast();

  React.useEffect(() => {
    const handler = (e) => {
      const serviceId = e?.detail?.serviceId ?? null;
      setHireInitialServiceId(serviceId);
      setShowHireModal(true);
    };
    window.addEventListener("open-hire-modal", handler);
    return () => window.removeEventListener("open-hire-modal", handler);
  }, []);

  const handleQiChange = (e) => {
    const { name, value } = e.target;
    setQuickInquiry((prev) => ({ ...prev, [name]: value }));
  };

  const submitQuickInquiry = async (e) => {
    e.preventDefault();
    setQiStatus({ loading: true, success: null, error: null });
    if (!quickInquiry.name.trim() || !quickInquiry.message.trim()) {
      setQiStatus({ loading: false, success: null, error: "Please enter name and query" });
      if (showToast) showToast({ type: "error", message: "Please enter name and query" });
      return;
    }
    try {
      const body = {
        name: quickInquiry.name,
        email: quickInquiry.email,
        phone: quickInquiry.phone,
        message:
          quickInquiry.message + (quickInquiry.service ? `\nService: ${quickInquiry.service}` : ""),
      };

      const res = await fetch(apiUrl('/api/forms/quick-inquiry'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error((data && data.message) || "Failed to submit");
      }

      setQiStatus({ loading: false, success: "Inquiry submitted successfully", error: null });
      setQuickInquiry({ name: "", email: "", phone: "", service: "", message: "" });
      if (showToast) showToast({ type: "success", title: "Inquiry submitted", message: "We will contact you shortly." });
    } catch (err) {
      setQiStatus({ loading: false, success: null, error: err.message || "Error submitting" });
      if (showToast) showToast({ type: "error", title: "Submission failed", message: err.message || "Error submitting" });
    }
  };

  return (
    <>
      <section className="bg-gradient-to-r from-[#08478B] to-[#469838] text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left Content */}
          <div className="space-y-6 order-2 md:order-1 max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Trusted Domestic Helpers for Your Home
            </h1>
            <p className="text-base sm:text-lg leading-relaxed opacity-95">
              Gharsaathi Domestic Service provides trained maids, cooks,
              babysitters, elder care helpers, and live-in domestic staff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="ghost"
                size="md"
                fullWidth={false}
                onClick={() => {
                  setHireInitialServiceId(null);
                  setShowHireModal(true);
                }}
                className="bg-white text-[#08478B] border-0 hover:bg-gray-100"
              >
                Hire a Helper
              </Button>
              <Button
                variant="outline"
                size="md"
                fullWidth={false}
                onClick={() => setShowBecomeModal(true)}
                className="border-white text-white hover:bg-white hover:text-[#08478B]"
              >
                Become a Helper
              </Button>
            </div>
          </div>

          {/* Right - Quick Inquiry Form */}
          <div id="inquiry" className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-gray-800 order-1 md:order-2 md:w-[440px] mx-auto md:mx-0">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Quick Inquiry</h2>
            <form className="space-y-4" onSubmit={submitQuickInquiry}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={quickInquiry.name}
                onChange={handleQiChange}
                className="w-full p-3 sm:p-4 rounded-xl border-2 border-gray-200 focus:border-[#08478B] focus:outline-none transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Email (optional)"
                value={quickInquiry.email}
                onChange={handleQiChange}
                className="w-full p-3 sm:p-4 rounded-xl border-2 border-gray-200 focus:border-[#08478B] focus:outline-none transition-colors"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={quickInquiry.phone}
                onChange={handleQiChange}
                className="w-full p-3 sm:p-4 rounded-xl border-2 border-gray-200 focus:border-[#08478B] focus:outline-none transition-colors"
              />
              <select
                name="service"
                value={quickInquiry.service}
                onChange={handleQiChange}
                className="w-full p-3 sm:p-4 rounded-xl border-2 border-gray-200 focus:border-[#08478B] focus:outline-none transition-colors"
              >
                <option value="">Select Service (optional)</option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              <textarea
                name="message"
                value={quickInquiry.message}
                onChange={handleQiChange}
                placeholder="Your query or details..."
                rows={4}
                className="w-full p-3 sm:p-4 rounded-xl border-2 border-gray-200 focus:border-[#08478B] focus:outline-none transition-colors"
              />
              {qiStatus.error && <div className="text-sm text-red-500">{qiStatus.error}</div>}
              {qiStatus.success && <div className="text-sm text-green-600">{qiStatus.success}</div>}
              <Button
                variant="secondary"
                size="md"
                fullWidth
                type="submit"
                disabled={qiStatus.loading}
              >
                {qiStatus.loading ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <HireHelperModal isOpen={showHireModal} onClose={() => setShowHireModal(false)} initialServiceId={hireInitialServiceId} />
      <BecomeHelperModal isOpen={showBecomeModal} onClose={() => setShowBecomeModal(false)} />
    </>
  );
};

export default HeroSection;
