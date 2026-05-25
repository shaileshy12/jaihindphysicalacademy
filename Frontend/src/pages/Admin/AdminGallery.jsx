// src/pages/Admin/AdminGallery.jsx

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";
import CloudinaryMedia from "../../components/CloudinaryMedia";

const AdminGallery = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    media: null,
  });

  // ================= FETCH MEDIA =================

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/api/v1/user/gallery`);

      setMedia(res.data.data || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // ================= HANDLE FILE =================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // ================= VALID MIME TYPES =================

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",

      "video/mp4",
      "video/mov",
      "video/avi",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Unsupported file type");

      return;
    }

    // ================= FILE SIZE =================

    const maxSize = 20 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("File size exceeds 20MB");

      return;
    }

    setFormData((prev) => ({
      ...prev,
      media: file,
    }));
  };

  // ================= UPLOAD MEDIA =================

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!formData.media) {
      return toast.error("Please select media");
    }

    try {
      setUploading(true);

      setUploadProgress(0);

      const uploadData = new FormData();

      uploadData.append("title", formData.title);

      uploadData.append("media", formData.media);

      const res = await API.post(`/api/v1/admin/gallery/upload`, uploadData, {
        timeout: 120000,

        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );

          setUploadProgress(percent);
        },
      });

      toast.success(res.data.message || "Media uploaded successfully");

      setFormData({
        title: "",
        media: null,
      });

      setUploadProgress(0);

      fetchGallery();
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ================= DELETE MEDIA =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this media?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/api/v1/admin/gallery/${id}`);

      fetchGallery();
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  // ================= UI =================

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#111827] p-4 md:p-6 transition-colors duration-300">
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Gallery Manager
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Upload and manage gallery images/videos
        </p>
      </div>

      {/* UPLOAD FORM */}

      <div className="bg-white dark:bg-[#1f2937] rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8 transition-colors duration-300">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          Upload Media
        </h2>

        <form onSubmit={handleUpload} className="space-y-5">
          {/* TITLE */}

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">
              Media Title
            </label>

            <input
              type="text"
              placeholder="Enter title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 dark:bg-[#111827] dark:text-white p-3 outline-none focus:ring-2 focus:ring-[#556b2f]"
            />
          </div>

          {/* FILE */}

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">
              Select Image / Video
            </label>

            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 dark:bg-[#111827] dark:text-white p-3"
            />
          </div>

          {/* BUTTON */}

          <div className="space-y-4">
            {/* PROGRESS BAR */}

            {uploading && (
              <div>
                <div className="flex justify-between text-sm mb-2 text-gray-600 dark:text-gray-300">
                  <span>Uploading...</span>

                  <span>{uploadProgress}%</span>
                </div>

                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#556b2f] transition-all duration-300"
                    style={{
                      width: `${uploadProgress}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* BUTTON */}

            <button
              type="submit"
              disabled={uploading}
              className={`px-6 py-3 rounded-2xl text-white font-medium transition w-full ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#556b2f] hover:bg-[#6b8637]"
              }`}
            >
              {uploading ? `Uploading ${uploadProgress}%` : "Upload Media"}
            </button>
          </div>
        </form>
      </div>

      {/* MEDIA GRID */}

      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Uploaded Media
          </h2>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total: {media.length}
          </span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            Loading gallery...
          </div>
        ) : media.length === 0 ? (
          <div className="bg-white dark:bg-[#1f2937] rounded-3xl border border-gray-200 dark:border-gray-700 p-10 text-center">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
              No Media Found
            </h3>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Upload your first image or video.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {media.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-[#1f2937] rounded-3xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300"
              >
                {/* MEDIA */}

                <div className="aspect-[9/12] overflow-hidden bg-black">
                  <CloudinaryMedia
                    publicId={item.publicId}
                    type={item.mediaType}
                  />
                </div>

                {/* CONTENT */}

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
                    {item.mediaType}
                  </p>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
