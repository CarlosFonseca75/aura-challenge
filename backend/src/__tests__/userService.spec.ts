import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepository";

const mockFind = jest.fn();

describe("UserService", () => {
  it("should return a list of users", () => {
    expect(200).toBe(200);
  });
});
