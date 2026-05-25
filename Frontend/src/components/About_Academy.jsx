// src/components/About_Academy.jsx

import React from "react";

import { useTranslation } from "react-i18next";

import Img2 from "../assets/img2.jpeg";

const About_Academy = () => {

  // USING HOME NAMESPACE
  const { t, i18n } =
    useTranslation("home");

  return (

    <div
      key={i18n.language}
      className="w-full py-16 md:py-24 bg-gradient-to-b from-slate-50/50 to-white/50"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TITLE */}

        <div className="text-center mb-12 md:mb-20">

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">

            {t("aboutAcademy.title")}

            <br />

            {t("aboutAcademy.Training")}

          </h1>

        </div>

        {/* CONTENT */}

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 md:items-center">

          {/* TEXT */}

          <div className="order-2 md:order-1 space-y-6 max-w-none md:max-w-lg lg:max-w-xl">

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">

              {t("aboutAcademy.heading")}

            </h2>

            <div className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">

              <p className="text-justify mb-4">

                {t("aboutAcademy.p1")}

              </p>

              <p className="text-justify">

                {t("aboutAcademy.p2")}

              </p>

            </div>

          </div>

          {/* IMAGE */}

          <div className="order-1 md:order-2 flex justify-center md:justify-end">

            <div className="relative max-w-sm md:max-w-md">

              <img
                src={Img2}
                alt="Jai Hind Physical Academy"
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl lg:rounded-3xl shadow-xl md:shadow-2xl border-4 border-white"
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default About_Academy;