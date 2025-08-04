import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// TODO: Add stronger password requirements.
export const registerSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email is required")
      .regex(emailRegex, "Invalid email format"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password is too short (min 8)")
      .max(20, "Password is too long (max 20)"),
    firstName: z.string().nonempty("First Name is required").trim(),
    lastName: z.string().nonempty("Last Name is required").trim(),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .trim()
    .regex(emailRegex, "Invalid email format"),
  password: z.string("Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const updateProfileSchema = z
  .object({
    email: z
      .string()
      .trim()
      .regex(emailRegex, "Invalid email format.")
      .optional(),
    firstName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
  })
  .strict();

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
