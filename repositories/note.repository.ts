import { Note } from "../models/note.model.ts";

export class NoteRepository {
  private notes: Note[] = [];
  private currentId = 1;

  getAll(): Note[] {
    return this.notes;
  }

  getById(id: number): Note | undefined {
    return this.notes.find(note => note.id === id);
  }

  create(note: Note): Note {
    note.id = this.currentId++;
    this.notes.push(note);
    return note;
  }

  update(id: number, noteData: Partial<Note>): Note | undefined {
    const note = this.getById(id);
    if (!note) return undefined;
    Object.assign(note, noteData);
    return note;
  }

  delete(id: number): boolean {
    const index = this.notes.findIndex(note => note.id === id);
    if (index === -1) return false;
    this.notes.splice(index, 1);
    return true;
  }
}