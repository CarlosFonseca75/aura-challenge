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
