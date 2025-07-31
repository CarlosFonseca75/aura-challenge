import type { Request, Response } from "express";
import type { CustomRequest } from "../common/types";
import { UserService } from "../services/userService";

export class UserController {
  constructor(private userService: UserService) {}

  getUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getUsers();
    res.status(users.status).json(users);
  };

  getProfile = async (req: CustomRequest, res: Response) => {
    const user = req.user;
    const profile = await this.userService.getProfile(user);
    res.status(profile.status).json(profile);
  };
}
