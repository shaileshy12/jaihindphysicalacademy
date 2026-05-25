import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  // ================= DARK MODE =================

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem(
      "theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  // ================= FORM STATES =================

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
  });

  // ================= NOTIFICATIONS =================

  const [notifications, setNotifications] = useState(() => {
    const saved =
      localStorage.getItem("adminNotifications");

    return saved
      ? JSON.parse(saved)
      : {
          enquiryAlerts: true,
          dailyDigest: false,
          loginAlerts: true,
          sound: true,
        };
  });

  // Save notification preferences
  useEffect(() => {
    localStorage.setItem(
      "adminNotifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  // ================= FETCH INITIAL DATA =================

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {

  try {

    const config = {
      withCredentials: true,
    };

    const adminRes =
      await API.get(

        `/api/v1/admin/me`,

        config

      );

    if (adminRes.data.success) {

      setProfile({
        fullName:
          adminRes.data.data.fullName || "",

        email:
          adminRes.data.data.email || "",
      });

    }

  }

  catch (error) {

    console.error(
      "Failed to fetch settings",
      error
    );

  }

};

  // ================= UPDATE PASSWORD =================

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      await API.put(
        `/api/v1/admin/change-password`,
        passwords,
      );

      toast.success("✅ Password updated successfully");

      setPasswords({
        oldPassword: "",
        newPassword: "",
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE PROFILE =================

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      await API.put(
        `/api/v1/admin/update-profile`,
        profile,
      );

      toast.success("Profile updated successfully");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= TOGGLE NOTIFICATIONS =================

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // ================= COMMON TOGGLE =================

  const Toggle = ({ enabled, onClick }) => (
    <button
      onClick={onClick}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${
        enabled
          ? "bg-[#556b2f]"
          : "bg-gray-300 dark:bg-gray-700"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
          enabled
            ? "translate-x-8"
            : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 dark:bg-[#111827] min-h-screen transition-colors duration-300">

      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Admin Settings
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage your admin profile, security,
          notifications, and preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* SIDEBAR */}

        <div className="w-full lg:w-72 space-y-2">

          <button
            onClick={() =>
              setActiveTab("profile")
            }
            className={`w-full text-left px-5 py-3 rounded-2xl transition font-medium ${
              activeTab === "profile"
                ? "bg-[#556b2f] text-white shadow-md"
                : "bg-white dark:bg-[#1f2937] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#374151]"
            }`}
          >
            Profile & Security
          </button>

          <button
            onClick={() =>
              setActiveTab("notifications")
            }
            className={`w-full text-left px-5 py-3 rounded-2xl transition font-medium ${
              activeTab === "notifications"
                ? "bg-[#556b2f] text-white shadow-md"
                : "bg-white dark:bg-[#1f2937] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#374151]"
            }`}
          >
            Notifications
          </button>

          <button
            onClick={() =>
              setActiveTab("appearance")
            }
            className={`w-full text-left px-5 py-3 rounded-2xl transition font-medium ${
              activeTab === "appearance"
                ? "bg-[#556b2f] text-white shadow-md"
                : "bg-white dark:bg-[#1f2937] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#374151]"
            }`}
          >
            Appearance
          </button>

          <button
            onClick={() =>
              setActiveTab("sessions")
            }
            className={`w-full text-left px-5 py-3 rounded-2xl transition font-medium ${
              activeTab === "sessions"
                ? "bg-[#556b2f] text-white shadow-md"
                : "bg-white dark:bg-[#1f2937] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#374151]"
            }`}
          >
            Active Sessions
          </button>

        </div>

        {/* CONTENT */}

        <div className="flex-1 bg-white dark:bg-[#1f2937] rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8 transition-colors duration-300">

          {/* PROFILE */}

          {activeTab === "profile" && (
            <div className="space-y-12">

              {/* PROFILE FORM */}

              <section>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Admin Profile
                </h2>

                <form
                  onSubmit={handleUpdateProfile}
                  className="space-y-5 max-w-xl"
                >

                  <div>
                    <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
                      Full Name
                    </label>

                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          fullName:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-[#111827] dark:text-white p-3 outline-none focus:ring-2 focus:ring-[#556b2f]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
                      Email
                    </label>

                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          email:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-[#111827] dark:text-white p-3 outline-none focus:ring-2 focus:ring-[#556b2f]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-[#556b2f] text-white hover:bg-[#6b8637] transition"
                  >
                    {loading
                      ? "Saving..."
                      : "Save Profile"}
                  </button>

                </form>
              </section>

              {/* PASSWORD */}

              <section>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Change Password
                </h2>

                <form
                  onSubmit={handleUpdatePassword}
                  className="space-y-5 max-w-xl"
                >

                  <div>
                    <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
                      Current Password
                    </label>

                    <input
                      type="password"
                      value={
                        passwords.oldPassword
                      }
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          oldPassword:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-[#111827] dark:text-white p-3 outline-none focus:ring-2 focus:ring-[#556b2f]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
                      New Password
                    </label>

                    <input
                      type="password"
                      value={
                        passwords.newPassword
                      }
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          newPassword:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-[#111827] dark:text-white p-3 outline-none focus:ring-2 focus:ring-[#556b2f]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-[#556b2f] text-white hover:bg-[#6b8637] transition"
                  >
                    {loading
                      ? "Updating..."
                      : "Update Password"}
                  </button>

                </form>
              </section>
            </div>
          )}

          {/* NOTIFICATIONS */}

          {activeTab === "notifications" && (
            <div>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Notification Preferences
              </h2>

              <div className="space-y-4">

                {[
                  {
                    key: "enquiryAlerts",
                    title:
                      "New Enquiry Alerts",
                    desc:
                      "Receive instant alerts for new enquiries.",
                  },

                  {
                    key: "dailyDigest",
                    title: "Daily Digest",
                    desc:
                      "Receive summary every morning.",
                  },

                  {
                    key: "loginAlerts",
                    title:
                      "Admin Login Alerts",
                    desc:
                      "Get notified whenever admin logs in.",
                  },

                  {
                    key: "sound",
                    title:
                      "Notification Sounds",
                    desc:
                      "Enable notification sounds.",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-[#111827]"
                  >

                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {item.desc}
                      </p>
                    </div>

                    <Toggle
                      enabled={
                        notifications[
                          item.key
                        ]
                      }
                      onClick={() =>
                        toggleNotification(
                          item.key
                        )
                      }
                    />

                  </div>
                ))}

              </div>
            </div>
          )}

          {/* APPEARANCE */}

          {activeTab === "appearance" && (
            <div>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Appearance
              </h2>

              <div className="flex items-center justify-between p-5 rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-[#111827]">

                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Dark Mode
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Switch between light and dark themes.
                  </p>
                </div>

                <Toggle
                  enabled={isDarkMode}
                  onClick={() =>
                    setIsDarkMode(
                      !isDarkMode
                    )
                  }
                />

              </div>

            </div>
          )}

          {/* SESSIONS */}

          {activeTab === "sessions" && (
            <div>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Active Sessions
              </h2>

              <div className="space-y-4">

                <div className="flex items-center justify-between p-5 rounded-2xl border border-green-200 bg-green-50 dark:bg-green-900/20">

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      Windows PC - Chrome
                    </h3>

                    <p className="text-sm text-green-700 dark:text-green-400">
                      Active Now • Mumbai, India
                    </p>
                  </div>

                  <span className="text-green-700 font-semibold">
                    Current
                  </span>

                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;