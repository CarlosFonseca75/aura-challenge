import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepository";
import { Dayjs } from "../utils/date";
import { HttpStatus } from "../common/enums";

const mockFind = jest.fn();

jest.mock("../repositories/userRepository", () => {
  return {
    UserRepository: jest.fn().mockImplementation(() => ({
      find: mockFind,
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
    const fakeUsers = [
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
});
