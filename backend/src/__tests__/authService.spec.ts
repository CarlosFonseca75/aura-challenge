import bcrypt from "bcrypt";
import { AuthService } from "../services/authService";
import { UserRepository } from "../repositories/userRepository";
import { HttpStatus } from "../common/enums";
import { User } from "../entity/user";
import { Jwt } from "../utils/jwt";

const mockFindOneByEmail = jest.fn();

jest.mock("../repositories/userRepository", () => {
  return {
    UserRepository: jest.fn().mockImplementation(() => ({
      findOneByEmail: mockFindOneByEmail,
    })),
  };
});

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

jest.mock("../utils/jwt", () => ({
  Jwt: { sign: jest.fn() },
}));

// Casting for Typescript.
const mockCompare = bcrypt.compare as jest.Mock;
const mockSign = Jwt.sign as jest.Mock;

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    const userRepository = new UserRepository();
    authService = new AuthService(userRepository);
  });

  it("should have conflict if email in in use", async () => {
    const fakeUser: Partial<User> = {
      id: "1",
      email: "carlos@example.com",
      firstName: "Carlos",
      lastName: "Fonseca",
    };

    mockFindOneByEmail.mockResolvedValue(fakeUser);

    const result = await authService.register({
      email: "carlos@example.com",
      firstName: "Carlos",
      lastName: "González",
      password: "yourSafePws",
      confirmPassword: "yourSafePws",
    });

    expect(mockFindOneByEmail).toHaveBeenCalledWith("carlos@example.com");
    expect(result.status).toBe(HttpStatus.Conflict);
  });

  it("should return error if password is incorrect", async () => {
    const fakeUser = {
      id: "1",
      email: "carlos@example.com",
      password: "hashedpassword",
      firstName: "Carlos",
      lastName: "Fonseca",
    };

    mockFindOneByEmail.mockResolvedValue(fakeUser);
    mockCompare.mockResolvedValue(false);

    const result = await authService.login({
      email: "carlos@example.com",
      password: "wrongpassword",
    });

    expect(mockCompare).toHaveBeenCalledWith("wrongpassword", "hashedpassword");

    expect(result.status).toBe(HttpStatus.Unauthorized);
  });

  it("should login successfully and return token", async () => {
    const fakeUser = {
      id: "1",
      email: "carlos@example.com",
      password: "hashedpassword",
      firstName: "Carlos",
      lastName: "Fonseca",
    };

    mockFindOneByEmail.mockResolvedValue(fakeUser);
    mockCompare.mockResolvedValue(true);
    mockSign.mockReturnValue("fakeJwt");

    const result = await authService.login({
      email: "carlos@example.com",
      password: "yourSafePwd",
    });

    expect(mockFindOneByEmail).toHaveBeenCalledWith("carlos@example.com");
    expect(mockCompare).toHaveBeenCalledWith("yourSafePwd", "hashedpassword");
    expect(mockSign).toHaveBeenCalledWith({
      id: fakeUser.id,
      email: fakeUser.email,
      firstName: fakeUser.firstName,
      lastName: fakeUser.lastName,
    });
    expect(result.status).toBe(HttpStatus.OK);
    expect(result.data.token).toEqual("fakeJwt");
  });
});
