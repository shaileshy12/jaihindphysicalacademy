import React from "react";

import { Helmet } from "react-helmet-async";

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

    <>
      <Helmet>
        <title>
          Army, NDA & Police Training Academy in Mumbai |
          Jai Hind Physical Academy
        </title>

        <meta
          name="description"
          content="Jai Hind Physical Academy provides professional Army, NDA, Navy, Air Force and Police physical training in Mumbai with expert coaching and guidance."
        />

        <meta
          name="keywords"
          content="Army coaching Mumbai, NDA coaching Mumbai, Police training Mumbai, Defence academy Mumbai"
        />

        <link
          rel="canonical"
          href="https://jaihindphysicalacademy.com/"
        />
      </Helmet>

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
    </>
  );
};

export default Home;