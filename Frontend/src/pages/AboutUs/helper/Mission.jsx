// src/pages/AboutUs/helper/Mission.jsx

import React from "react";

import { Helmet } from "react-helmet-async";

import { useTranslation } from "react-i18next";

const Mission = () => {
  // USING MISSION NAMESPACE
  const { t } = useTranslation("mission");

  // ================= MISSION POINTS =================

  const missionPoints = [
    {
      title: t("p1Title"),
      text: t("p1Text"),
      color: "teal",
    },

    {
      title: t("p2Title"),
      text: t("p2Text"),
      color: "orange",
    },

    {
      title: t("p3Title"),
      text: t("p3Text"),
      color: "teal",
    },
  ];

  // ================= HIGHLIGHTS =================

  const highlights = [t("trustL1"), t("trustL2"), t("trustL3"), t("trustL4")];

  return (
    <>
      <Helmet>
        <title>Our Mission | Jai Hind Physical Academy</title>

        <meta
          name="description"
          content="Discover the mission of Jai Hind Physical Academy in preparing students for Army, NDA, Navy, Air Force and Police careers through discipline, training and mentorship."
        />

        <meta
          name="keywords"
          content="Mission Jai Hind Physical Academy, NDA mission Mumbai, Defence academy mission, Army coaching Mumbai"
        />

        <link
          rel="canonical"
          href="https://jaihindphysicalacademy.com/mission"
        />

        {/* OPEN GRAPH */}

        <meta
          property="og:title"
          content="Our Mission | Jai Hind Physical Academy"
        />

        <meta
          property="og:description"
          content="Explore the mission and commitment of Jai Hind Physical Academy for defence aspirants."
        />

        <meta
          property="og:url"
          content="https://jaihindphysicalacademy.com/mission"
        />

        <meta
          property="og:image"
          content="https://jaihindphysicalacademy.com/logo.jpg"
        />
      </Helmet>

      <div className="min-h-screen bg-white text-gray-900 flex flex-col">
        {/* HERO SECTION */}

        <section className="relative overflow-hidden border-b border-teal-200/50 bg-gradient-to-b from-teal-900 via-teal-950/95 to-slate-900">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />

            <div className="absolute -bottom-40 left-[-10%] h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />

            <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_top,_#14b8a6_0,_transparent_55%),radial-gradient(circle_at_bottom,_#f59e0b_0,_transparent_55%)]" />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-14 md:pt-24 md:pb-18">
            {/* HERO TAG */}

            <p className="text-[11px] md:text-xs tracking-[0.32em] uppercase text-teal-300/90 mb-3">
              {t("heroTag")}
            </p>

            {/* HERO TITLE */}

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-4 text-white">
              {t("heroTitle1")}{" "}
              <span className="text-teal-400">{t("heroTitle2")}</span>{" "}
              {t("heroTitle3")}
            </h1>

            {/* HERO DESCRIPTION */}

            <p className="text-xs md:text-sm text-teal-100/95 max-w-3xl text-justify leading-relaxed">
              {t("heroDesc")}
            </p>

            {/* HERO CARDS */}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
              {/* CARD 1 */}

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-teal-200 mb-1">
                  {t("cards.c1")}
                </p>

                <p className="text-sm font-semibold text-white">
                  {t("cards.c1Text")}
                </p>
              </div>

              {/* CARD 2 */}

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-orange-200 mb-1">
                  {t("cards.c2")}
                </p>

                <p className="text-sm font-semibold text-white">
                  {t("cards.c2Text")}
                </p>
              </div>

              {/* CARD 3 */}

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-teal-200 mb-1">
                  {t("cards.c3")}
                </p>

                <p className="text-sm font-semibold text-white">
                  {t("cards.c3Text")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}

        <main className="flex-1 bg-white">
          <section className="relative py-10 md:py-14">
            <div className="relative max-w-5xl mx-auto px-4 space-y-8 md:space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-8 lg:gap-10 items-start">
                {/* CORE MISSION */}

                <article className="bg-gray-50 border border-gray-200 rounded-3xl px-5 sm:px-7 py-6 sm:py-7 shadow-sm text-gray-700 leading-relaxed">
                  <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-900">
                    {t("coreTitle")}
                  </h2>

                  <div className="space-y-4 text-[13px] md:text-[14px] text-justify">
                    <p>{t("coreP1")}</p>

                    <p>{t("coreP2")}</p>

                    <p>{t("coreP3")}</p>

                    <p>{t("coreP4")}</p>
                  </div>
                </article>

                {/* SIDEBAR */}

                <aside className="space-y-5">
                  {/* DRIVES */}

                  <div className="bg-teal-50 border border-teal-200 rounded-3xl px-5 sm:px-6 py-5 shadow-sm text-left">
                    <h3 className="text-sm uppercase tracking-[0.25em] text-teal-700/90 mb-3 font-semibold">
                      {t("drivesTitle")}
                    </h3>

                    <ul className="space-y-3 text-[13px] text-gray-700">
                      <li className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />

                        <span>{t("drivesL1")}</span>
                      </li>

                      <li className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />

                        <span>{t("drivesL2")}</span>
                      </li>

                      <li className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />

                        <span>{t("drivesL3")}</span>
                      </li>

                      <li className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />

                        <span>{t("drivesL4")}</span>
                      </li>
                    </ul>
                  </div>

                  {/* MINI CARDS */}

                  <div className="grid grid-cols-2 gap-3 text-[11px] sm:text-[12px]">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500 mb-1">
                        {t("focusTitle")}
                      </p>

                      <p className="font-semibold text-gray-900">
                        {t("focusVal")}
                      </p>

                      <p className="text-gray-600 mt-1 text-[11px]">
                        {t("focusDesc")}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500 mb-1">
                        {t("valuesTitle")}
                      </p>

                      <p className="font-semibold text-gray-900">
                        {t("valuesVal")}
                      </p>

                      <p className="text-gray-600 mt-1 text-[11px]">
                        {t("valuesDesc")}
                      </p>
                    </div>
                  </div>
                </aside>
              </div>

              {/* HIGHLIGHTS + PROMISE */}

              <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* TRUST */}

                <div className="rounded-3xl border border-gray-200 bg-white px-5 sm:px-6 py-5 shadow-sm">
                  <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                    {t("trustTitle")}
                  </h2>

                  <ul className="space-y-3 text-sm text-gray-700">
                    {highlights.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-500 shrink-0" />

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PROMISE */}

                <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-teal-50 px-5 sm:px-6 py-5 shadow-sm">
                  <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                    {t("promiseTitle")}
                  </h2>

                  <p className="text-sm text-gray-700 leading-relaxed text-justify">
                    {t("promiseText")}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal-300 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700">
                    {t("promiseTag")}
                  </div>
                </div>
              </section>

              {/* PILLARS */}

              <div className="rounded-3xl border border-gray-200 bg-gray-50 px-5 sm:px-7 py-5 sm:py-6">
                <h2 className="text-sm md:text-base font-semibold mb-4 text-gray-900">
                  {t("pillarsTitle")}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[12px] md:text-[13px]">
                  {missionPoints.map((item, index) => (
                    <div key={index}>
                      <p
                        className={`text-[10px] uppercase tracking-[0.2em] mb-1 font-semibold ${
                          item.color === "orange"
                            ? "text-orange-600"
                            : "text-teal-700"
                        }`}
                      >
                        {item.title}
                      </p>

                      <p className="text-gray-700">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Mission;
