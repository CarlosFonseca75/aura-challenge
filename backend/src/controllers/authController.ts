import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const register = await this.authService.register();
    res.status(register.status).json(register);
  };
}
