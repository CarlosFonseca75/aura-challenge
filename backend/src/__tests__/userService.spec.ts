import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepository";
import { Dayjs } from "../utils/date";
import { HttpStatus } from "../common/enums";
import { User } from "../entity/user";

const mockFind = jest.fn();
const mockFindById = jest.fn();

jest.mock("../repositories/userRepository", () => {
  return {
    UserRepository: jest.fn().mockImplementation(() => ({
      find: mockFind,
      findById: mockFindById,
    })),
  };
});

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    jest.clearAllMocks();
    const userRepository = new UserRepository();
    userService = new UserService(userRepository);
  });

  it("should return a list of users", async () => {
    const fakeUsers: Partial<User>[] = [
      {
        id: "1",
        email: "carlos@example.com",
        firstName: "Carlos Antonio",
        lastName: "Díaz Fonseca",
        createdAt: Dayjs.nowUtc(),
        updatedAt: Dayjs.nowUtc(),
      },
    ];

    mockFind.mockResolvedValue(fakeUsers);

    const result = await userService.getUsers();

    expect(mockFind).toHaveBeenCalledTimes(1);
    expect(result.status).toBe(HttpStatus.OK);
    expect(result.data).toEqual(fakeUsers);
    expect(result.data.length).toBe(1);
  });

  it("should return a user profile", async () => {
    const fakeUser: Partial<User> = {
      id: "1",
      email: "carlos@example.com",
      firstName: "Carlos Antonio",
      lastName: "Díaz Fonseca",
      createdAt: Dayjs.nowUtc(),
      updatedAt: Dayjs.nowUtc(),
    };

    mockFindById.mockResolvedValue(fakeUser);

    const result = await userService.getProfile("1");

    expect(mockFindById).toHaveBeenCalledTimes(1);
    expect(result.status).toBe(HttpStatus.OK);
    expect(result.data).toEqual(fakeUser);
    expect(result.data).not.toHaveProperty("password");
  });

  it("should return not found if user does not exist", async () => {
    mockFindById.mockResolvedValue(null);

    const result = await userService.getProfile("1");

    expect(mockFindById).toHaveBeenCalledTimes(1);
    expect(result.status).toBe(HttpStatus.NotFound);
    expect(result.data).toBeUndefined();
  });
});
