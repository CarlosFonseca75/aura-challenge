import type { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const data = req.body;
    const register = await this.authService.register(data);
    res.status(register.status).json(register);
  };

  login = async (req: Request, res: Response) => {
    const data = req.body;
    const register = await this.authService.login(data);
    res.status(register.status).json(register);
  };
}
