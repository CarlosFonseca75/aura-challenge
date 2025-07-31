import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerSchema = z.object({
  email: z
    .string("Email is required.")
    .regex(emailRegex, { message: "Invalid email format." }),
  firstName: z.string("FirstName is required."),
  lastName: z.string("LastName is required."),
  password: z
    .string("Password is required.")
    .min(8, { message: "Password must be at least 8 characters." }),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string("Email is required.")
    .regex(emailRegex, { message: "Invalid email format." }),
  password: z.string("Password is required."),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const updateProfileSchema = z
  .object({
    email: z
      .string()
      .regex(emailRegex, { message: "Invalid email format." })
      .optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .strict();

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
