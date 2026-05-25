// src/pages/AboutUs/AboutUs.jsx

import React from "react";

import { useTranslation } from "react-i18next";

const AboutUs = () => {

  // USING ABOUT NAMESPACE
  const { t } =
    useTranslation("about");

  return (

    <div className="min-h-screen flex flex-col bg-white text-gray-900">

      {/* HERO SECTION */}

      <section className="relative w-full overflow-hidden bg-gradient-to-b from-black via-slate-950/95 to-black">

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

        <div className="pointer-events-none absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_top,_#facc15_0,_transparent_55%),radial-gradient(circle_at_bottom_right,_#22c55e_0,_transparent_55%)]" />

        <div className="relative max-w-6xl mx-auto px-4 min-h-[340px] md:min-h-[400px] flex items-center py-16 md:py-20">

          <div className="max-w-3xl text-left">

            {/* SMALL LABEL */}

            <div className="flex items-center gap-3 mb-4">

              <span className="h-7 w-1 rounded-full bg-amber-400" />

              <p className="text-[11px] md:text-xs uppercase tracking-[0.32em] text-amber-300">

                {t("jai hind physical academy")}

              </p>

            </div>

            {/* HERO TITLE */}

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-white mb-5">

              {t("heroTitle")}

              {" "}

              <span className="text-amber-300">

                {t("heroTitleHighlight")}

              </span>

            </h1>

            {/* HERO TEXT */}

            <div className="space-y-3 max-w-2xl">

              <p className="text-sm md:text-base text-white/85 leading-relaxed text-left">

                {t("heroText1")}

              </p>

              <p className="text-sm md:text-base text-white/75 leading-relaxed text-left">

                {t("heroText2")}

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* MAIN CONTENT */}

      <main className="flex-1 bg-white">

        <section className="relative max-w-6xl mx-auto px-4 py-10 md:py-14">

          {/* PAGE TITLE */}

          <div className="mb-8 md:mb-10 flex items-center justify-center gap-3">

            <span className="h-7 w-1 rounded-full bg-amber-500" />

            <div className="text-center">

              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">

                {t("pageTitle")}

              </h1>

            </div>

          </div>

          {/* INTRO */}

          <p className="text-sm md:text-base text-gray-700 leading-relaxed md:leading-loose mb-6 text-justify">

            {t("intro")}

          </p>

          {/* CONTENT GRID */}

          <div className="grid gap-10 lg:grid-cols-3 lg:items-start">

            {/* LEFT CONTENT */}

            <div className="lg:col-span-2 space-y-5 text-sm md:text-base text-gray-700 leading-relaxed md:leading-loose text-justify bg-gray-50 border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">

              <p>{t("p1")}</p>

              <p>{t("p2")}</p>

              <p>{t("p3")}</p>

              <p>{t("p4")}</p>

              <p>{t("p5")}</p>

              <p>{t("p6")}</p>

              <p>{t("p7")}</p>

              <p>{t("p8")}</p>

              <p>{t("p9")}</p>

            </div>

            {/* SIDEBAR */}

            <aside className="bg-amber-50 border border-amber-300 rounded-2xl p-5 space-y-3 text-sm text-gray-800 shadow-sm">

              <h3 className="text-base md:text-lg font-semibold text-amber-700 mb-2">

                {t("whyTitle")}

              </h3>

              <ul className="space-y-2 list-disc list-inside text-gray-700">

                <li>{t("why1")}</li>

                <li>{t("why2")}</li>

                <li>{t("why3")}</li>

                <li>{t("why4")}</li>

                <li>{t("why5")}</li>

              </ul>

              {/* COMMITMENT */}

              <div className="mt-4 border-t border-amber-300 pt-3">

                <p className="text-xs uppercase tracking-[0.16em] text-gray-500 mb-1">

                  {t("commitmentLabel")}

                </p>

                <p className="text-sm text-gray-800">

                  {t("commitmentText")}

                </p>

              </div>

            </aside>

          </div>

        </section>

      </main>

    </div>
  );
};

export default AboutUs;