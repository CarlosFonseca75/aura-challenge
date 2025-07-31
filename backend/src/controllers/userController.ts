import { Request, Response } from "express";
import { ApiResponse } from "../types/user";
import chalk from "chalk";

// 🎯 GET /api/users - List all users.
export const getUsers = (req: Request, res: Response) => {
  console.log(chalk.cyan("🔍 Getting all users..."));

  const response: ApiResponse<any> = {
    success: true,
    message: `We found ${0} users!`,
    data: [],
    timestamp: new Date(),
  };

  res.json(response);
};
