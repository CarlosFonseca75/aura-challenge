import { AppDataSource } from "../data-source";
import { User } from "../entity/user";

interface IUserRepository {
  find(): Promise<User[]>;
}

export class UserRepository implements IUserRepository {
  private repository = AppDataSource.getRepository(User);

  async find() {
    return this.repository.find();
  }
}
