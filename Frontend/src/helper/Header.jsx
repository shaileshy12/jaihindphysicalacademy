import {
  Send,
  Facebook,
  InstagramIcon,
  Mail,
  Phone,
  YoutubeIcon,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, DEFAULT_LANG } from "../i18next/i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "../assets/Logo.jpg";

function useLangPrefix() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);
  const maybeLang = parts[0];
  const currentLang = SUPPORTED_LANGS.includes(maybeLang)
    ? maybeLang
    : DEFAULT_LANG;
  return currentLang === DEFAULT_LANG ? "" : `/${currentLang}`;
}

const baseRefArr = {
  Home: "/",
  "About Us": "/aboutus",
  Courses: "/courses",
  "Success Student": "/success-students",
  Gallery: "/gallery",
  Enquiry: "/enquiry",
  "Contact Us": "/contactus",
};

function Header() {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null);

  const desktopMenuRef = useRef(null);
  const { t, i18n } = useTranslation("common");
  const prefix = useLangPrefix();

  const refArr = Object.fromEntries(
    Object.entries(baseRefArr).map(([key, val]) => [key, prefix + val]),
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(event.target)
      ) {
        setOpenDesktopMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSection = (name) =>
    setOpenSection((prev) => (prev === name ? null : name));
  const toggleDesktopMenu = (name) =>
    setOpenDesktopMenu((prev) => (prev === name ? null : name));
  const closeAllMenus = () => {
    setOpenMobileNav(false);
    setOpenDesktopMenu(null);
    setOpenSection(null);
  };

  return (
    <header
      key={i18n.language}
      className="w-full bg-white border-b border-gray-200 relative z-30"
    >
      <div className="mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between gap-2 py-2 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="h-12 sm:h-14 md:h-16 flex items-center shrink-0">
              <img
                src={Logo}
                alt={t("site.name")}
                className="h-full w-auto object-contain"
              />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-wide text-gray-900 leading-tight truncate">
                {t("site.name")}{" "}
                <span className="hidden sm:inline">(Borivali)</span>
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-orange-700 truncate">
                {t("site.tagline")}
              </span>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-2 text-xs xl:text-sm">
            <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-gray-800">
              <span className="inline-flex items-center gap-1">
                <Mail className="w-4 h-4 text-orange-700" />
                <a
                  href={`mailto:${t("header.email")}`}
                  className="hover:underline"
                >
                  {t("header.email")}
                </a>
              </span>
              <span className="inline-flex items-center gap-1">
                <Phone className="w-4 h-4 text-orange-700" />
                <span>{t("header.phoneLine")}</span>
              </span>
            </div>

            <div className="flex items-center flex-wrap justify-end gap-2 xl:gap-3">
              <span className="text-[11px] xl:text-xs text-gray-700">
                {t("header.slogan")}
              </span>

              <div className="flex items-center gap-1 text-black">
                <a
                  href="https://youtube.com/@jaihindphysical_academy?si=dhebBR8ovADcdcXJ"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 hover:bg-gray-100 rounded-lg"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/jaihindphysical_academy"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 hover:bg-gray-100 rounded-lg"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/share/18TqiF46m7/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 hover:bg-gray-100 rounded-lg"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                <a
                  href="https://t.me/jaihindphysicalacademy"
                  target="_blank"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 hover:bg-gray-100 rounded-lg"
                  aria-label="Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>

                <a
                  href="https://wa.me/919082546363"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 hover:bg-gray-100 rounded-lg"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>

                <LanguageSwitcher />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {/* CALL BUTTON */}

            <a href="tel:+919082546363" className="text-orange-700 p-1.5">
              <Phone className="w-5 h-5" />
            </a>

            {/* MENU BUTTON */}

            <button
              type="button"
              onClick={() => {
                setOpenMobileNav((p) => !p);
                setOpenSection(null);
              }}
              className="text-gray-900 p-1.5"
            >
              {openMobileNav ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <div
            ref={desktopMenuRef}
            className="mb-1 bg-orange-700 text-white shadow-sm"
          >
            <nav className="flex flex-wrap items-center justify-between gap-2 px-4 py-1.5">
              <span className="text-[10px] lg:text-[11px] uppercase tracking-[0.22em] text-orange-100 whitespace-nowrap">
                {t("nav.trainingDisciplineSelection")}
              </span>

              <div className="flex flex-wrap justify-center gap-3 lg:gap-5 text-sm lg:text-[15px]">
                <Link
                  to={refArr["Home"]}
                  className="px-1 hover:text-yellow-200 transition"
                >
                  {t("nav.home")}
                </Link>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDesktopMenu("about")}
                    className="flex items-center gap-1 px-1 hover:text-yellow-200 transition"
                  >
                    <span>{t("nav.about")}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {openDesktopMenu === "about" && (
                    <div className="absolute left-0 mt-2 w-44 rounded-lg bg-white text-black shadow-xl z-40">
                      <div className="flex flex-col py-2 text-sm">
                        <Link
                          to={refArr["About Us"]}
                          onClick={() => setOpenDesktopMenu(null)}
                          className="px-4 py-1 hover:bg-orange-50 hover:text-orange-700"
                        >
                          {t("nav.about")}
                        </Link>
                        <Link
                          to={prefix + "/director-desk"}
                          onClick={() => setOpenDesktopMenu(null)}
                          className="px-4 py-1 hover:bg-orange-50 hover:text-orange-700"
                        >
                          {t("nav.directorDesk")}
                        </Link>
                        <Link
                          to={prefix + "/mission"}
                          onClick={() => setOpenDesktopMenu(null)}
                          className="px-4 py-1 hover:bg-orange-50 hover:text-orange-700"
                        >
                          {t("nav.mission")}
                        </Link>
                        <Link
                          to={prefix + "/vision"}
                          onClick={() => setOpenDesktopMenu(null)}
                          className="px-4 py-1 hover:bg-orange-50 hover:text-orange-700"
                        >
                          {t("nav.vision")}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDesktopMenu("courses")}
                    className="flex items-center gap-1 px-1 hover:text-yellow-200 transition"
                  >
                    <span>{t("nav.courses")}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {openDesktopMenu === "courses" && (
                    <div className="absolute left-0 mt-2 w-64 rounded-lg bg-white text-black shadow-xl z-40">
                      <div className="flex flex-col py-2 text-sm">
                        <Link
                          to={prefix + "/courses#police"}
                          onClick={() => setOpenDesktopMenu(null)}
                          className="px-4 py-1 hover:bg-orange-50 hover:text-orange-700"
                        >
                          Police Bharti Ground Training
                        </Link>
                        <Link
                          to={prefix + "/courses#army"}
                          onClick={() => setOpenDesktopMenu(null)}
                          className="px-4 py-1 hover:bg-orange-50 hover:text-orange-700"
                        >
                          Army Bharti Ground Training
                        </Link>
                        <Link
                          to={prefix + "/courses#army"}
                          onClick={() => setOpenDesktopMenu(null)}
                          className="px-4 py-1 hover:bg-orange-50 hover:text-orange-700"
                        >
                          Territorial Army Ground Training
                        </Link>
                        <Link
                          to={prefix + "/courses#ssc"}
                          onClick={() => setOpenDesktopMenu(null)}
                          className="px-4 py-1 hover:bg-orange-50 hover:text-orange-700"
                        >
                          SSC GD Ground Training
                        </Link>
                        <Link
                          to={prefix + "/courses#physical"}
                          onClick={() => setOpenDesktopMenu(null)}
                          className="px-4 py-1 hover:bg-orange-50 hover:text-orange-700"
                        >
                          RPF Ground Training
                        </Link>
                        <Link
                          to={prefix + "/courses#physical"}
                          onClick={() => setOpenDesktopMenu(null)}
                          className="px-4 py-1 hover:bg-orange-50 hover:text-orange-700"
                        >
                          Fitness Physical Training
                        </Link>
                        <Link
                          to={prefix + "/courses#physical"}
                          onClick={() => setOpenDesktopMenu(null)}
                          className="px-4 py-1 hover:bg-orange-50 hover:text-orange-700"
                        >
                          All Physical Training
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  to={refArr["Success Student"]}
                  className="px-1 hover:text-yellow-200 transition"
                >
                  {t("nav.success")}
                </Link>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDesktopMenu("gallery")}
                    className="flex items-center gap-1 px-1 hover:text-yellow-200 transition"
                  >
                    <span>{t("nav.gallery")}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {openDesktopMenu === "gallery" && (
                    <div className="absolute left-0 mt-2 w-40 rounded-lg bg-white text-black shadow-xl z-40">
                      <div className="flex flex-col py-2 text-sm">
                        <Link
                          to={prefix + "/gallery#photos"}
                          onClick={() => setOpenDesktopMenu(null)}
                          className="px-4 py-1 hover:bg-orange-50 hover:text-orange-700"
                        >
                          Photos
                        </Link>
                        <Link
                          to={prefix + "/gallery#videos"}
                          onClick={() => setOpenDesktopMenu(null)}
                          className="px-4 py-1 hover:bg-orange-50 hover:text-orange-700"
                        >
                          Videos
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  to={refArr["Enquiry"]}
                  className="px-1 hover:text-yellow-200 transition"
                >
                  {t("nav.enquiry")}
                </Link>

                <Link
                  to={refArr["Contact Us"]}
                  className="px-1 hover:text-yellow-200 transition"
                >
                  {t("nav.contact")}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          openMobileNav
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70"
          onClick={() => setOpenMobileNav(false)}
        />

        <div
          className={`absolute left-0 top-0 h-full w-[320px] sm:w-[360px] bg-black text-white shadow-xl transform transition-transform duration-300 ${
            openMobileNav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="text-sm font-semibold uppercase tracking-wide">
              {t("nav.home")} MENU
            </span>
            <button
              type="button"
              onClick={() => setOpenMobileNav(false)}
              className="text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col px-4 py-4 text-sm font-semibold space-y-1">
            {/* LANGUAGE SWITCHER */}

            <div className="flex flex-col items-center pb-4 mb-4 border-b border-white/10">
              <LanguageSwitcher />

              {/* EMAIL */}

              <a
                href={`mailto:${t("header.email")}`}
                className="mt-4 text-xs text-gray-300 break-all hover:text-yellow-300 transition"
              >
                {t("header.email")}
              </a>

              {/* SOCIAL ICONS */}

              <div className="flex items-center justify-center gap-4 mt-4">
                <a
                  href="https://youtube.com/@jaihindphysical_academy?si=dhebBR8ovADcdcXJ"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-all duration-300"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-5 h-5 text-white" />
                </a>

                <a
                  href="https://www.instagram.com/jaihindphysical_academy"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-5 h-5 text-white" />
                </a>

                <a
                  href="https://www.facebook.com/share/18TqiF46m7/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>

                <a
                  href="https://wa.me/919082546363"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-600 transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5 text-white" />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky-500 transition-all duration-300"
                  aria-label="Telegram"
                >
                  <Send className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
            <Link
              to={refArr["Home"]}
              onClick={closeAllMenus}
              className="py-2 text-yellow-300"
            >
              {t("nav.home").toUpperCase()}
            </Link>

            <button
              type="button"
              onClick={() => toggleSection("about")}
              className="flex items-center justify-between py-2 border-t border-white/10 text-left w-full"
            >
              <span>{t("nav.about").toUpperCase()}</span>
              {openSection === "about" ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            <div
              className={`overflow-hidden transition-[max-height] duration-300 ${openSection === "about" ? "max-h-64" : "max-h-0"}`}
            >
              <div className="flex flex-col pl-4 pb-2 gap-2 text-xs">
                <Link to={refArr["About Us"]} onClick={closeAllMenus}>
                  {t("nav.about")}
                </Link>
                <Link to={prefix + "/director-desk"} onClick={closeAllMenus}>
                  {t("nav.directorDesk")}
                </Link>
                <Link to={prefix + "/mission"} onClick={closeAllMenus}>
                  {t("nav.mission")}
                </Link>
                <Link to={prefix + "/vision"} onClick={closeAllMenus}>
                  {t("nav.vision")}
                </Link>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleSection("courses")}
              className="flex items-center justify-between py-2 border-t border-white/10 text-left w-full"
            >
              <span>{t("nav.courses").toUpperCase()}</span>
              {openSection === "courses" ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            <div
              className={`overflow-hidden transition-[max-height] duration-300 ${openSection === "courses" ? "max-h-80" : "max-h-0"}`}
            >
              <div className="flex flex-col pl-4 pb-2 gap-2 text-xs">
                <Link to={prefix + "/courses#police"} onClick={closeAllMenus}>
                  Police Bharti Training
                </Link>
                <Link to={prefix + "/courses#army"} onClick={closeAllMenus}>
                  Army Bharti Training
                </Link>
                <Link to={prefix + "/courses#army"} onClick={closeAllMenus}>
                  Territorial Army Bharti
                </Link>
                <Link to={prefix + "/courses#ssc"} onClick={closeAllMenus}>
                  SSC GD Training
                </Link>
                <Link to={prefix + "/courses#physical"} onClick={closeAllMenus}>
                  RPF Physical Training
                </Link>
                <Link to={prefix + "/courses#physical"} onClick={closeAllMenus}>
                  Fitness Physical Training
                </Link>
                <Link to={prefix + "/courses#physical"} onClick={closeAllMenus}>
                  All Physical Training
                </Link>
              </div>
            </div>

            <Link
              to={refArr["Success Student"]}
              onClick={closeAllMenus}
              className="py-2 border-t border-white/10"
            >
              {t("nav.success").toUpperCase()}
            </Link>

            <button
              type="button"
              onClick={() => toggleSection("gallery")}
              className="flex items-center justify-between py-2 border-t border-white/10 text-left w-full"
            >
              <span>{t("nav.gallery").toUpperCase()}</span>
              {openSection === "gallery" ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            <div
              className={`overflow-hidden transition-[max-height] duration-300 ${openSection === "gallery" ? "max-h-40" : "max-h-0"}`}
            >
              <div className="flex flex-col pl-4 pb-2 gap-2 text-xs">
                <Link to={prefix + "/gallery#photos"} onClick={closeAllMenus}>
                  Photos
                </Link>
                <Link to={prefix + "/gallery#videos"} onClick={closeAllMenus}>
                  Videos
                </Link>
              </div>
            </div>

            <Link
              to={refArr["Enquiry"]}
              onClick={closeAllMenus}
              className="py-2 border-t border-white/10"
            >
              {t("nav.enquiry").toUpperCase()}
            </Link>

            <Link
              to={refArr["Contact Us"]}
              onClick={closeAllMenus}
              className="py-2 border-t border-b border-white/10"
            >
              {t("nav.contact").toUpperCase()}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
