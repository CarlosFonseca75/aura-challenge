import { AppDataSource } from "../data-source";
import { User } from "../entity/user";

interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  find(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  update(id: string, data: Partial<User>): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
  private repository = AppDataSource.getRepository(User);

  async create(data: Partial<User>): Promise<User> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  async find(): Promise<User[]> {
    return this.repository.find({
      select: [
        "id",
        "email",
        "firstName",
        "lastName",
        "createdAt",
        "updatedAt",
      ],
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }
}
