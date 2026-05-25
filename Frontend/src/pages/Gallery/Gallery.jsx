// src/pages/Gallery/Gallery.jsx

import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import API from "../../services/api";

import CloudinaryMedia from "../../components/CloudinaryMedia";

// HERO IMAGES

import HeroTraining1 from "../../assets/army-image.jpg";

import HeroTraining2 from "../../assets/ArmywithGun.jpg";

import HeroTraining3 from "../../assets/img3.jpeg";

const Gallery = () => {
  // USING GALLERY NAMESPACE

  const { t } = useTranslation("gallery");

  const [galleryImages, setGalleryImages] = useState([]);

  const [loading, setLoading] = useState(true);

  // ================= FETCH GALLERY =================

  const fetchGallery = async () => {
    try {
      const res = await API.get(`/api/v1/user/gallery`);

      setGalleryImages(res.data.data || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-[#050507] text-gray-100 flex flex-col">
      {/* HERO SECTION */}

      <section className="relative w-full overflow-hidden bg-gradient-to-b from-black via-black/90 to-[#606063]">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-10 md:pt-20 md:pb-14 grid grid-cols-1 lg:grid-cols-[1.1fr,1fr] gap-10 items-center">
          {/* LEFT CONTENT */}

          <div>
            {/* TAG */}

            <p className="text-[11px] md:text-xs tracking-[0.32em] uppercase text-yellow-400 mb-2">
              {t("heroTag")}
            </p>

            {/* TITLE */}

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3">
              {t("heroTitle")}{" "}
              <span className="text-yellow-400">{t("heroTitleHighlight")}</span>
            </h1>

            {/* TEXT */}

            <p className="text-xs md:text-sm text-gray-200 mb-4">
              {t("heroText1")}
            </p>

            <p className="text-xs md:text-sm text-gray-300">{t("heroText2")}</p>
          </div>

          {/* RIGHT HERO MEDIA */}

          <div className="relative h-52 sm:h-64 md:h-72">
            {/* BIG CARD */}

            <div className="absolute right-0 top-4 w-56 sm:w-64 md:w-72 h-40 sm:h-44 md:h-52 rounded-2xl overflow-hidden border border-yellow-400/40 shadow-[0_18px_45px_rgba(0,0,0,0.7)] bg-black">
              <img
                src={HeroTraining1}
                alt="Training"
                className="w-full h-full object-cover"
              />
            </div>

            {/* SMALL LEFT BOTTOM */}

            <div className="absolute left-0 bottom-4 w-32 sm:w-36 md:w-40 h-24 sm:h-28 md:h-32 rounded-2xl overflow-hidden border border-yellow-400/80 shadow-[0_14px_35px_rgba(0,0,0,0.8)] bg-black">
              <img
                src={HeroTraining2}
                alt="Academy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* SMALL TOP */}

            <div className="absolute left-10 top-0 w-28 sm:w-32 md:w-36 h-20 sm:h-24 md:h-28 rounded-2xl overflow-hidden border border-yellow-400/80 shadow-[0_12px_30px_rgba(0,0,0,0.8)] bg-black">
              <img
                src={HeroTraining3}
                alt="Physical Training"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}

      <main className="flex-1 bg-white dark:bg-[#111827] text-gray-900 dark:text-white transition-colors duration-300">
        <section className="relative py-12 md:py-16">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_top,_#fef3c7_0,_transparent_60%),radial-gradient(circle_at_bottom,_#dbeafe_0,_transparent_60%)]" />

          <div className="relative max-w-6xl mx-auto px-4">
            {/* SECTION TITLE */}

            <h2 className="text-center text-2xl md:text-3xl font-semibold mb-3 text-gray-900 dark:text-white">
              {t("sectionTitle")}
            </h2>

            {/* SECTION SUBTITLE */}

            <p className="text-center text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              {t("sectionSub")}
            </p>

            {/* LOADING */}

            {loading ? (
              <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {t("loading")}
                </p>
              </div>
            ) : galleryImages.length === 0 ? (
              /* EMPTY STATE */

              <div className="text-center py-20 bg-gray-50 dark:bg-[#1f2937] rounded-3xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  {t("emptyTitle")}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 mt-3">
                  {t("emptyText")}
                </p>
              </div>
            ) : (
              /* GALLERY GRID */

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {galleryImages.map((img) => (
                  <div
                    key={img._id}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f2937] shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    {/* MEDIA */}

                    <div className="bg-black flex items-center justify-center overflow-hidden rounded-t-2xl min-h-[220px] sm:min-h-[260px] md:min-h-[320px]">
                      <CloudinaryMedia
                        publicId={img.publicId}
                        type={img.mediaType}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* OVERLAY */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-100 transition-opacity duration-300" />

                    {/* TITLE */}

                    <span className="absolute bottom-3 left-3 right-3 text-xs md:text-sm text-white font-semibold drop-shadow-sm line-clamp-2">
                      {img.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* FOOTER */}

            <p className="mt-10 text-xs md:text-sm text-center text-gray-500 dark:text-gray-400">
              {t("footerText")}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Gallery;
