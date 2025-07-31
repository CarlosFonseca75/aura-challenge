import { ApiResponse } from "../types/user";
import { UserRepository } from "../repositories/userRepository";
import { HttpStatus } from "../enums/http";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  // 🎯 GET /api/users - List all users.
  getUsers = async (): Promise<ApiResponse<any>> => {
    const users = await this.userRepository.find();

    return {
      success: true,
      message: `We found ${users.length} users!`,
      data: users,
      status: HttpStatus.OK,
      timestamp: new Date(),
    };
  };
}
