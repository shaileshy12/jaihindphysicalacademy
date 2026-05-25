// src/pages/Enquiry/Enquiry.jsx

import React, { useState } from "react";

import toast from "react-hot-toast";

import { useTranslation } from "react-i18next";

import API from "../../services/api";

import HeroImg from "../../assets/image.png";

// ================= AGE CALCULATOR =================

const calculateAge = (dob) => {
  if (!dob) return "";

  const birthDate = new Date(dob);

  if (Number.isNaN(birthDate.getTime())) return "";

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 0 ? String(age) : "";
};

const Enquiry = () => {
  // USING ENQUIRY NAMESPACE

  const { t } = useTranslation("enquiry");

  // ================= STATE =================

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    dob: "",
    age: "",
    caste: "",
    height: "",
    course: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // DOB AUTO AGE

    if (name === "dob") {
      setFormData((prev) => ({
        ...prev,

        dob: value,

        age: calculateAge(value),
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ================= REQUIRED VALIDATION =================

    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.course.trim()
    ) {
      toast.error("Please fill all required fields");

      return;
    }

    // ================= EMAIL VALIDATION =================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email");

      return;
    }

    // ================= PHONE VALIDATION =================

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");

      return;
    }

    setLoading(true);

    // ================= COMBINED MESSAGE =================

    const combinedMessage = `DOB: ${formData.dob || "N/A"},
Age: ${formData.age || "N/A"},
Caste: ${formData.caste || "N/A"},
Height: ${formData.height || "N/A"} |

Note:
${formData.message?.trim() || "None"}`;

    // ================= CLEAN PAYLOAD =================

    const payload = {
      fullName: formData.fullName?.trim(),

      phone: formData.phone?.trim(),

      email: formData.email?.trim().toLowerCase(),

      course: formData.course?.trim(),

      location: formData.location?.trim() || "",

      message: combinedMessage,
    };

    try {
      await API.post("/api/v1/user/enquiry", payload);

      setSubmitted(true);

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        dob: "",
        age: "",
        caste: "",
        height: "",
        course: "",
        location: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Enquiry submit error:", error);
      }

      toast.error(error.response?.data?.message || t("form.errorText"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050509] text-gray-100 text-justify">
      {/* HERO */}

      <section className="relative w-full h-52 md:h-64 lg:h-72 overflow-hidden">
        <img
          src={HeroImg}
          alt={t("heroImgAlt")}
          className="w-full h-full object-cover object-top"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/80" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl px-4 text-center">
            {/* HERO TAG */}

            <p className="text-[11px] md:text-xs tracking-[0.32em] uppercase text-yellow-400 mb-2">
              {t("heroTag")}
            </p>

            {/* HERO TITLE */}

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              {t("heroTitleMain")}{" "}
              <span className="text-yellow-400">{t("heroTitleHighlight")}</span>
            </h1>

            {/* HERO TEXT */}

            <p className="mt-3 text-xs md:text-sm text-gray-200">
              {t("heroText")}
            </p>
          </div>
        </div>
      </section>

      {/* MAIN */}

      <main className="flex-1 bg-white text-gray-900">
        <section className="relative py-12 md:py-16">
          <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_top,_#fef3c7_0,_transparent_60%),radial-gradient(circle_at_bottom,_#dbeafe_0,_transparent_60%)]" />

          <div className="relative max-w-5xl mx-auto px-4 space-y-8 md:space-y-10">
            {/* FORM BOX */}

            <div className="backdrop-blur-xl bg-white/95 border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8">
              {/* TITLE */}

              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                {t("form.title")}
              </h2>

              {/* SUBTITLE */}

              <p className="text-sm md:text-base text-gray-600 mb-6">
                {t("form.subtitle")}
              </p>

              {/* SUCCESS */}

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 border-2 border-green-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-semibold text-green-600 mb-3">
                    {t("form.successTitle")}
                  </h3>

                  <p className="text-lg text-gray-700">
                    {t("form.successText")}
                  </p>
                </div>
              ) : (
                // ================= FORM =================

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* FULL NAME */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("form.fullNameLabel")}
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder={t("form.fullNamePlaceholder")}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  {/* PHONE + EMAIL */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("form.mobileLabel")}
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder={t("form.mobilePlaceholder")}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("form.emailLabel")}
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t("form.emailPlaceholder")}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
                      />
                    </div>
                  </div>

                  {/* DOB + AGE */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("form.dobLabel")}
                      </label>

                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("form.ageLabel")}
                      </label>

                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        readOnly
                        placeholder={t("form.agePlaceholder")}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-gray-100"
                      />
                    </div>
                  </div>

                  {/* CASTE + HEIGHT */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("form.casteLabel")}
                      </label>

                      <input
                        type="text"
                        name="caste"
                        value={formData.caste}
                        onChange={handleChange}
                        placeholder={t("form.castePlaceholder")}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("form.heightLabel")}
                      </label>

                      <input
                        type="text"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        placeholder={t("form.heightPlaceholder")}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
                      />
                    </div>
                  </div>

                  {/* LOCATION */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("form.locationLabel")}
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder={t("form.locationPlaceholder")}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
                    />
                  </div>

                  {/* COURSE */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("form.courseLabel")}
                    </label>

                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white"
                    >
                      <option value="">{t("form.coursePlaceholder")}</option>

                      <option value="Police Recruitment">
                        {t("form.coursePolice")}
                      </option>

                      <option value="Army Recruitment">
                        {t("form.courseArmy")}
                      </option>

                      <option value="SSC">{t("form.courseSSC")}</option>

                      <option value="Physical Training">
                        {t("form.coursePhysical")}
                      </option>
                    </select>
                  </div>

                  {/* MESSAGE */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("form.messageLabel")}
                    </label>

                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("form.messagePlaceholder")}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm resize-none"
                    />
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold py-4 px-6 rounded-xl shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-3 inline-block" />

                        {t("form.submitting")}
                      </>
                    ) : (
                      t("form.submitButton")
                    )}
                  </button>
                </form>
              )}

              {/* DISCLAIMER */}

              <p className="mt-6 text-xs text-gray-500 text-center">
                {t("form.disclaimer")}
              </p>
            </div>

            {/* WHY + OFFICE */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* WHY CHOOSE */}

              <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                  {t("why.title")}
                </h3>

                <ul className="space-y-2 text-sm text-gray-700">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <li key={num} className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0" />

                      {t(`why.l${num}`)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* OFFICE */}

              <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg">
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                  {t("office.title")}
                </h4>

                <p className="text-sm text-gray-700 mb-3">
                  {t("office.address")}
                </p>

                <p className="text-sm">
                  <span className="font-semibold text-yellow-600">
                    {t("office.callLabel")}
                  </span>{" "}
                  {t("office.callValue")}
                </p>

                <p className="text-sm mt-1">
                  <span className="font-semibold text-yellow-600">
                    {t("office.emailLabel")}
                  </span>{" "}
                  <a
                    href={`mailto:${t("office.emailValue")}`}
                    className="text-yellow-600 hover:text-yellow-700 underline"
                  >
                    {t("office.emailValue")}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Enquiry;
