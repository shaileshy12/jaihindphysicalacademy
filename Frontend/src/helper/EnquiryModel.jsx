import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import API from "../services/api.js";

const stationGroups = {
  western: [
    "Churchgate", "Marine Lines", "Charni Road", "Grant Road", "Mumbai Central",
    "Mahalaxmi", "Lower Parel", "Prabhadevi", "Dadar", "Matunga Road",
    "Mahim Junction", "Bandra", "Khar Road", "Santacruz", "Vile Parle",
    "Andheri", "Jogeshwari", "Ram Mandir", "Goregaon", "Malad",
    "Kandivali", "Borivali", "Dahisar", "Mira Road", "Bhayandar",
    "Naigaon", "Vasai Road", "Nalasopara", "Virar"
  ],
  central: [
    "Chhatrapati Shivaji Maharaj Terminus", "Masjid", "Sandhurst Road", "Byculla",
    "Chinchpokli", "Currey Road", "Parel", "Dadar", "Matunga", "Sion",
    "Kurla", "Vidyavihar", "Ghatkopar", "Vikhroli", "Kanjurmarg",
    "Bhandup", "Nahur", "Mulund", "Thane", "Kalwa", "Mumbra",
    "Diva", "Kopar", "Dombivli", "Thakurli", "Kalyan", "Shahad",
    "Ambivli", "Titwala", "Khadavli", "Badlapur"
  ],
  harbour: [
    "Chhatrapati Shivaji Maharaj Terminus", "Masjid", "Sandhurst Road",
    "Dockyard Road", "Reay Road", "Cotton Green", "Sewri", "Wadala Road",
    "Guru Tegh Bahadur Nagar", "Chunabhatti", "Kurla", "Tilak Nagar",
    "Chembur", "Govandi", "Mankhurd", "Vashi", "Sanpada", "Juinagar",
    "Nerul", "Seawoods-Darave", "Belapur CBD", "Kharghar", "Mansarovar",
    "Khandeshwar", "Panvel"
  ],
  transharbour: [
    "Thane", "Airoli", "Rabale", "Ghansoli", "Koparkhairne", "Turbhe",
    "Juinagar", "Sanpada", "Vashi", "Mankhurd", "Nerul", "Seawoods-Darave",
    "Belapur CBD", "Kharghar", "Mansarovar", "Khandeshwar", "Panvel"
  ]
};

const EnquiryModal = ({ isLoggedIn = false }) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    email: "",
    preferredCourse: "",
    status: "pending",
    age: "",
    location: "",
    education: "",
  });

  useEffect(() => {
    if (isLoggedIn) return;
    try {
      setOpen(true);
    } catch {
      setOpen(true);
    }
  }, [isLoggedIn]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !formData.name.trim() ||
      !formData.mobileNo.trim() ||
      !formData.email.trim() ||
      !formData.preferredCourse.trim()
    ) {
      toast.error("Full name, email, phone, and course are required");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        fullName: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.mobileNo.trim(),
        course: formData.preferredCourse.trim(),
        location: formData.location.trim() || "",
        message: `Age: ${formData.age || "N/A"}, Education: ${
          formData.education || "N/A"
        }`,
      };

      const res = await API.post(
        "/api/v1/user/enquiry",
        payload
      );

      if (res.data.success) {
        toast.success(
          "Enquiry submitted successfully! We will contact you within 24 hours."
        );
        setOpen(false);
        setFormData({
          name: "",
          mobileNo: "",
          email: "",
          preferredCourse: "",
          status: "pending",
          age: "",
          location: "",
          education: "",
        });
      }
    } catch (error) {
      console.error("Enquiry error:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-[92%] max-w-xl rounded-2xl bg-white/95 shadow-2xl border border-gray-200 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-gradient-to-r from-[#556b2f] to-[#7f9f3f] text-white sticky top-0 z-10">
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 text-lg leading-none transition-colors"
            aria-label="Close enquiry form"
            disabled={isSubmitting}
          >
            ×
          </button>
          <p className="text-[10px] md:text-xs font-medium tracking-[0.18em] uppercase opacity-90 text-center flex-1">
            Quick Admission Enquiry
          </p>
          <span className="w-7 h-7" />
        </div>

        {/* Body */}
        <div className="bg-[#556b2f] text-white px-4 py-6 md:px-8 md:py-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-2">
            Enquiry For Admission
          </h2>
          <p className="text-center mb-5 text-xs md:text-sm text-yellow-100">
            Thank you for your interest in joining Prahar Career Academy.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3.5">

            {/* Full Name */}
            <div>
              <label className="block text-[11px] mb-1 text-yellow-100">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-transparent px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-[11px] mb-1 text-yellow-100">
                Mobile Number * (WhatsApp)
              </label>
              <input
                type="tel"
                placeholder="9876543210"
                className="w-full rounded-lg border border-transparent px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm"
                value={formData.mobileNo}
                onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] mb-1 text-yellow-100">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-lg border border-transparent px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Course + Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] mb-1 text-yellow-100">
                  Preferred Course *
                </label>
                <select
                  className="w-full rounded-lg border border-transparent px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white cursor-pointer"
                  value={formData.preferredCourse}
                  onChange={(e) => handleInputChange("preferredCourse", e.target.value)}
                  required
                  disabled={isSubmitting}
                >
                  <option value="" disabled>Select course</option>
                  <option value="PBCT">Police Bharti</option>
                  <option value="ABCT">Army Bharti</option>
                  <option value="SSCGD">BSF</option>
                  <option value="PT">ITBP</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] mb-1 text-yellow-100">
                  Age
                </label>
                <input
                  type="number"
                  placeholder="Your age"
                  min="16"
                  max="40"
                  className="w-full rounded-lg border border-transparent px-3 py-2.5 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Education */}
            <div>
              <label className="block text-[11px] mb-1 text-yellow-100">
                Education
              </label>
              <select
                className="w-full rounded-lg border border-transparent px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white cursor-pointer"
                value={formData.education}
                onChange={(e) => handleInputChange("education", e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">10th / 12th / Graduation etc.</option>
                <option value="10th Pass">10th Pass</option>
                <option value="12th Pass">12th Pass</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
              </select>
            </div>

            {/* ✅ LOCATION — Railway Station Dropdown */}
            <div>
              <label className="block text-[11px] mb-1 text-yellow-100">
                Location / City
              </label>
              <select
                className="w-full rounded-lg border border-transparent px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white appearance-none cursor-pointer"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">Your city or nearest Prahar branch</option>

                <optgroup label="🟡 Western Line">
                  {stationGroups.western.map((s) => (
                    <option key={`w-${s}`} value={s}>{s}</option>
                  ))}
                </optgroup>

                <optgroup label="🔵 Central Line">
                  {stationGroups.central.map((s) => (
                    <option key={`c-${s}`} value={s}>{s}</option>
                  ))}
                </optgroup>

                <optgroup label="🟢 Harbour Line">
                  {stationGroups.harbour.map((s) => (
                    <option key={`h-${s}`} value={s}>{s}</option>
                  ))}
                </optgroup>

                <optgroup label="🟠 Trans Harbour Line">
                  {stationGroups.transharbour.map((s) => (
                    <option key={`th-${s}`} value={s}>{s}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 w-full bg-gradient-to-r from-[#f6b800] to-[#facc15] text-black font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? "Submitting..." : "Submit Enquiry"}
            </button>

            <p className="mt-3 text-[11px] text-center text-yellow-100/80">
              Our team will contact you within 24 hours with next steps for your
              defense career.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;