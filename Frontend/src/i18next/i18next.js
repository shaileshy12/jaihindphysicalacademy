import i18n from "i18next";

import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

// ================= ENGLISH =================

import enCommon from "./locales/en/common.json";

import enHome from "./locales/en/home.json";

import enAbout from "./locales/en/about.json";

import enCourses from "./locales/en/courses.json";

import enGallery from "./locales/en/gallery.json";

import enContact from "./locales/en/contact.json";

import enMission from "./locales/en/mission.json";

import enVision from "./locales/en/vision.json";

import enDirectorDesk from "./locales/en/directordesk.json";

import enSuccess from "./locales/en/success.json";

import enEnquiry from "./locales/en/enquiry.json";

import enFooter from "./locales/en/footer.json";

// ================= HINDI =================

import hiCommon from "./locales/hi/common.json";

import hiHome from "./locales/hi/home.json";

import hiAbout from "./locales/hi/about.json";

import hiCourses from "./locales/hi/courses.json";

import hiGallery from "./locales/hi/gallery.json";

import hiContact from "./locales/hi/contact.json";

import hiMission from "./locales/hi/mission.json";

import hiVision from "./locales/hi/vision.json";

import hiDirectorDesk from "./locales/hi/directordesk.json";

import hiSuccess from "./locales/hi/success.json";

import hiEnquiry from "./locales/hi/enquiry.json";

import hiFooter from "./locales/hi/footer.json";

// ================= MARATHI =================

import mrCommon from "./locales/mr/common.json";

import mrHome from "./locales/mr/home.json";

import mrAbout from "./locales/mr/about.json";

import mrCourses from "./locales/mr/courses.json";

import mrGallery from "./locales/mr/gallery.json";

import mrContact from "./locales/mr/contact.json";

import mrMission from "./locales/mr/mission.json";

import mrVision from "./locales/mr/vision.json";

import mrDirectorDesk from "./locales/mr/directordesk.json";

import mrSuccess from "./locales/mr/success.json";

import mrEnquiry from "./locales/mr/enquiry.json";

import mrFooter from "./locales/mr/footer.json";

// ================= CONFIG =================

// Marathi is now DEFAULT language

export const DEFAULT_LANG = "mr";

// Other languages available

export const SUPPORTED_LANGS = ["mr", "hi", "en"];

// ================= RESOURCES =================

const resources = {
  en: {
    common: enCommon,

    home: enHome,

    about: enAbout,

    courses: enCourses,

    gallery: enGallery,

    contact: enContact,

    mission: enMission,

    vision: enVision,

    directordesk: enDirectorDesk,

    success: enSuccess,

    enquiry: enEnquiry,

    footer: enFooter,
  },

  hi: {
    common: hiCommon,

    home: hiHome,

    about: hiAbout,

    courses: hiCourses,

    gallery: hiGallery,

    contact: hiContact,

    mission: hiMission,

    vision: hiVision,

    directordesk: hiDirectorDesk,

    success: hiSuccess,

    enquiry: hiEnquiry,

    footer: hiFooter,
  },

  mr: {
    common: mrCommon,

    home: mrHome,

    about: mrAbout,

    courses: mrCourses,

    gallery: mrGallery,

    contact: mrContact,

    mission: mrMission,

    vision: mrVision,

    directordesk: mrDirectorDesk,

    success: mrSuccess,

    enquiry: mrEnquiry,

    footer: mrFooter,
  },
};

// ================= CUSTOM PATH DETECTOR =================

const pathLangDetector = {
  name: "pathLangDetector",

  lookup() {
    if (typeof window === "undefined") {
      return null;
    }

    const parts = window.location.pathname.split("/").filter(Boolean);

    const candidate = parts[0];

    if (SUPPORTED_LANGS.includes(candidate)) {
      return candidate;
    }

    // NO LANGUAGE IN URL
    // RETURN DEFAULT LANGUAGE

    return DEFAULT_LANG;
  },
};

const languageDetector = new LanguageDetector();

languageDetector.addDetector(pathLangDetector);

// ================= INIT =================

i18n

  .use(languageDetector)

  .use(initReactI18next)

  .init({
    resources,

    // DEFAULT LANGUAGE

    lng: DEFAULT_LANG,

    fallbackLng: DEFAULT_LANG,

    supportedLngs: SUPPORTED_LANGS,

    defaultNS: "common",

    ns: [
      "common",

      "home",

      "about",

      "courses",

      "gallery",

      "contact",

      "mission",

      "vision",

      "directordesk",

      "success",

      "enquiry",

      "footer",
    ],

    returnNull: false,

    cleanCode: true,

    detection: {
      // URL > SAVED > BROWSER

      order: ["pathLangDetector", "localStorage", "navigator", "htmlTag"],

      lookupLocalStorage: "prahar_lang",

      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },
  });

// ================= HTML LANG SYNC =================

i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng || DEFAULT_LANG;
  }
});

export default i18n;
