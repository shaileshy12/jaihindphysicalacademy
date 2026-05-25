import { z } from "zod";

export const enquirySchema = z.object({

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
    .min(10, "Invalid phone number")
    .max(15, "Phone number too long"),

  course: z
    .string()
    .trim()
    .min(2, "Course is required"),

  location: z
    .string()
    .trim()
    .optional(),

  message: z
    .string()
    .trim()
    .max(500, "Message too long")
    .optional(),

});