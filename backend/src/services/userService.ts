import type { ApiResponse } from "../common/types";
import type { User } from "../entity/user";
import { UserRepository } from "../repositories/userRepository";
import { HttpStatus } from "../common/enums";
import { Dayjs } from "../utils/date";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUsers = async (): Promise<ApiResponse<User[]>> => {
    const users = await this.userRepository.find();

    return {
      success: true,
      message: `We found ${users.length} users!`,
      data: users,
      status: HttpStatus.OK,
      timestamp: Dayjs.nowUtc(),
    };
  };

  getProfile = async (id: string): Promise<ApiResponse<Partial<User>>> => {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return {
        success: false,
        message: "Profile not found!",
        status: HttpStatus.NotFound,
        timestamp: Dayjs.nowUtc(),
      };
    }

    const { password, ...userWithoutPwd } = user;

    return {
      success: true,
      message: "Profile found successfully!",
      data: userWithoutPwd,
      status: HttpStatus.OK,
      timestamp: Dayjs.nowUtc(),
    };
  };

  updateProfile = async (
    id: string,
    data: Partial<User>
  ): Promise<ApiResponse<User>> => {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return {
        success: false,
        message: "Profile not found!",
        status: HttpStatus.NotFound,
        timestamp: Dayjs.nowUtc(),
      };
    }

    const { email } = data;

    if (email) {
      const emailExists = await this.userRepository.findOneByEmail(email);

      if (emailExists.id !== id) {
        return {
          success: false,
          message: "Email already in use!",
          status: HttpStatus.Conflict,
          timestamp: Dayjs.nowUtc(),
        };
      }
    }

    const updatedUser = await this.userRepository.update(id, data);

    return {
      success: true,
      message: "Profile updated successfully!",
      data: updatedUser,
      status: HttpStatus.OK,
      timestamp: Dayjs.nowUtc(),
    };
  };
}
