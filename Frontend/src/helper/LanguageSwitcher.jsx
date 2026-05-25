// src/components/LanguageSwitcher.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { SUPPORTED_LANGS, DEFAULT_LANG } from "../i18next/i18next";

// Remove current /en, /hi, /mr prefix from path
function stripLang(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  if (SUPPORTED_LANGS.includes(parts[0])) {
    const rest = parts.slice(1);
    return rest.length ? `/${rest.join("/")}` : "/";
  }
  return `/${parts.join("/")}`;
}

const LABELS = { en: "EN", hi: "HI", mr: "MR" };

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLang = SUPPORTED_LANGS.includes(i18n.language)
    ? i18n.language
    : DEFAULT_LANG;

  const basePath = stripLang(location.pathname);

  const changeLang = (lng) => {
    if (!SUPPORTED_LANGS.includes(lng)) return;

    // Default lang: no prefix; others: /lng/...
    const targetPath =
      lng === DEFAULT_LANG ? basePath : `/${lng}${basePath === "/" ? "" : basePath}`;

    i18n.changeLanguage(lng);
    localStorage.setItem("prahar_lang", lng);
    navigate(targetPath, { replace: true });
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-white/70 border border-orange-300/70 px-1 py-0.5 text-[11px]">
      {SUPPORTED_LANGS.map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => changeLang(lng)}
          className={`px-3 py-0.5 rounded-full transition-all duration-150 ${
            currentLang === lng
              ? "bg-orange-500 text-black font-semibold shadow-sm"
              : "bg-transparent text-orange-700 hover:bg-orange-100"
          }`}
        >
          {LABELS[lng]}
        </button>
      ))}
    </div>
  );
}
