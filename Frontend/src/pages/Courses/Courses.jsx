// src/pages/Courses/Courses.jsx

import React from "react";

import { Helmet } from "react-helmet-async";

import { useTranslation } from "react-i18next";

import HeroImg from "../../assets/image.png";

const Courses = () => {
  // USING COURSES NAMESPACE
  const { t } = useTranslation("courses");

  return (
    <>
      <Helmet>
        <title>
          Defence Training Courses in Mumbai | Jai Hind Physical Academy
        </title>

        <meta
          name="description"
          content="Explore Army, NDA, Police, SSC and Physical Training courses at Jai Hind Physical Academy in Mumbai with expert guidance and practical preparation."
        />

        <meta
          name="keywords"
          content="Army coaching Mumbai, NDA coaching Mumbai, Police training Mumbai, SSC preparation Mumbai, Physical training academy Mumbai"
        />

        <link
          rel="canonical"
          href="https://jaihindphysicalacademy.com/courses"
        />

        {/* OPEN GRAPH */}

        <meta
          property="og:title"
          content="Defence Training Courses | Jai Hind Physical Academy"
        />

        <meta
          property="og:description"
          content="Explore Army, NDA, Police and Physical Training programs at Jai Hind Physical Academy."
        />

        <meta
          property="og:url"
          content="https://jaihindphysicalacademy.com/courses"
        />

        <meta
          property="og:image"
          content="https://jaihindphysicalacademy.com/logo.jpg"
        />
      </Helmet>

      <div className="min-h-screen bg-[#050509] text-gray-100 flex flex-col text-justify">
        {/* HERO SECTION */}

        <section className="relative w-full h-56 md:h-64 lg:h-72 overflow-hidden">
          <img
            src={HeroImg}
            alt={t("heroImgAlt")}
            className="w-full h-full object-cover object-top"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/85" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-5xl mx-auto px-4">
              <p className="text-[11px] md:text-xs tracking-[0.32em] uppercase text-yellow-400 mb-2">
                {t("heroTag")}
              </p>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                {t("heroTitleMain")}{" "}
                <span className="text-yellow-400">
                  {t("heroTitleHighlight")}
                </span>
              </h1>

              <p className="mt-3 text-xs md:text-sm text-gray-200 max-w-2xl">
                {t("heroText")}
              </p>
            </div>
          </div>
        </section>

        {/* MAIN SECTION */}

        <main className="flex-1 bg-white text-gray-900">
          <section className="relative py-16 md:py-20">
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_top,_#fef3c7_0,_transparent_55%),radial-gradient(circle_at_bottom,_#dbeafe_0,_transparent_55%)]" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8 space-y-16">
              {/* TOP GRID */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {/* POLICE */}

                <div className="group relative rounded-3xl bg-white/80 border border-yellow-200/50 p-8 md:p-10 shadow-xl backdrop-blur-xl hover:shadow-2xl hover:shadow-yellow-200/50 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/80 to-yellow-100/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                      {t("police.title")}
                    </h2>

                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      {t("police.desc")}
                    </p>

                    {/* GUIDANCE */}

                    <div className="space-y-4 pt-4 border-t border-yellow-200">
                      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center">
                        <span className="inline-block w-1.5 h-5 rounded-full bg-yellow-400 mr-2" />

                        {t("police.guidanceTitle")}
                      </h3>

                      <ul className="space-y-3 text-sm text-gray-700">
                        {[1, 2, 3, 4].map((num) => (
                          <li key={num} className="flex items-start space-x-3">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-yellow-400/70 flex-shrink-0" />

                            <span>{t(`police.guidance${num}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* GROUND */}

                    <div className="space-y-4 pt-4 border-t border-yellow-200">
                      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center">
                        <span className="inline-block w-1.5 h-5 rounded-full bg-yellow-400 mr-2" />

                        {t("police.groundTitle")}
                      </h3>

                      <ul className="space-y-3 text-sm text-gray-700">
                        {[1, 2, 3, 4].map((num) => (
                          <li key={num} className="flex items-start space-x-3">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-yellow-400/70 flex-shrink-0" />

                            <span>{t(`police.ground${num}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-sm font-semibold text-gray-900 bg-yellow-50 px-5 py-4 rounded-2xl border-2 border-yellow-200">
                      {t("police.ideal")}
                    </p>
                  </div>
                </div>

                {/* ARMY */}

                <div className="group relative rounded-3xl bg-white/80 border border-green-200/50 p-8 md:p-10 shadow-xl backdrop-blur-xl hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 to-green-100/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                      {t("army.title")}
                    </h2>

                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      {t("army.desc")}
                    </p>

                    {/* GUIDANCE */}

                    <div className="space-y-4 pt-4 border-t border-green-200">
                      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center">
                        <span className="inline-block w-1.5 h-5 rounded-full bg-green-500 mr-2" />

                        {t("army.guidanceTitle")}
                      </h3>

                      <ul className="space-y-3 text-sm text-gray-700">
                        {[1, 2, 3, 4].map((num) => (
                          <li key={num} className="flex items-start space-x-3">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-green-500/70 flex-shrink-0" />

                            <span>{t(`army.guidance${num}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* GROUND */}

                    <div className="space-y-4 pt-4 border-t border-green-200">
                      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center">
                        <span className="inline-block w-1.5 h-5 rounded-full bg-green-500 mr-2" />

                        {t("army.groundTitle")}
                      </h3>

                      <ul className="space-y-3 text-sm text-gray-700">
                        {[1, 2, 3, 4].map((num) => (
                          <li key={num} className="flex items-start space-x-3">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-green-500/70 flex-shrink-0" />

                            <span>{t(`army.ground${num}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-sm font-semibold text-gray-900 bg-green-50 px-5 py-4 rounded-2xl border-2 border-green-200">
                      {t("army.ideal")}
                    </p>
                  </div>
                </div>
              </div>

              {/* BOTTOM GRID */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {/* SSC */}

                <div className="group relative rounded-3xl bg-white/80 border border-blue-200/50 p-8 md:p-10 shadow-xl backdrop-blur-xl hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-blue-100/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                      {t("ssc.title")}
                    </h2>

                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      {t("ssc.desc")}
                    </p>
                  </div>
                </div>

                {/* PHYSICAL */}

                <div className="group relative rounded-3xl bg-white/80 border border-red-200/50 p-8 md:p-10 shadow-xl backdrop-blur-xl hover:shadow-2xl hover:shadow-red-200/50 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50/80 to-red-100/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                      {t("physical.title")}
                    </h2>

                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      {t("physical.desc")}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}

              <div className="text-center pt-8">
                <div className="max-w-2xl mx-auto">
                  <p className="text-base lg:text-lg text-gray-700 mb-10 px-6 leading-relaxed">
                    {t("cta.text")}
                  </p>

                  <a
                    href="/enquiry"
                    className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold bg-yellow-400 text-gray-900 rounded-2xl shadow-lg hover:bg-yellow-500 active:scale-[0.98] transition-all duration-300"
                  >
                    {t("cta.button")}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Courses;
