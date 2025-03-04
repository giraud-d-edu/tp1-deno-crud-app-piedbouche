import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { ActeurRepository } from "../repositories/acteur.repository.ts";
import { ConversionService } from "../services/conversion.service.ts";
import { ActeurDTO } from "../dtos/acteur.dto.ts";
import { Acteur } from "../models/acteurs.model.ts";

const acteurRepo = new ActeurRepository();

export class ActeurController {
  // Récupère tous les acteurs
  // 200 OK sur réussite
  static async getAll(ctx: RouterContext) {
    const acteurs: Acteur[] = acteurRepo.getAll();
    ctx.response.status = 200;
    ctx.response.body = acteurs.map(ConversionService.toActeurDTO);
  }

  // Récupère un acteur par son id
  // 200 OK si trouvé, 404 Not Found sinon
  static async getById(ctx: RouterContext) {
    const id = Number(ctx.params.id);
    const acteur = acteurRepo.getById(id);
    if (!acteur) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Acteur not found" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = ConversionService.toActeurDTO(acteur);
  }

  // Crée un nouvel acteur
  // 201 Created sur réussite
  static async create(ctx: RouterContext) {
    const body = await ctx.request.body().value;
    const acteurDTO: ActeurDTO = body;
    const acteur: Acteur = ConversionService.toActeur(acteurDTO);
    const createdActeur = acteurRepo.create(acteur);
    ctx.response.status = 201;
    ctx.response.body = ConversionService.toActeurDTO(createdActeur);
  }

  // Met à jour un acteur existant
  // 200 OK si mis à jour, 404 Not Found sinon
  static async update(ctx: RouterContext) {
    const id = Number(ctx.params.id);
    const existingActeur = acteurRepo.getById(id);
    if (!existingActeur) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Acteur not found" };
      return;
    }
    const body = await ctx.request.body().value;
    const acteurDTO: ActeurDTO = body;
    const acteurUpdates: Partial<Acteur> = ConversionService.toActeur(acteurDTO);
    const updatedActeur = acteurRepo.update(id, acteurUpdates);
    ctx.response.status = 200;
    ctx.response.body = ConversionService.toActeurDTO(updatedActeur as Acteur);
  }

  // Supprime un acteur
  // 204 No Content si la suppression réussit, 404 Not Found sinon
  static async delete(ctx: RouterContext) {
    const id = Number(ctx.params.id);
    const success = acteurRepo.delete(id);
    if (!success) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Acteur not found" };
      return;
    }
    ctx.response.status = 204;
  }
}