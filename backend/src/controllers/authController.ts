import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const input = req.body;
    const register = await this.authService.register(input);
    res.status(register.status).json(register);
  };

  login = async (req: Request, res: Response) => {
    const input = req.body;
    const register = await this.authService.login(input);
    res.status(register.status).json(register);
  };
}
