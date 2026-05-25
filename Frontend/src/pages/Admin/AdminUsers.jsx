import React, { useState, useEffect } from "react";
import API from "../../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH USERS =================

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/api/v1/admin/users`,
      );

      setUsers(res.data.data || []);

    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-lg font-semibold text-gray-600">
          Loading users...
        </div>
      </div>
    );
  }

  // ================= MAIN UI =================

  return (
    <div className="w-full p-3 sm:p-4 md:p-6">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Admin Users
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Monitor all registered users and login activity
          </p>
        </div>

        <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl text-sm font-semibold w-fit">
          Total Users: {users.length}
        </div>

      </div>

      {/* Empty State */}

      {users.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No Users Found
          </h2>

          <p className="text-gray-500 mt-2">
            Users will appear here after registration/login.
          </p>
        </div>
      ) : (

        <>
          {/* ================= MOBILE + TABLET ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:hidden gap-4">

            {users.map((user, index) => (
              <div
                key={user._id || index}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition"
              >

                {/* Top */}

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-gray-900 truncate">
                      {user.fullName}
                    </h2>

                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                      user.isOnline
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.isOnline ? "Online" : "Offline"}
                  </span>

                </div>

                {/* Details */}

                <div className="mt-5 space-y-3 text-sm">

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Phone
                    </span>

                    <span className="font-medium text-gray-800 text-right">
                      {user.phone || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Role
                    </span>

                    <span className="capitalize font-medium text-gray-800">
                      {user.role}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Last Login
                    </span>

                    <span className="text-right text-gray-800">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleString()
                        : "Never"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Joined
                    </span>

                    <span className="text-right text-gray-800">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* ================= DESKTOP TABLE ================= */}

          <div className="hidden xl:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-gray-50 border-b border-gray-200">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      #
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Name
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Phone
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Role
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Last Login
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Joined
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                  {users.map((user, index) => (
                    <tr
                      key={user._id || index}
                      className="hover:bg-gray-50 transition"
                    >

                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          {user.fullName}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {user.email}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {user.phone || "N/A"}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold capitalize">
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.isOnline
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {user.isOnline ? "Online" : "Offline"}
                        </span>

                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleString()
                          : "Never"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default AdminUsers;