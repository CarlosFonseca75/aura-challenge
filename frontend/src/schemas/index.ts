import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .regex(emailRegex, { message: "Invalid email format" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password is too short (min 8)" })
    .max(20, { message: "Password is too long (max 20)" }),
});

export const SignupSchema = z
  .object({
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .regex(emailRegex, { message: "Invalid email format" }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password is too short (min 8)" })
      .max(20, { message: "Password is too long (max 20)" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
