import { Film } from "../models/film.model.ts";
import { db } from "../db.ts";
import { ObjectId } from "npm:mongodb@5.6.0"; // Assurez-vous d'importer ObjectId

export class FilmRepository {
  // Référence à la collection "films" dans MongoDB
  private filmCollection = db.collection("films");

  async getAll(): Promise<Film[]> {
    // On récupère tous les documents
    return await this.filmCollection.find({}).toArray();
  }

  async getById(id: string): Promise<Film | null> {
    // Recherche par _id (de type ObjectId)
    return await this.filmCollection.findOne({ _id: new ObjectId(id) });
  }

  async create(film: Film): Promise<Film> {
    // Supprimez l'id s'il existe, MongoDB va en générer un
    delete film.id;
    const insertedId = await this.filmCollection.insertOne(film);
    // assignation de l'id inséré (converti en string ou ObjectId selon vos besoins)
    return { ...film, id: insertedId.toString() };
  }

  async update(id: string, filmData: Partial<Film>): Promise<Film | null> {
    // Supprimez le champ _id des données de mise à jour
    const { _id, ...updateData } = filmData;
    const { modifiedCount } = await this.filmCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    if (modifiedCount === 0) return null;
    return await this.getById(id);
  }

  async delete(id: string): Promise<boolean> {
    const { deletedCount } = await this.filmCollection.deleteOne({ _id: new ObjectId(id) });
    return Number(deletedCount) > 0; // Force la conversion en number
  }
}