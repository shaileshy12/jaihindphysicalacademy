// src/pages/Admin/AdminLogin.jsx

import React, { useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [isResetMode, setIsResetMode] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    recoveryKey: "",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showRecoveryKey, setShowRecoveryKey] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post(
        `/api/v1/admin/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Login successful");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post(`/api/v1/admin/forgot-password`, {
        email: formData.email,
        newPassword: formData.password,
        recoveryKey: formData.recoveryKey,
      });

      if (res.data.success) {
        toast.success("Password reset! You can now log in.");

        setIsResetMode(false);

        setFormData({
          ...formData,
          password: "",
          recoveryKey: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-white/20">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          {isResetMode ? "Reset Password" : "Admin Login"}
        </h1>

        <form
          onSubmit={isResetMode ? handleReset : handleLogin}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Admin Email
            </label>

            <input
              type="email"
              required
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              {isResetMode ? "New Password" : "Password"}
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength="6"
                className="w-full p-3 pr-12 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Recovery Key */}
          {isResetMode && (
            <div>
              <label className="block text-sm font-medium text-red-300 mb-2">
                Master Recovery Key
              </label>

              <div className="relative">
                <input
                  type={showRecoveryKey ? "text" : "password"}
                  required
                  className="w-full p-3 pr-12 rounded-xl bg-red-900/20 border border-red-400/50 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                  value={formData.recoveryKey}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      recoveryKey: e.target.value,
                    })
                  }
                  placeholder="Enter secret key from .env"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowRecoveryKey(!showRecoveryKey)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition"
                >
                  {showRecoveryKey ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#556b2f] to-[#7f9f3f] text-white py-3 rounded-xl font-semibold hover:from-[#7f9f3f] hover:to-[#556b2f] transition-all disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : isResetMode
              ? "Reset & Save"
              : "Login"}
          </button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsResetMode(!isResetMode)}
            className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            {isResetMode
              ? "← Back to Login"
              : "Forgot Password?"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;