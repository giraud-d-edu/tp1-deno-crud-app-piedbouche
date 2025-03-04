import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { ActeurRepository } from "../repositories/acteur.repository.ts";
import { ConversionService } from "../services/conversion.service.ts";
import { ActeurDTO } from "../dtos/acteur.dto.ts";
import { ActeurDBO } from "../dbos/acteur.dbo.ts";

const acteurRepo = new ActeurRepository();

export class ActeurController {
  static async getAll(ctx: RouterContext) {
    const acteurs: ActeurDBO[] = await acteurRepo.getAll();
    ctx.response.status = 200;
    ctx.response.body = acteurs.map(ConversionService.toActeurDTO);
  }

  static async getById(ctx: RouterContext) {
    const id = ctx.params.id!;
    const acteur = await acteurRepo.getById(id);
    if (!acteur) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Acteur not found" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = ConversionService.toActeurDTO(acteur);
  }

  static async create(ctx: RouterContext) {
    const body = await ctx.request.body.json();
    const acteurDTO: ActeurDTO = body;
    const acteurDBO: ActeurDBO = ConversionService.toActeurDBO(acteurDTO);
    const createdActeur = await acteurRepo.create(acteurDBO);
    ctx.response.status = 201;
    ctx.response.body = ConversionService.toActeurDTO(createdActeur);
  }

  static async update(ctx: RouterContext) {
    const id = ctx.params.id!;
    const existingActeur = await acteurRepo.getById(id);
    if (!existingActeur) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Acteur not found" };
      return;
    }
    const body = await ctx.request.body.json();
    const acteurDTO: ActeurDTO = body;
    const acteurUpdates: Partial<ActeurDBO> = ConversionService.toActeurDBO(acteurDTO);
    const updatedActeur = await acteurRepo.update(id, acteurUpdates);
    ctx.response.status = 200;
    ctx.response.body = ConversionService.toActeurDTO(updatedActeur as ActeurDBO);
  }

  static async delete(ctx: RouterContext) {
    const id = ctx.params.id!;
    const success = await acteurRepo.delete(id);
    if (!success) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Acteur not found" };
      return;
    }
    ctx.response.status = 204;
  }
}