import type { ApiResponse } from "../common/types";
import { UserRepository } from "../repositories/userRepository";
import { HttpStatus } from "../common/enums";
import { RegisterInput } from "../common/schemas";
import { User } from "../entity/user";
import bcrypt from "bcrypt";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  register = async (data: RegisterInput): Promise<ApiResponse<any>> => {
    const { email, password, firstName, lastName } = data;

    const existingUser = await this.userRepository.findOneByEmail(email);

    if (existingUser) {
      return {
        success: false,
        message: "User already exists. 😅",
        status: HttpStatus.Conflict,
        timestamp: new Date(),
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: Partial<User> = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    };

    const newUser = await this.userRepository.create(user);

    return {
      success: true,
      message: "User registered successfully! 🎉",
      data: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      status: HttpStatus.OK,
      timestamp: new Date(),
    };
  };
}
