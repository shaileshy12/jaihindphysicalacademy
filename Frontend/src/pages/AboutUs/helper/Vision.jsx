// src/pages/AboutUs/helper/Vision.jsx

import React from "react";

import { useTranslation }
from "react-i18next";

import VisionImage
from "../../../assets/army-image.jpg";

const Vision = () => {

  // USING VISION NAMESPACE
  const { t } =
    useTranslation("vision");

  // ================= VISION PILLARS =================

  const visionPillars = [

    {
      title: t("p1Title"),
      text: t("p1Text"),
      color: "yellow",
    },

    {
      title: t("p2Title"),
      text: t("p2Text"),
      color: "emerald",
    },

    {
      title: t("p3Title"),
      text: t("p3Text"),
      color: "yellow",
    },

  ];

  // ================= VALUES =================

  const values = [

    t("practiceL1"),
    t("practiceL2"),
    t("practiceL3"),
    t("practiceL4"),

  ];

  return (

    <div className="min-h-screen bg-white text-gray-900 flex flex-col">

      {/* HERO SECTION */}

      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-slate-950 via-slate-950/95 to-[#030711]">

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute -top-32 left-[-8%] h-72 w-72 rounded-full bg-yellow-400/15 blur-3xl" />

          <div className="absolute -bottom-40 right-[-10%] h-80 w-80 rounded-full bg-emerald-500/18 blur-3xl" />

          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_top,_#facc15_0,_transparent_55%),radial-gradient(circle_at_bottom,_#22c55e_0,_transparent_55%)]" />

        </div>

        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-14 md:pt-24 md:pb-18 grid grid-cols-1 lg:grid-cols-[1.05fr,0.95fr] gap-10 items-center">

          {/* LEFT CONTENT */}

          <div>

            <p className="text-[11px] md:text-xs tracking-[0.32em] uppercase text-yellow-300/90 mb-3">

              {t("heroTag")}

            </p>

            {/* TITLE */}

            <h1 className="text-2xl text-white md:text-3xl lg:text-4xl font-semibold leading-tight mb-4">

              {t("heroTitleMain")}

              {" "}

              <span className="text-yellow-300">

                {t("heroTitleHighlight1")}

              </span>

              {" "}

              {t("heroTitleHighlight2")}

            </h1>

            {/* DESCRIPTION */}

            <p className="text-xs md:text-sm text-slate-200/90 max-w-2xl text-justify leading-relaxed">

              {t("heroText")}

            </p>

            {/* HERO CARDS */}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">

              {/* CARD 1 */}

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">

                <p className="text-[10px] uppercase tracking-[0.18em] text-yellow-200 mb-1">

                  {t("cards.c1")}

                </p>

                <p className="text-sm font-semibold text-white">

                  {t("cards.c1Text")}

                </p>

              </div>

              {/* CARD 2 */}

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">

                <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-200 mb-1">

                  {t("cards.c2")}

                </p>

                <p className="text-sm font-semibold text-white">

                  {t("cards.c2Text")}

                </p>

              </div>

              {/* CARD 3 */}

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">

                <p className="text-[10px] uppercase tracking-[0.18em] text-yellow-200 mb-1">

                  {t("cards.c3")}

                </p>

                <p className="text-sm font-semibold text-white">

                  {t("cards.c3Text")}

                </p>

              </div>

            </div>

          </div>

          {/* IMAGE */}

          <div className="relative">

            <div className="rounded-3xl overflow-hidden border border-yellow-400/40 bg-slate-900/40 shadow-[0_22px_60px_rgba(0,0,0,0.85)]">

              <img
                src={VisionImage}
                alt="Cadets training with discipline"
                className="w-full h-64 md:h-72 lg:h-80 object-cover"
              />

            </div>

            <div className="absolute -bottom-4 left-6 px-4 py-2 rounded-2xl bg-black/80 border border-white/10 text-[11px] md:text-[12px] text-slate-100 shadow-lg">

              {t("imgCaption")}

            </div>

          </div>

        </div>

      </section>

      {/* MAIN SECTION */}

      <main className="flex-1 bg-white">

        <section className="relative py-10 md:py-14">

          <div className="relative max-w-6xl mx-auto px-4 space-y-8 md:space-y-10">

            <div className="text-justify grid grid-cols-1 lg:grid-cols-[1.15fr,0.85fr] gap-8 lg:gap-10 items-start">

              {/* CORE CONTENT */}

              <article className="bg-gray-50 border border-gray-200 rounded-3xl px-5 sm:px-7 py-6 sm:py-7 shadow-sm">

                <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-900">

                  {t("coreTitle")}

                </h2>

                <div className="space-y-4 text-[13px] md:text-[14px] leading-relaxed text-gray-700">

                  <p>{t("coreP1")}</p>

                  <p>{t("coreP2")}</p>

                  <p>{t("coreP3")}</p>

                  <p>{t("coreP4")}</p>

                  <p>{t("coreP5")}</p>

                </div>

              </article>

              {/* SIDEBAR */}

              <aside className="space-y-5">

                {/* ONE LINE */}

                <div className="bg-yellow-50 border border-yellow-200 rounded-3xl px-5 sm:px-6 py-5 shadow-sm">

                  <h3 className="text-sm uppercase tracking-[0.25em] text-yellow-700/90 mb-3 font-semibold">

                    {t("oneLineTitle")}

                  </h3>

                  <p className="text-[13px] text-gray-700 leading-relaxed">

                    {t("oneLineText")}

                  </p>

                </div>

                {/* MINI CARDS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] sm:text-[12px]">

                  {/* NATION */}

                  <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">

                    <p className="text-[10px] uppercase tracking-[0.18em] text-yellow-700 mb-1">

                      {t("nationTitle")}

                    </p>

                    <p className="font-semibold text-gray-900">

                      {t("nationVal")}

                    </p>

                    <p className="text-gray-600 mt-1">

                      {t("nationDesc")}

                    </p>

                  </div>

                  {/* STUDENT */}

                  <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">

                    <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-700 mb-1">

                      {t("studentTitle")}

                    </p>

                    <p className="font-semibold text-gray-900">

                      {t("studentVal")}

                    </p>

                    <p className="text-gray-600 mt-1">

                      {t("studentDesc")}

                    </p>

                  </div>

                </div>

                {/* STANDS FOR */}

                <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-[12px]">

                  <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-700 mb-1">

                    {t("standsForTitle")}

                  </p>

                  <p className="text-gray-800">

                    {t("standsForText")}

                  </p>

                </div>

              </aside>

            </div>

            {/* PRACTICE + OUTLOOK */}

            <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* PRACTICE */}

              <div className="rounded-3xl border border-gray-200 bg-white px-5 sm:px-6 py-5 shadow-sm">

                <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3">

                  {t("practiceTitle")}

                </h2>

                <ul className="space-y-3 text-sm text-gray-700">

                  {values.map(
                    (item, index) => (

                      <li
                        key={index}
                        className="flex gap-3"
                      >

                        <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />

                        <span>{item}</span>

                      </li>

                    )
                  )}

                </ul>

              </div>

              {/* OUTLOOK */}

              <div className="rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-50 via-white to-emerald-50 px-5 sm:px-6 py-5 shadow-sm">

                <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3">

                  {t("outlookTitle")}

                </h2>

                <p className="text-sm text-gray-700 leading-relaxed text-justify">

                  {t("outlookText")}

                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-yellow-300 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-yellow-700">

                  {t("outlookTag")}

                </div>

              </div>

            </section>

            {/* PILLARS */}

            <div className="mt-4 rounded-3xl border border-gray-200 bg-gray-50 px-5 sm:px-7 py-5 sm:py-6">

              <h2 className="text-sm md:text-base font-semibold mb-3 text-gray-900">

                {t("pillarsTitle")}

              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[12px] md:text-[13px]">

                {visionPillars.map(
                  (item, index) => (

                    <div key={index}>

                      <p
                        className={`text-[10px] uppercase tracking-[0.2em] mb-1 font-semibold ${
                          item.color === "emerald"
                            ? "text-emerald-700"
                            : "text-yellow-700"
                        }`}
                      >

                        {item.title}

                      </p>

                      <p className="text-gray-700">

                        {item.text}

                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

export default Vision;