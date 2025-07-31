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
    const id = req.user.id;
    const profile = await this.userService.getProfile(id);
    res.status(profile.status).json(profile);
  };

  updateProfile = async (req: CustomRequest, res: Response) => {
    const id = req.user.id;
    const data = req.body;
    const profile = await this.userService.updateProfile(id, data);
    res.status(profile.status).json(profile);
  };
}
