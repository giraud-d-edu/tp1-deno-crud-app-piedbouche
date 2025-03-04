import { Acteur } from "../models/acteurs.model.ts";
import { db } from "../db.ts";
import { ObjectId } from "npm:mongodb@5.6.0";

export class ActeurRepository {
  private acteurCollection = db.collection("acteurs");

  async getAll(): Promise<Acteur[]> {
    return await this.acteurCollection.find({}).toArray();
  }

  async getById(id: string): Promise<Acteur | null> {
    return await this.acteurCollection.findOne({ _id: new ObjectId(id) });
  }

  async create(acteur: Acteur): Promise<Acteur> {
    delete acteur.id;
    const insertedId = await this.acteurCollection.insertOne(acteur);
    return { ...acteur, id: insertedId.toString() };
  }

  async update(id: string, acteurData: Partial<Acteur>): Promise<Acteur | null> {
    const { _id, ...updateData } = acteurData;
    const { modifiedCount } = await this.acteurCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    if (modifiedCount === 0) return null;
    return await this.getById(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleteCount = await this.acteurCollection.deleteOne({ _id: new ObjectId(id) });
    return deleteCount > 0;
  }
}