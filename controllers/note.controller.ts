import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { NoteRepository } from "../repositories/note.repository.ts";
import { ConversionService } from "../services/conversion.service.ts";
import { NoteDTO } from "../dtos/note.dto.ts";
import { Note } from "../models/note.model.ts";

const noteRepo = new NoteRepository();

export class NoteController {
  // Récupère toutes les notes - 200 OK
  static async getAll(ctx: RouterContext) {
    const notes: Note[] = noteRepo.getAll();
    ctx.response.status = 200;
    ctx.response.body = notes.map(ConversionService.toNoteDTO);
  }

  // Récupère une note par son id - 200 OK si trouvé, 404 sinon
  static async getById(ctx: RouterContext) {
    const id = Number(ctx.params.id);
    const note = noteRepo.getById(id);
    if (!note) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Note not found" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = ConversionService.toNoteDTO(note);
  }

  // Crée une nouvelle note - 201 Created
  static async create(ctx: RouterContext) {
    const body = await ctx.request.body().value;
    const noteDTO: NoteDTO = body;
    const note: Note = ConversionService.toNote(noteDTO);
    const createdNote = noteRepo.create(note);
    ctx.response.status = 201;
    ctx.response.body = ConversionService.toNoteDTO(createdNote);
  }

  // Met à jour une note existante - 200 OK si mis à jour, 404 sinon
  static async update(ctx: RouterContext) {
    const id = Number(ctx.params.id);
    const existingNote = noteRepo.getById(id);
    if (!existingNote) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Note not found" };
      return;
    }
    const body = await ctx.request.body().value;
    const noteDTO: NoteDTO = body;
    const noteUpdates: Partial<Note> = ConversionService.toNote(noteDTO);
    const updatedNote = noteRepo.update(id, noteUpdates);
    ctx.response.status = 200;
    ctx.response.body = ConversionService.toNoteDTO(updatedNote as Note);
  }

  // Supprime une note - 204 No Content si supprimé, 404 sinon
  static async delete(ctx: RouterContext) {
    const id = Number(ctx.params.id);
    const success = noteRepo.delete(id);
    if (!success) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Note not found" };
      return;
    }
    ctx.response.status = 204;
  }
}