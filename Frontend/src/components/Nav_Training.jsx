// src/components/Nav_Training.jsx

import React from "react";

import { useTranslation } from "react-i18next";

const Nav_Training = ({
  styles = "",
}) => {

  // USING HOME NAMESPACE
  const { t, i18n } =
    useTranslation("home");

  // TRANSLATION KEYS
  const navOptions = [

    {
      label: t("bottomBar.police"),
      link: "#",
    },

    {
      label: t("bottomBar.army"),
      link: "#",
    },

    {
      label: t("bottomBar.ssc"),
      link: "#",
    },

    {
      label: t("bottomBar.rpf"),
      link: "#",
    },

    {
      label: t("bottomBar.fitness"),
      link: "#",
    },

    {
      label: t("bottomBar.allPhysical"),
      link: "#",
    },

  ];

  return (

    <div
      key={i18n.language}
      className={`bg-gradient-to-r from-slate-950/95 via-black to-slate-950/95 text-white border-t border-white/10 backdrop-blur-md w-full ${styles}`}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 py-6 justify-items-center">

          {navOptions.map(
            (option, index) => (

              <a
                key={index}
                href={option.link}
                className="group relative text-center transition-all duration-300 hover:text-amber-400 hover:-translate-y-0.5 cursor-pointer block w-full"
              >

                <span className="block py-2 px-2 sm:px-3 text-[10px] sm:text-xs lg:text-sm xl:text-base font-semibold tracking-tight leading-tight text-center">

                  {option.label}

                </span>

                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-amber-400 to-orange-400 rounded-full group-hover:w-12 sm:group-hover:w-16 transition-all duration-300 origin-center" />

              </a>

            )
          )}

        </div>

      </div>

    </div>
  );
};

export default Nav_Training;