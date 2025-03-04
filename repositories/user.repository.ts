import { User } from "../models/users.model.ts";
import { db } from "../db.ts";
import { ObjectId } from "npm:mongodb@5.6.0";

export class UserRepository {
  private userCollection = db.collection("users");

  async getAll(): Promise<User[]> {
    return await this.userCollection.find({}).toArray();
  }

  async getById(id: string): Promise<User | null> {
    return await this.userCollection.findOne({ _id: new ObjectId(id) });
  }

  async create(user: User): Promise<User> {
    delete user.id;
    const insertedId = await this.userCollection.insertOne(user);
    return { ...user, id: insertedId.toString() };
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const { _id, ...updateData } = userData;
    const { modifiedCount } = await this.userCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    if (modifiedCount === 0) return null;
    return await this.getById(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleteCount = await this.userCollection.deleteOne({ _id: new ObjectId(id) });
    return deleteCount > 0;
  }
}