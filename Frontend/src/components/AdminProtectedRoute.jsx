// src/components/AdminProtectedRoute.jsx

import React, { useEffect, useState } from "react";

import { Navigate, Outlet } from "react-router-dom";

import API from "../services/api.js";

const AdminProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        await API.get(
          "/api/v1/admin/me",

          {
            withCredentials: true,
          },
        );

        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#556b2f] rounded-full animate-spin" />
      </div>
    );
  }

  // ================= NOT AUTHORIZED =================

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // ================= AUTHORIZED =================

  return <Outlet />;
};

export default AdminProtectedRoute;
