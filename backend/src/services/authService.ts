import type { ApiResponse } from "../common/types";
import { UserRepository } from "../repositories/userRepository";
import { HttpStatus } from "../common/enums";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  register = async (): Promise<ApiResponse<any>> => {
    const users = await this.userRepository.find();

    return {
      success: true,
      message: `Works!`,
      data: users,
      status: HttpStatus.OK,
      timestamp: new Date(),
    };
  };
}
