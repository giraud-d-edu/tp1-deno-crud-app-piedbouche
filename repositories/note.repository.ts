import { Note } from "../models/note.model.ts";
import { db } from "../db.ts";
import { ObjectId } from "npm:mongodb@5.6.0";

export class NoteRepository {
  private noteCollection = db.collection("notes");

  async getAll(): Promise<Note[]> {
    return await this.noteCollection.find({}).toArray();
  }

  async getById(id: string): Promise<Note | null> {
    return await this.noteCollection.findOne({ _id: new ObjectId(id) });
  }

  async create(note: Note): Promise<Note> {
    delete note.id;
    const insertedId = await this.noteCollection.insertOne(note);
    return { ...note, id: insertedId.toString() };
  }

  async update(id: string, noteData: Partial<Note>): Promise<Note | null> {
    const { modifiedCount } = await this.noteCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: noteData }
    );
    if (modifiedCount === 0) return null;
    return await this.getById(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleteCount = await this.noteCollection.deleteOne({ _id: new ObjectId(id) });
    return deleteCount > 0;
  }
}