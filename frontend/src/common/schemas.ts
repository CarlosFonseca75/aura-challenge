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
    .min(8, { message: "Password is too short (min 8)" }),
});
