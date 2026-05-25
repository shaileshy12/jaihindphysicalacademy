import React from "react";

import { useTranslation }
from "react-i18next";

import AutoImageSlider
from "../../helper/Image_slider";

import Nav_Training
from "../../components/Nav_Training";

import About_Academy
from "../../components/About_Academy";

import Happy_Students
from "../../components/Happy_Students";

import ForcesLogoStrip
from "../../helper/ForcesLogoStrip";

// import StatsSection from "../../components/StatsSection";

const Home = () => {

  // home namespace
  useTranslation("home");

  return (

    <div className="w-full h-full flex flex-col items-center">

      <AutoImageSlider
        styles="h-full w-full"
      />

      <Nav_Training />

      <About_Academy />

      {/* <StatsSection /> */}

      <Happy_Students />

      <ForcesLogoStrip />

    </div>
  );
};

export default Home;