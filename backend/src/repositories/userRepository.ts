import { AppDataSource } from "../data-source";
import { User } from "../entity/user";

interface IUserRepository {
  find(): Promise<User[]>;
  findOneByEmail(email: string): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
  findById(id: string): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
  private repository = AppDataSource.getRepository(User);

  async find() {
    return this.repository.find();
  }

  async findOneByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async create(data: Partial<User>) {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }
}
