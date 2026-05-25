import Admin from "../model/admin.model.js";
import User from "../model/user.model.js";
import Enquiry from "../model/enquiry.model.js";
import Setting from "../model/settings.model.js"; // <-- Added Setting model import
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";
import { sendResponse } from "../utils/responseHandler.js";
import Gallery from "../model/gallery.model.js";
import cloudinary from "../config/cloudinary.js";

const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
};

export const adminLogin = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;

  email = email?.trim().toLowerCase();
  password = password?.trim();

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return next(new ApiError(404, "Admin not found"));
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return next(new ApiError(401, "Invalid credentials"));
  }

  admin.lastLogin = new Date();
  admin.isOnline = true;

  await admin.save();

  const token = admin.generateAccessToken();
  const loggedInAdmin = await Admin.findById(admin._id).select("-password");

  res.cookie("adminToken", token, getCookieOptions());

  return sendResponse(res, 200, "Admin logged in successfully", {
    admin: loggedInAdmin,
  });
});

export const adminLogout = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    admin.isOnline = false;
    await admin.save();
  }

  res.clearCookie("adminToken", getCookieOptions());

  return sendResponse(res, 200, "Admin logged out successfully", null);
});

export const getAdminProfile = asyncHandler(async (req, res, next) => {
  if (!req.admin) {
    return next(new ApiError(401, "Unauthorized"));
  }

  return sendResponse(
    res,
    200,
    "Admin profile fetched successfully",
    req.admin,
  );
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const admins = await Admin.find().select("-password").sort({ lastLogin: -1 });

  return sendResponse(res, 200, "All admins fetched successfully", admins);
});

export const getAllEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find()
    .populate("user", "fullName email phone")
    .populate("solvedBy", "fullName email")
    .sort({ createdAt: -1 });

  return sendResponse(
    res,
    200,
    "All enquiries fetched successfully",
    enquiries,
  );
});

export const getPendingEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find({ status: "pending" })
    .populate("user", "fullName email phone")
    .populate("solvedBy", "fullName email")
    .sort({ createdAt: -1 });

  return sendResponse(
    res,
    200,
    "Pending enquiries fetched successfully",
    enquiries,
  );
});

export const getSolvedEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find({ status: "solved" })
    .populate("user", "fullName email phone")
    .populate("solvedBy", "fullName email")
    .sort({ createdAt: -1 });

  return sendResponse(
    res,
    200,
    "Solved enquiries fetched successfully",
    enquiries,
  );
});

export const markEnquirySolved = asyncHandler(async (req, res, next) => {
  const { enquiryId } = req.params;

  if (!enquiryId) {
    return next(new ApiError(400, "Enquiry id is required"));
  }

  const enquiry = await Enquiry.findById(enquiryId);

  if (!enquiry) {
    return next(new ApiError(404, "Enquiry not found"));
  }

  if (enquiry.status === "solved") {
    return next(new ApiError(400, "Enquiry is already marked as solved"));
  }

  enquiry.status = "solved";
  enquiry.solvedBy = req.admin._id;
  enquiry.solvedAt = new Date();

  await enquiry.save();

  const updatedEnquiry = await Enquiry.findById(enquiry._id)
    .populate("user", "fullName email phone")
    .populate("solvedBy", "fullName email");

  return sendResponse(res, 200, "Enquiry marked as solved", updatedEnquiry);
});

// 1. CHANGE PASSWORD (When logged in via Settings page)
export const changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new ApiError(400, "Old and new passwords are required"));
  }

  // Find admin using the token data (req.admin is set by verifyAdmin middleware)
  const admin = await Admin.findById(req.admin._id);

  // Check if old password matches
  const isMatch = await admin.isPasswordCorrect(oldPassword);
  if (!isMatch) {
    return next(new ApiError(401, "Old password is incorrect"));
  }

  // Save new password (your admin.model.js will automatically hash it!)
  admin.password = newPassword;
  await admin.save();

  return sendResponse(res, 200, "Password updated successfully", null);
});

// 2. FORGOT PASSWORD (When locked out via Login page)
export const resetForgotPassword = asyncHandler(async (req, res, next) => {
  const { email, newPassword, recoveryKey } = req.body;

  if (!email || !newPassword || !recoveryKey) {
    return next(new ApiError(400, "All fields are required"));
  }

  // Check if they know the secret Master Key from the .env file
  if (recoveryKey !== process.env.ADMIN_RECOVERY_KEY) {
    return next(new ApiError(401, "Invalid Master Recovery Key"));
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) {
    return next(new ApiError(404, "Admin account not found"));
  }

  // Save new password
  admin.password = newPassword;
  await admin.save();

  return sendResponse(
    res,
    200,
    "Password reset successfully. You can now login.",
    null,
  );
});

// 3. UPDATE ADMIN PROFILE (Name & Email)
export const updateAdminProfile = asyncHandler(async (req, res, next) => {
  const { fullName, email } = req.body;
  const admin = await Admin.findById(req.admin._id);

  if (fullName) admin.fullName = fullName;
  if (email) admin.email = email.toLowerCase();

  await admin.save();
  return sendResponse(res, 200, "Profile updated successfully", admin);
});

// 4. GET GLOBAL WEBSITE SETTINGS
export const getWebsiteSettings = asyncHandler(async (req, res) => {
  let settings = await Setting.findOne();
  // If no settings exist yet, create default ones
  if (!settings) {
    settings = await Setting.create({});
  }
  return sendResponse(res, 200, "Settings fetched successfully", settings);
});

// 5. UPDATE GLOBAL WEBSITE SETTINGS
export const updateWebsiteSettings = asyncHandler(async (req, res) => {
  let settings = await Setting.findOne();
  if (!settings) {
    settings = new Setting();
  }

  // Update all provided fields
  Object.assign(settings, req.body);
  await settings.save();

  return sendResponse(
    res,
    200,
    "Website settings updated successfully",
    settings,
  );
});

export const uploadGalleryMedia = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ApiError(400, "Media is required"));
  }

  const mediaType = req.file.mimetype.startsWith("video") ? "video" : "image";

  const media = await Gallery.create({
    title: req.body.title || "Gallery Media",

    publicId: req.file.filename,

    secureUrl: req.file.path,

    mediaType,

    uploadedBy: null,
  });

  return sendResponse(res, 201, "Media uploaded successfully", media);
});

export const getGalleryMedia = asyncHandler(async (req, res) => {
  const media = await Gallery.find().sort({ createdAt: -1 });

  return sendResponse(res, 200, "Gallery fetched successfully", media);
});

export const deleteGalleryMedia = asyncHandler(async (req, res, next) => {
  const media = await Gallery.findById(req.params.id);

  if (!media) {
    return next(new ApiError(404, "Media not found"));
  }

  await cloudinary.uploader.destroy(media.publicId, {
    resource_type: media.mediaType === "video" ? "video" : "image",
  });

  await media.deleteOne();

  return sendResponse(res, 200, "Media deleted successfully");
});

export const archiveEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      {
        status: "archived",
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getArchivedEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({
      status: "archived",
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
