import { Router } from "express";

import { validate } from "../middleware/validate.js";

import {
  adminLoginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  updateProfileSchema,
} from "../validations/admin.validation.js";

import {
  updateAdminProfile,
  getWebsiteSettings,
  updateWebsiteSettings,
} from "../controllers/admin.controller.js";

import {
  adminLogin,
  adminLogout,
  uploadGalleryMedia,
  deleteGalleryMedia,
  getGalleryMedia,
  getAdminProfile,
  getAllUsers,
  getAllEnquiries,
  archiveEnquiry,
  getArchivedEnquiries,
  getPendingEnquiries,
  getSolvedEnquiries,
  markEnquirySolved,
  changePassword,
  resetForgotPassword,
} from "../controllers/admin.controller.js";

import { verifyAdmin } from "../middleware/auth.js";

import upload from "../middleware/multer.js";

import {
  loginLimiter,
  forgotPasswordLimiter,
} from "../middleware/rateLimiter.js";

const router = Router();

router.post("/login", loginLimiter, validate(adminLoginSchema), adminLogin);

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  validate(forgotPasswordSchema),
  resetForgotPassword,
);

router.post("/logout", verifyAdmin, adminLogout);

router.get("/me", verifyAdmin, getAdminProfile);

router.get("/users", verifyAdmin, getAllUsers);

router.get("/enquiries", verifyAdmin, getAllEnquiries);

router.get("/enquiries/pending", verifyAdmin, getPendingEnquiries);

router.get("/enquiries/solved", verifyAdmin, getSolvedEnquiries);

router.patch("/enquiries/:enquiryId/solve", verifyAdmin, markEnquirySolved);

router.put(
  "/update-profile",
  verifyAdmin,
  validate(updateProfileSchema),
  updateAdminProfile,
);

router.get("/website-settings", getWebsiteSettings);

router.put("/website-settings", verifyAdmin, updateWebsiteSettings);

router.put(
  "/change-password",
  verifyAdmin,
  validate(changePasswordSchema),
  changePassword,
);

router.post(
  "/gallery/upload",
  verifyAdmin,
  upload.single("media"),
  uploadGalleryMedia,
);

router.delete("/gallery/:id", verifyAdmin, deleteGalleryMedia);

router.patch("/enquiries/:id/archive", verifyAdmin, archiveEnquiry);

router.get("/enquiries/archived", verifyAdmin, getArchivedEnquiries);

export default router;
