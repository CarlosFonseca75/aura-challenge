import { HttpStatus } from "@/common/enums";

export type Status = "idle" | "loading" | "error" | "success";

export interface SignupUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  status: HttpStatus;
  timestamp: Date;
}

export interface MenuItem {
  title: string;
  href: string;
  ariaLabel?: string;
}
