import rateLimit from "express-rate-limit";

// ================= LOGIN LIMITER =================

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 5,

  standardHeaders: true,

  legacyHeaders: false,

  skipSuccessfulRequests: true,

  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },
});

// ================= REGISTER LIMITER =================

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour

  max: 3,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many registration attempts. Try again later.",
  },
});

// ================= FORGOT PASSWORD LIMITER =================

export const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 3,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many password reset attempts. Try again later.",
  },
});

// ================= ENQUIRY LIMITER =================

export const enquiryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,

  max: 5,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many enquiries submitted. Please wait.",
  },
});

// ================= UPLOAD LIMITER =================

export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 20,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many uploads. Try again later.",
  },
});
