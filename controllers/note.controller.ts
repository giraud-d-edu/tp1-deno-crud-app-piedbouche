import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { NoteRepository } from "../repositories/note.repository.ts";
import { ConversionService } from "../services/conversion.service.ts";
import { NoteDTO } from "../dtos/note.dto.ts";
import { NoteDBO } from "../dbos/note.dbo.ts";

const noteRepo = new NoteRepository();

export class NoteController {
  static async getAll(ctx: RouterContext) {
    const notes: NoteDBO[] = await noteRepo.getAll();
    ctx.response.status = 200;
    ctx.response.body = notes.map(ConversionService.toNoteDTO);
  }

  static async getById(ctx: RouterContext) {
    const id = ctx.params.id!;
    const note = await noteRepo.getById(id);
    if (!note) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Note not found" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = ConversionService.toNoteDTO(note);
  }

  static async create(ctx: RouterContext) {
    const body = await ctx.request.body.json();
    const noteDTO: NoteDTO = body;
    const noteDBO: NoteDBO = ConversionService.toNoteDBO(noteDTO);
    const createdNote = await noteRepo.create(noteDBO);
    ctx.response.status = 201;
    ctx.response.body = ConversionService.toNoteDTO(createdNote);
  }

  static async update(ctx: RouterContext) {
    const id = ctx.params.id!;
    const existingNote = await noteRepo.getById(id);
    if (!existingNote) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Note not found" };
      return;
    }
    const body = await ctx.request.body.json();
    const noteDTO: NoteDTO = body;
    const noteUpdates: Partial<NoteDBO> = ConversionService.toNoteDBO(noteDTO);
    delete noteUpdates._id;
    const updatedNote = await noteRepo.update(id, noteUpdates);
    ctx.response.status = 200;
    ctx.response.body = ConversionService.toNoteDTO(updatedNote as NoteDBO);
  }

  static async delete(ctx: RouterContext) {
      const id = ctx.params.id!;
      try {
        const success = await noteRepo.delete(id);
        if (!success) {
          ctx.response.status = 404;
          ctx.response.body = { message: "Note not found" };
          return;
        }
        ctx.response.status = 204;
      } catch (error) {
        console.error("Delete Error:", error);
        ctx.response.status = 400; // 400 Bad Request si l'ID est mal formé
        ctx.response.body = { message: "Invalid Note ID" };
      }
    }
}