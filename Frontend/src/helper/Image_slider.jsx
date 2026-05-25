// src/helper/Image_slider.jsx

import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";

// ================= IMAGES =================

import Parade2 from "../assets/Parade2.jpeg";
import GirlParade from "../assets/Girl_parade.jpg";
import Parade from "../assets/parade.jpeg";
import ArmyImage from "../assets/army-image.jpg";
import ArmyWithGun from "../assets/ArmywithGun.jpg";

// ================= SLIDES =================

const slidesData = [

  {
    srcLeft: Parade2,
    srcRight: GirlParade,
    key: "slide1",
  },

  {
    srcLeft: Parade,
    srcRight: Parade,
    key: "slide2",
  },

  {
    srcLeft: ArmyImage,
    srcRight: ArmyWithGun,
    key: "slide3",
  },

];

function AutoImageSlider({
  styles = "",
}) {

  // home namespace
  const { t } =
    useTranslation("home");

  const [index, setIndex] =
    useState(0);

  const delay = 4000;

  // ================= AUTO SLIDE =================

  useEffect(() => {

    const intervalId =
      setInterval(() => {

        setIndex((prev) =>
          (prev + 1) %
          slidesData.length
        );

      }, delay);

    return () =>
      clearInterval(intervalId);

  }, []);

  // ================= SLIDE NAVIGATION =================

  const goToSlide = (i) => {
    setIndex(i);
  };

  const currentSlide =
    slidesData[index];

  return (

    <div
      className={`relative overflow-hidden w-full h-screen sm:h-[65vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh] ${styles}`}
    >

      {/* LEFT IMAGE */}

      <div className="absolute inset-0 w-1/2">

        <img
          src={currentSlide.srcLeft}
          alt="Training"
          className="w-full h-full object-cover"
        />

      </div>

      {/* RIGHT IMAGE */}

      <div className="absolute inset-0 left-1/2 w-1/2">

        <img
          src={currentSlide.srcRight}
          alt="Training"
          className="w-full h-full object-cover"
        />

      </div>

      {/* CENTER DIVIDER */}

      <div className="absolute inset-0 left-1/2 w-px bg-white/30" />

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/70" />

      {/* CONTENT */}

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-8 lg:px-12">

        {/* TITLE */}

        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-2xl leading-tight tracking-tight max-w-5xl">

          {t(
            `slider.${currentSlide.key}.title`
          )}

        </h1>

        {/* SUBTITLE */}

        <p className="text-sm sm:text-base md:text-lg max-w-md sm:max-w-xl mb-6 sm:mb-8 drop-shadow-lg leading-relaxed">

          {t(
            `slider.${currentSlide.key}.subtitle`
          )}

        </p>

        {/* BUTTON */}

        <a
          href="/enquiry"
          className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-2xl hover:-translate-y-1 transition-all duration-300 text-base sm:text-lg md:text-xl whitespace-nowrap min-w-[140px]"
        >

          {t(
            `slider.${currentSlide.key}.btn`
          )}

        </a>

      </div>

      {/* DOTS */}

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 bg-black/70 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm z-20">

        {slidesData.map((_, i) => (

          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all duration-300 flex-shrink-0 ${
              i === index
                ? "bg-amber-400 w-6 sm:w-8 scale-110 shadow-lg"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />

        ))}

      </div>

    </div>
  );
}

export default AutoImageSlider;