import type { Request } from "express";
import { HttpStatus } from "./enums";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  status: HttpStatus;
  timestamp: Date;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface CustomRequest extends Request {
  user: AuthenticatedUser;
}
