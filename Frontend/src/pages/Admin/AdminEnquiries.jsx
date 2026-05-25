// src/pages/Admin/AdminEnquiries.jsx

import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../services/api";

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("all");

  const [refreshing, setRefreshing] = useState(false);

  // ================= FETCH =================

  const fetchEnquiries = async () => {
    try {
      setRefreshing(true);

      let endpoint = "/api/v1/admin/enquiries";

      if (activeTab === "pending") {
        endpoint += "/pending";
      } else if (activeTab === "solved") {
        endpoint += "/solved";
      } else if (activeTab === "archived") {
        endpoint += "/archived";
      }

      const res = await API.get(endpoint);

      setEnquiries(res.data?.data || res.data?.enquiries || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch enquiries");

      setEnquiries([]);
    } finally {
      setLoading(false);

      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [activeTab]);

  // ================= ACTIONS =================

  const markSolved = async (id) => {
    try {
      await API.patch(`/api/v1/admin/enquiries/${id}/solve`);

      toast.success("Enquiry marked solved");

      fetchEnquiries();
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  const archiveEnquiry = async (id) => {
    try {
      await API.patch(`/api/v1/admin/enquiries/${id}/archive`);

      toast.success("Enquiry archived");

      fetchEnquiries();
    } catch (error) {
      toast.error(error.response?.data?.message || "Archive failed");
    }
  };

  const deleteEnquiry = async (id) => {
    const confirmDelete = window.confirm("Delete enquiry permanently?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/api/v1/admin/enquiries/${id}`);

      toast.success("Enquiry deleted");

      fetchEnquiries();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  // ================= FILTERED =================

  const filteredEnquiries = enquiries.filter((e) => {
    if (activeTab === "all") return true;

    return e.status === activeTab;
  });

  // ================= TABS =================

  const tabs = ["all", "pending", "solved", "archived"];

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-12 h-12 border-4 border-[#556b2f]/20 border-t-[#556b2f] rounded-full animate-spin" />

        <p className="mt-4 text-sm text-gray-500">Loading enquiries...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 py-4 sm:py-6">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Enquiries
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage all student enquiries
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
          disabled={refreshing}
          className="
            w-full
            sm:w-fit
            px-5
            py-3
            rounded-2xl
            bg-[#556b2f]
            hover:bg-[#6b8637]
            text-white
            font-medium
            transition
          "
        >
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* ================= TABS ================= */}

      <div className="flex gap-3 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              shrink-0
              px-4
              py-2.5
              rounded-xl
              text-sm
              font-medium
              capitalize
              transition
              ${
                activeTab === tab
                  ? "bg-[#556b2f] text-white"
                  : "bg-white border border-gray-200 text-gray-700"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= EMPTY ================= */}

      {filteredEnquiries.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            No enquiries found
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Enquiries will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enquiry) => (
            <div
              key={enquiry._id}
              className="
                  bg-white
                  border
                  border-gray-200
                  rounded-3xl
                  p-4
                  sm:p-5
                  shadow-sm
                "
            >
              {/* TOP */}

              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 break-words">
                    {enquiry.fullName}
                  </h2>

                  <p className="text-sm text-gray-500 break-all mt-1">
                    {enquiry.email}
                  </p>
                </div>

                <span
                  className={`
                      shrink-0
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      capitalize
                      ${
                        enquiry.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : enquiry.status === "solved"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                      }
                    `}
                >
                  {enquiry.status}
                </span>
              </div>

              {/* DETAILS */}

              <div className="space-y-3 mb-5">
                <div>
                  <p className="text-xs text-gray-500">Phone</p>

                  <p className="text-sm font-medium text-gray-900 break-all">
                    {enquiry.phone}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Course</p>

                  <p className="text-sm font-medium text-gray-900 break-words">
                    {enquiry.course}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Location</p>

                  <p className="text-sm font-medium text-gray-900 break-words">
                    {enquiry.location}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}

              <div className="flex flex-col sm:flex-row gap-3">
                {enquiry.status === "pending" && (
                  <button
                    onClick={() => markSolved(enquiry._id)}
                    className="
                        w-full
                        py-3
                        rounded-2xl
                        bg-[#556b2f]
                        hover:bg-[#6b8637]
                        text-white
                        font-medium
                        transition
                      "
                  >
                    Mark Solved
                  </button>
                )}

                {enquiry.status === "solved" && (
                  <>
                    <button
                      onClick={() => archiveEnquiry(enquiry._id)}
                      className="
                          w-full
                          py-3
                          rounded-2xl
                          bg-blue-500
                          hover:bg-blue-600
                          text-white
                          font-medium
                          transition
                        "
                    >
                      Archive
                    </button>

                    <button
                      onClick={() => deleteEnquiry(enquiry._id)}
                      className="
                          w-full
                          py-3
                          rounded-2xl
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          font-medium
                          transition
                        "
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
