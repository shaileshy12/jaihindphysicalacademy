// src/helper/Footer.jsx

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

import React from "react";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import Logo from "../assets/logo.jpg";

// ================= QUICK LINKS =================

const quickLinks = [
  {
    nameKey: "links.aboutUs",
    href: "/aboutus",
  },

  {
    nameKey: "links.directorDesk",
    href: "/director-desk",
  },

  {
    nameKey: "links.successStudent",
    href: "/success-students",
  },

  {
    nameKey: "links.enquiry",
    href: "/enquiry",
  },
];

// ================= SOCIAL ICON =================

const SocialIcon = ({ label, href = "#" }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[11px] font-medium text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white"
  >
    {label}
  </a>
);

// ================= SECTION HEADING =================

const SectionHeading = ({ children }) => (
  <div className="mb-4">
    <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
      {children}
    </h3>

    <div className="mt-2 h-px w-10 bg-white/15" />
  </div>
);

// ================= NAV LINK =================

const NavLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-sm leading-7 text-white/75 transition-colors duration-150 hover:text-white"
    >
      {children}
    </Link>
  </li>
);

// ================= FOOTER =================

const Footer = () => {
  // COMMON + FOOTER

  const { t } = useTranslation(["common", "footer"]);

  return (
    <footer className="border-t border-white/10 bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* LEFT */}

          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black">
                <img
                  src={Logo}
                  alt={t("site.name")}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <p className="text-base font-semibold text-white">
                  {t("site.name")}
                </p>

                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/55">
                  {t("site.tagline")}
                </p>
              </div>
            </div>

            {/* ADDRESS */}

            <p className="mt-5 text-white">{t("footer:headOffice")}</p>

            <p className="text-sm text-white/70 leading-7">
              {t("footer:addressLine1")}
            </p>

            <p className="mt-2 text-sm text-white/70 leading-7">
              {t("footer:addressLine2")}
            </p>

            {/* CONTACT */}

            <div className="mt-5 space-y-2">
              <a
                href="tel:9930810555"
                className="block text-sm text-white/75 hover:text-white"
              >
                {t("header.phoneLine")}
              </a>

              <a
                href={`mailto:${t("header.email")}`}
                className="block text-sm text-white/75 hover:text-white"
              >
                {t("header.email")}
              </a>
            </div>

            {/* SOCIAL */}

            <div className="flex items-center mt-5 gap-4 text-black">
              <a
                href="https://youtube.com/@jaihindphysical_academy?si=dhebBR8ovADcdcXJ"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/jaihindphysical_academy"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/18TqiF46m7/"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://t.me/jaihindphysicalacademy"
                target="_blank"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919082546363"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COURSES */}

          <div className="lg:col-span-3">
            <SectionHeading>{t("footer:coursesTitle")}</SectionHeading>

            <ul className="space-y-1">
              {[
                t("footer:courses.police"),
                t("footer:courses.army"),
                t("footer:courses.taarmy"),
                t("footer:courses.sscgd"),
                t("footer:courses.rpf"),
                t("footer:courses.fitness"),
                t("footer:courses.allPhysical"),
              ].map((item) => (
                <li key={item} className="text-sm leading-7 text-white/75">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS */}

          <div className="lg:col-span-2">
            <SectionHeading>{t("footer:quickLinksTitle")}</SectionHeading>

            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <NavLink key={link.nameKey} to={link.href}>
                  {t(`footer:${link.nameKey}`)}
                </NavLink>
              ))}
            </ul>
          </div>

          {/* CONTACT */}

          <div className="lg:col-span-2">
            <SectionHeading>Contact</SectionHeading>

            <div className="space-y-2 text-sm leading-7 text-white/75">
              <p>{t("header.slogan")}</p>

              <p>{t("footer:bottomSubtitle")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-white/55 sm:flex-row sm:justify-between">
          <p>{t("footer:bottomLine")}</p>

          <p>{t("footer:bottomSubtitle")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
