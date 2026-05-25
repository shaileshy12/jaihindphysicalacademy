import { z } from "zod";

// ================= ADMIN LOGIN =================

export const adminLoginSchema = z.object({

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

});

// ================= CHANGE PASSWORD =================

export const changePasswordSchema = z.object({

  oldPassword: z
    .string()
    .min(6, "Old password is required"),

  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters"),

});

// ================= FORGOT PASSWORD =================

export const forgotPasswordSchema = z.object({

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  recoveryKey: z
    .string()
    .min(5, "Recovery key is required"),

});

// ================= UPDATE PROFILE =================

export const updateProfileSchema = z.object({

  fullName: z
    .string()
    .trim()
    .min(2, "Name too short")
    .max(50, "Name too long")
    .optional(),

  email: z
    .string()
    .trim()
    .email("Invalid email")
    .optional(),

});