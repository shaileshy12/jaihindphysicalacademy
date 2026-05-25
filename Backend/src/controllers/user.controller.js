import User from "../model/user.model.js";
import Enquiry from "../model/enquiry.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";
import { sendResponse } from "../utils/responseHandler.js";
import jwt from "jsonwebtoken";

const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
};

export const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, email, phone, password } = req.body;

  if (!fullName || !email || !phone || !password) {
    return next(new ApiError(400, "All fields are required"));
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    return next(new ApiError(409, "User already exists with this email"));
  }

  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    phone,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  return sendResponse(res, 201, "User registered successfully", createdUser);
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError(400, "Email and password are required"));
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return next(new ApiError(401, "Invalid credentials"));
  }

  user.lastLogin = new Date();
  user.isOnline = true;

  await user.save();

  const token = user.generateAccessToken();

  const loggedInUser = await User.findById(user._id).select("-password");

  res.cookie("userToken", token, getCookieOptions());

  return sendResponse(res, 200, "User logged in successfully", {
    user: loggedInUser,
    token,
  });
});

export const logoutUser = asyncHandler(async (req, res) => {

  const token = req.cookies?.userToken;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded._id);

      if (user) {
        user.isOnline = false;
        await user.save();
      }

    } catch (error) {
      console.log(error);
    }
  }

  res.clearCookie("userToken", getCookieOptions());

  return sendResponse(res, 200, "User logged out successfully", null);
});

export const createEnquiry = asyncHandler(async (req, res, next) => {
  const { fullName, email, phone, course, location, message } = req.body;

  if (!fullName || !email || !phone || !course) {
    return next(
      new ApiError(400, "Full name, email, phone, and course are required"),
    );
  }

  let userId = null;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    userId = existingUser._id;
  }

  const enquiry = await Enquiry.create({
    fullName: fullName.trim(),
    email: email.toLowerCase().trim(),
    phone: phone.trim(),
    course: course.trim(),
    location: location?.trim() || "",
    message: message?.trim() || "",
    user: userId,
  });

  return sendResponse(res, 201, "Enquiry submitted successfully", enquiry);
});
