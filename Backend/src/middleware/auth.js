import jwt from "jsonwebtoken";

import Admin from "../model/admin.model.js";

import User from "../model/user.model.js";

import { ApiError } from "../utils/errorHandler.js";

// ================= VERIFY ADMIN =================

export const verifyAdmin = async (req, res, next) => {
  try {
    // ================= GET TOKEN =================

    const token = req.cookies?.adminToken;

    if (!token) {
      return next(new ApiError(401, "Unauthorized access"));
    }

    // ================= VERIFY TOKEN =================

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // ================= FIND ADMIN =================

    const admin = await Admin.findById(decodedToken._id).select("-password");

    if (!admin) {
      return next(new ApiError(401, "Admin not found"));
    }

    // ================= ATTACH ADMIN =================

    req.admin = admin;

    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};

// ================= VERIFY USER =================

export const verifyUser = async (req, res, next) => {
  try {
    // ================= GET TOKEN =================

    const token = req.cookies?.userToken;

    if (!token) {
      return next(new ApiError(401, "Unauthorized access"));
    }

    // ================= VERIFY TOKEN =================

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // ================= FIND USER =================

    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    // ================= ATTACH USER =================

    req.user = user;

    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};
