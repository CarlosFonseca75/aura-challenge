import { Request, Response } from "express";
import { ApiResponse } from "../types/user";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user";
import chalk from "chalk";

// 🎯 GET /api/users - List all users.
export const getUsers = async (req: Request, res: Response) => {
  console.log(chalk.cyan("🔍 Getting all users..."));

  try {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    const response: ApiResponse<any> = {
      success: true,
      message: `We found ${users.length} users!`,
      data: users,
      timestamp: new Date(),
    };

    res.json(response);
  } catch (error) {
    console.error(chalk.red.bold("❌ Error fetching users:", error));

    const response: ApiResponse<null> = {
      success: false,
      message: "Failed to fetch users",
      error: error.message || "Unknown error",
      timestamp: new Date(),
    };

    res.status(500).json(response);
  }
};
