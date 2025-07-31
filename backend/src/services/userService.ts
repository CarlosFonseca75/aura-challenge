import type { ApiResponse, AuthenticatedUser } from "../common/types";
import { UserRepository } from "../repositories/userRepository";
import { HttpStatus } from "../common/enums";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUsers = async (): Promise<ApiResponse<any>> => {
    const users = await this.userRepository.find();

    return {
      success: true,
      message: `We found ${users.length} users! 🎉`,
      data: users,
      status: HttpStatus.OK,
      timestamp: new Date(),
    };
  };

  getProfile = async (data: AuthenticatedUser): Promise<ApiResponse<any>> => {
    const { id } = data;

    const user = await this.userRepository.findById(id);

    if (!user) {
      return {
        success: false,
        message: "Profile not found! 😅",
        status: HttpStatus.NotFound,
        timestamp: new Date(),
      };
    }

    const { password, ...userWithoutPwd } = user;

    return {
      success: true,
      message: "Profile found successfully! 🎉",
      data: userWithoutPwd,
      status: HttpStatus.OK,
      timestamp: new Date(),
    };
  };
}
