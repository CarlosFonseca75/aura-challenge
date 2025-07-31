import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  constructor(private userService: UserService) {}

  getUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getUsers();
    res.status(users.status).json(users);
  };
}
