import { z } from "zod";

// ================= REGISTER VALIDATION =================

export const registerSchema = z.object({

  fullName: z
    .string()
    .trim()
    .min(2, "Full name is too short")
    .max(50, "Full name is too long"),

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

});

// ================= LOGIN VALIDATION =================

export const loginSchema = z.object({

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

});