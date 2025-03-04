import { User } from "../models/users.model.ts";

export class UserRepository {
  private users: User[] = [];
  private currentId = 1;

  getAll(): User[] {
    return this.users;
  }

  getById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  create(user: User): User {
    user.id = this.currentId++;
    this.users.push(user);
    return user;
  }

  update(id: number, userData: Partial<User>): User | undefined {
    const user = this.getById(id);
    if (!user) return undefined;
    Object.assign(user, userData);
    return user;
  }

  delete(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}