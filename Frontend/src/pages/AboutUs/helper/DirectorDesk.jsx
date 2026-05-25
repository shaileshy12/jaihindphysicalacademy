// src/pages/AboutUs/helper/DirectorDesk.jsx

import React from "react";

import { useTranslation }
from "react-i18next";

import Vishal_Trainer
from "../../../assets/Vishal_Trainer.jpeg";

const DirectorDesk = () => {

  // USING DIRECTORDESK NAMESPACE
  const { t, i18n } =
    useTranslation("directordesk");

  return (

    <div
      key={i18n.language}
      className="min-h-screen bg-white text-gray-900 flex flex-col"
    >

      {/* HERO SECTION */}

      <section className="relative overflow-hidden border-b border-gray-200/50 bg-gradient-to-b from-slate-950 via-slate-950/95 to-[#050509]">

        <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_top,_#facc15_0,_transparent_55%),_radial-gradient(circle_at_bottom,_#f97316_0,_transparent_55%)]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-20">

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-14">

            {/* DIRECTOR PHOTO */}

            <div className="relative shrink-0">

              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-br from-amber-500/60 via-orange-500/40 to-sky-500/40 blur-lg opacity-70" />

              <div className="relative rounded-[28px] bg-[#050509] border border-white/10 shadow-[0_22px_70px_rgba(0,0,0,0.9)] overflow-hidden w-56 sm:w-64 lg:w-72 aspect-[3/4] flex items-center justify-center">

                <img
                  src={Vishal_Trainer}
                  alt={t("stats.name")}
                  className="h-full w-full object-cover object-top"
                />

              </div>

            </div>

            {/* INTRO */}

            <div className="flex-1 text-left">

              <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-amber-300 border border-amber-400/40">

                {t("heroTag")}

                <span className="h-px w-6 bg-amber-300/70" />

                {t("academyName")}

              </p>

              {/* TITLE */}

              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">

                {t("titleMain")}

                {" "}

                <span className="text-amber-300">

                  {t("titleHighlight")}

                </span>

              </h1>

              {/* TEXT */}

              <p className="mt-4 text-sm sm:text-base text-slate-200/90 leading-relaxed">

                {t("heroText1")}

              </p>

              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">

                {t("heroText2")}

              </p>

              {/* STATS */}

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl text-center text-[11px] sm:text-xs">

                {/* DIRECTOR */}

                <div className="rounded-2xl border border-amber-400/40 bg-black/40 px-3 py-3">

                  <p className="text-lg sm:text-xl font-bold text-amber-300">

                    {t("stats.dir")}

                  </p>

                  <p className="text-slate-300 font-bold mt-0.5">

                    {t("stats.name")}

                  </p>

                </div>

                {/* ACADEMY */}

                <div className="rounded-2xl border border-emerald-400/40 bg-black/40 px-3 py-3">

                  <p className="text-lg sm:text-xl font-bold text-emerald-300">

                    {t("stats.acad")}

                  </p>

                  <p className="text-slate-300 font-bold mt-0.5">

                    {t("stats.acadName")}

                  </p>

                </div>

                {/* MENTOR */}

                <div className="rounded-2xl border border-sky-400/40 bg-black/40 px-3 py-3">

                  <p className="text-lg sm:text-xl font-bold text-sky-300">

                    {t("stats.mentor")}

                  </p>

                  <p className="text-slate-300 font-bold mt-0.5">

                    {t("stats.mentorFor")}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* MAIN SECTION */}

      <main className="flex-1 bg-white">

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">

          <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">

            {/* JOURNEY */}

            <div className="text-left">

              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">

                {t("journeyTitle")}

                {" "}

                <span className="text-amber-600">

                  {t("journeyTitleHighlight")}

                </span>

              </h2>

              <div className="mt-4 max-w-3xl mx-auto text-sm sm:text-base text-gray-700 leading-relaxed text-justify">

                <p className="mb-3">

                  {t("p1")}

                </p>

                <p className="mb-3 font-medium text-gray-900">

                  – {t("stats.name")} Sir

                </p>

                <p className="mb-3">

                  {t("p2")}

                </p>

                <p className="mb-3">

                  {t("p3")}

                </p>

                <p className="mb-3">

                  {t("p4")}

                </p>

                <p className="mb-3">

                  {t("p5")}

                </p>

                <p className="mb-3">

                  {t("p6")}

                </p>

                <p className="mb-3">

                  {t("p7")}

                </p>

                <p>

                  {t("p8")}

                </p>

              </div>

            </div>

            {/* SIDEBAR */}

            <div className="space-y-5">

              {/* MESSAGE */}

              <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 sm:p-6 shadow-sm text-left">

                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600">

                  {t("messageTitle")}

                </p>

                <p className="mt-3 text-sm sm:text-base text-gray-700 text-justify leading-relaxed">

                  {t("messageText")}

                </p>

                <div className="mt-4">

                  <p className="text-sm font-semibold text-gray-900">

                    {t("stats.name")}

                  </p>

                  <p className="text-xs text-gray-500">

                    {t("stats.dir")},{" "}

                    {t("stats.acadName")}

                  </p>

                </div>

              </div>

              {/* FOOTER BOX */}

              <div className="rounded-3xl border border-amber-300 bg-amber-50 p-4 sm:p-5 text-left">

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">

                  {t("footerHighlight")}

                </p>

                <p className="mt-2 text-sm text-amber-800 text-justify leading-relaxed">

                  {t("footerText")}

                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

export default DirectorDesk;