import type { ApiResponse, LoginResponse } from "../common/types";
import type { RegisterInput, LoginInput } from "../common/schemas";
import type { User } from "../entity/user";
import { UserRepository } from "../repositories/userRepository";
import { HttpStatus } from "../common/enums";
import { Jwt } from "../utils/jwt";
import { Dayjs } from "../utils/date";
import bcrypt from "bcrypt";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  register = async (
    data: RegisterInput
  ): Promise<ApiResponse<Partial<User>>> => {
    const { email, password, firstName, lastName } = data;

    const existingUser = await this.userRepository.findOneByEmail(email);

    if (existingUser) {
      return {
        success: false,
        message: "Invalid credentials!",
        status: HttpStatus.Conflict,
        timestamp: Dayjs.nowUtc(),
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
      message: "User registered successfully!",
      data: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      status: HttpStatus.Created,
      timestamp: Dayjs.nowUtc(),
    };
  };

  login = async (data: LoginInput): Promise<ApiResponse<LoginResponse>> => {
    const { email, password } = data;

    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      return {
        success: false,
        message: "Invalid credentials!",
        status: HttpStatus.Unauthorized,
        timestamp: Dayjs.nowUtc(),
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid credentials!",
        status: HttpStatus.Unauthorized,
        timestamp: Dayjs.nowUtc(),
      };
    }

    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const jwt = Jwt.sign(payload);

    // TODO: Add two-factor authentication.

    return {
      success: true,
      message: "User logged in successfully!",
      data: { ...payload, token: jwt },
      status: HttpStatus.OK,
      timestamp: Dayjs.nowUtc(),
    };
  };
}
