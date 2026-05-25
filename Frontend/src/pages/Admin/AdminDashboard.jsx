import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";
import CloudinaryMedia from "../../components/CloudinaryMedia";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    pendingEnquiries: 0,
    solvedEnquiries: 0,
    totalUsers: 0,
  });

  const [galleryMedia, setGalleryMedia] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  // ================= FETCH DASHBOARD STATS =================

  const fetchStats = async () => {
    setRefreshing(true);

    setError(null);

    try {
      const [enquiriesRes, usersRes] = await Promise.all([
        API.get("/api/v1/admin/enquiries", { withCredentials: true }),

        API.get("/api/v1/admin/users", { withCredentials: true }),
      ]);

      const enquiries =
        enquiriesRes.data.data || enquiriesRes.data.enquiries || [];

      const pending = enquiries.filter(
        (e) => e.status?.toLowerCase() === "pending",
      ).length;

      const solved = enquiries.filter(
        (e) => e.status?.toLowerCase() === "solved",
      ).length;

      setStats({
        totalEnquiries: enquiries.length,

        pendingEnquiries: pending,

        solvedEnquiries: solved,

        totalUsers:
          usersRes.data.data?.length || usersRes.data.users?.length || 0,
      });
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message || "Failed to load dashboard stats",
      );
    } finally {
      setLoading(false);

      setRefreshing(false);
    }
  };

  // ================= FETCH GALLERY =================

  const fetchGalleryMedia = async () => {
    try {
      const res = await API.get("/api/v1/user/gallery");

      setGalleryMedia(res.data.data?.slice(0, 4) || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    fetchStats();

    fetchGalleryMedia();
  }, []);

  // ================= STATS CARD =================

  const StatsCard = ({ icon: Icon, title, value, color }) => (
    <div className="group bg-white dark:bg-[#111827] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl text-white shadow-lg ${color}`}>
            <Icon className="w-6 h-6" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {title}
            </p>

            <p className="text-4xl font-bold text-gray-900 dark:text-white mt-1">
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // ================= QUICK ACTION CARD =================

  const QuickActionCard = ({ icon: Icon, title, description, href, color }) => (
    <Link
      to={href}
      className="group block p-6 bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-700 rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-2xl text-white shadow-lg ${color}`}>
          <Icon className="w-6 h-6" />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
            {title}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>

        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </Link>
  );

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#556b2f]/20 border-t-[#556b2f] rounded-full animate-spin mb-5" />

        <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-10">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#556b2f] to-gray-700 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Jai Hind Physical Academy - Manage enquiries & users
          </p>
        </div>

        <button
          onClick={fetchStats}
          disabled={refreshing}
          className="px-6 py-3 bg-gradient-to-r from-[#556b2f] to-[#7f9f3f] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          {refreshing ? "Refreshing..." : "Refresh Stats"}
        </button>
      </div>

      {/* ERROR */}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-3xl p-5 mb-8">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <StatsCard
          title="Total Enquiries"
          value={stats.totalEnquiries}
          color="bg-gradient-to-r from-orange-400 to-orange-500"
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2"
              />
            </svg>
          )}
        />

        <StatsCard
          title="Pending"
          value={stats.pendingEnquiries}
          color="bg-gradient-to-r from-yellow-400 to-yellow-500"
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3"
              />
            </svg>
          )}
        />

        <StatsCard
          title="Solved"
          value={stats.solvedEnquiries}
          color="bg-gradient-to-r from-emerald-400 to-emerald-500"
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        />

        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          color="bg-gradient-to-r from-blue-400 to-blue-500"
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A9 9 0 1118 9"
              />
            </svg>
          )}
        />
      </div>

      {/* QUICK ACTIONS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-14">
        <QuickActionCard
          title="View Enquiries"
          description="Manage student admission enquiries"
          href="/admin/enquiries"
          color="bg-gradient-to-r from-[#556b2f] to-[#7f9f3f]"
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10"
              />
            </svg>
          )}
        />

        <QuickActionCard
          title="Manage Users"
          description="View registered users"
          href="/admin/users"
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5V4H2v16h5"
              />
            </svg>
          )}
        />

        <QuickActionCard
          title="Settings"
          description="Website & admin settings"
          href="/admin/settings"
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-2.21 0-4 1.79-4 4"
              />
            </svg>
          )}
        />

        <QuickActionCard
          title="Manage Gallery"
          description="Upload academy photos & videos"
          href="/admin/gallery"
          color="bg-gradient-to-r from-pink-500 to-rose-500"
          icon={(props) => (
            <svg
              {...props}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586"
              />
            </svg>
          )}
        />
      </div>

      {/* RECENT GALLERY */}

      <div className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Recent Gallery Uploads
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Latest academy photos & videos
            </p>
          </div>

          <Link
            to="/admin/gallery"
            className="px-5 py-3 bg-gradient-to-r from-[#556b2f] to-[#7f9f3f] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Open Gallery Manager
          </Link>
        </div>

        {galleryMedia.length === 0 ? (
          <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-700 rounded-3xl p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Media Uploaded
            </h3>

            <p className="text-gray-500 dark:text-gray-400">
              Upload photos/videos from gallery manager.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {galleryMedia.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-[#111827] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[9/12] bg-black">
                  <CloudinaryMedia
                    publicId={item.publicId}
                    type={item.mediaType}
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {item.mediaType}
                    </span>

                    <span className="text-xs bg-[#556b2f]/10 text-[#556b2f] px-3 py-1 rounded-full">
                      Gallery
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
