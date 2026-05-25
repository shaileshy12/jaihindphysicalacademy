// src/pages/ContactUs/ContactUs.jsx

import React from "react";

import { useTranslation }
from "react-i18next";

import HeroTraining1
from "../../assets/img3.jpeg";

import HeroTraining2
from "../../assets/army-image.jpg";

import HeroGroup
from "../../assets/ContactUs.jpeg";

const ContactUs = () => {

  // USING CONTACT NAMESPACE

  const { t } =
    useTranslation("contact");

  // ================= CONTACT CARDS =================

  const contactCards = [

    {
      key: "borivali",

      city: t(
        "branches.borivali.city"
      ),

      name: t(
        "branches.borivali.name"
      ),

      address: t(
        "branches.borivali.address"
      ),

      phone: t(
        "branches.borivali.phone"
      ),
    },

  ];

  return (

    <div className="min-h-screen bg-[#050509] text-gray-100 flex flex-col">

      {/* HERO SECTION */}

      <section className="relative w-full overflow-hidden bg-gradient-to-b from-black via-black/90 to-[#3e3e41]">

        <div className="max-w-6xl mx-auto px-4 pt-16 pb-10 md:pt-20 md:pb-14 grid grid-cols-1 lg:grid-cols-[1.1fr,1fr] gap-10 items-center">

          {/* LEFT CONTENT */}

          <div>

            {/* TAG */}

            <p className="text-[11px] md:text-xs tracking-[0.32em] uppercase text-yellow-400 mb-2">

              {t("heroTag")}

            </p>

            {/* TITLE */}

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3">

              {t("heroTitleMain")}

              {" "}

              <span className="text-yellow-400">

                {t("heroTitleHighlight")}

              </span>

            </h1>

            {/* TEXT */}

            <p className="text-xs md:text-sm text-gray-200 mb-4">

              {t("heroText1")}

            </p>

            <p className="text-xs md:text-sm text-gray-300">

              {t("heroText2")}

            </p>

          </div>

          {/* RIGHT IMAGES */}

          <div className="relative h-52 sm:h-64 md:h-72">

            {/* BIG IMAGE */}

            <div className="absolute right-0 top-4 w-56 sm:w-64 md:w-72 h-40 sm:h-44 md:h-52 rounded-2xl overflow-hidden border border-yellow-400/40 shadow-[0_18px_45px_rgba(0,0,0,0.7)]">

              <img
                src={HeroTraining1}
                alt={t("heroImgAltMain")}
                className="w-full h-full object-cover"
              />

            </div>

            {/* LEFT BOTTOM */}

            <div className="absolute left-0 bottom-4 w-32 sm:w-36 md:w-40 h-24 sm:h-28 md:h-32 rounded-2xl overflow-hidden border border-white/15 shadow-[0_14px_35px_rgba(0,0,0,0.8)]">

              <img
                src={HeroGroup}
                alt={t("heroImgAltGroup")}
                className="w-full h-full object-cover object-top"
              />

            </div>

            {/* TOP LEFT */}

            <div className="absolute left-10 top-0 w-28 sm:w-32 md:w-36 h-20 sm:h-24 md:h-28 rounded-2xl overflow-hidden border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.8)]">

              <img
                src={HeroTraining2}
                alt={t("heroImgAltSession")}
                className="w-full h-full object-cover"
              />

            </div>

          </div>

        </div>

      </section>

      {/* MAIN */}

      <main className="flex-1 bg-white text-gray-900">

        <section className="relative py-12 md:py-16">

          <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_top,_#fef3c7_0,_transparent_60%),radial-gradient(circle_at_bottom,_#dbeafe_0,_transparent_60%)]" />

          <div className="relative max-w-6xl mx-auto px-4">

            {/* TITLE */}

            <h2 className="text-center text-2xl md:text-3xl font-semibold mb-4 text-gray-900">

              {t("branchesTitle")}

            </h2>

            {/* SUBTITLE */}

            <p className="text-center text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-10">

              {t("branchesSubtitle")}

            </p>

            {/* BRANCHES */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8 text-sm max-w-2xl mx-auto">

              {contactCards.map(
                (b) => (

                  <div
                    key={b.key}
                    className="bg-white border border-gray-200 rounded-2xl px-6 py-6 shadow-md hover:shadow-xl transition-all duration-300"
                  >

                    {/* CITY */}

                    <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">

                      {b.city}

                    </h3>

                    {/* NAME */}

                    <p className="text-[13px] font-semibold text-gray-700 text-center mb-3 tracking-wide">

                      {b.name}

                    </p>

                    {/* ADDRESS */}

                    <p className="text-[13px] leading-relaxed text-gray-600 mb-4 text-center">

                      {b.address}

                    </p>

                    {/* PHONE */}

                    <p className="text-[15px] font-semibold text-yellow-600 text-center">

                      ☎ {b.phone}

                    </p>

                  </div>

                )
              )}

            </div>

            {/* FOOTER */}

            <p className="mt-10 text-xs md:text-sm text-center text-gray-600">

              {t("generalLine1")}

              {" "}

              <span className="text-yellow-600 font-medium">

                <a
                  href={`mailto:${t("email")}`}
                  className="hover:text-yellow-700 underline"
                >

                  {t("email")}

                </a>

              </span>

              {" "}

              {t("generalLine2")}

            </p>

          </div>

        </section>

      </main>

    </div>
  );
};

export default ContactUs;