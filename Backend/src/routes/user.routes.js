import { Router } from "express";

import { verifyUser } from "../middleware/auth.js";

import { validate } from "../middleware/validate.js";

import {
  registerSchema,
  loginSchema,
} from "../validations/auth.validation.js";

import {
  enquirySchema,
} from "../validations/enquiry.validation.js";

import {
  registerUser,
  loginUser,
  logoutUser,
  createEnquiry,
} from "../controllers/user.controller.js";

import { getGalleryMedia } from "../controllers/admin.controller.js";

import {
  loginLimiter,
  enquiryLimiter,
  registerLimiter,
} from "../middleware/rateLimiter.js";

const router = Router();

// ================= AUTH ROUTES =================

// Register
router.post("/register", registerLimiter, validate(registerSchema), registerUser);

// Login
router.post("/login", loginLimiter, validate(loginSchema), loginUser);

// Logout
router.post("/logout", verifyUser, logoutUser);

// ================= ENQUIRY =================

router.post("/enquiry", enquiryLimiter, validate(enquirySchema), createEnquiry);

// ================= PUBLIC GALLERY =================

router.get("/gallery", getGalleryMedia);

export default router;
