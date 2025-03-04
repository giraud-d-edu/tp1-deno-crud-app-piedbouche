import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { FilmRepository } from "../repositories/film.repository.ts";
import { ConversionService } from "../services/conversion.service.ts";
import { FilmDTO } from "../dtos/film.dto.ts";
import { FilmDBO } from "../dbos/film.dbo.ts";

const filmRepo = new FilmRepository();

export class FilmController {
  // Récupère tous les films
  // Code HTTP - 200 OK sur réussite
  static async getAll(ctx: RouterContext) {
    const films: FilmDBO[] = await filmRepo.getAll();
    ctx.response.status = 200;
    ctx.response.body = films.map(ConversionService.toFilmDTO);
  }

  // Récupère un film par son id
  // Code HTTP - 200 OK si trouvé, 404 Not Found sinon
  static async getById(ctx: RouterContext) {
    const id = ctx.params.id!;
    const film = await filmRepo.getById(id);
    if (!film) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Film not found" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = ConversionService.toFilmDTO(film);
  }

  // Crée un nouveau film
  // Code HTTP - 201 Created sur réussite
  static async create(ctx: RouterContext) {
    const body = await ctx.request.body.json();
    const filmDTO: FilmDTO = body;
    const filmDBO: FilmDBO = ConversionService.toFilmDBO(filmDTO);
    const createdFilm = await filmRepo.create(filmDBO);
    ctx.response.status = 201;
    ctx.response.body = ConversionService.toFilmDTO(createdFilm);
  }

  // Met à jour un film existant
  // Code HTTP - 200 OK si mis à jour, 404 Not Found sinon
  static async update(ctx: RouterContext) {
    const id = ctx.params.id!;
    const existingFilm = await filmRepo.getById(id);
    if (!existingFilm) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Film not found" };
      return;
    }
    const body = await ctx.request.body.json();
    // Ici, on suppose que le body contient un FilmDTO complet, ajustez si besoin pour une mise à jour partielle
    const filmDTO: FilmDTO = body;
    // Conversion inversée pour avoir un Film modifiable
    const filmUpdates: Partial<FilmDBO> = ConversionService.toFilmDBO(filmDTO);
    // Supprimez le champ _id des données de mise à jour
    delete filmUpdates._id;
    const updatedFilm = await filmRepo.update(id, filmUpdates);
    ctx.response.status = 200;
    ctx.response.body = ConversionService.toFilmDTO(updatedFilm as FilmDBO);
  }

  // Supprime un film
  // Code HTTP - 204 No Content sur réussite, 404 Not Found si inexistant
  static async delete(ctx: RouterContext) {
    const id = ctx.params.id!;
    try {
      const success = await filmRepo.delete(id);
      if (!success) {
        ctx.response.status = 404;
        ctx.response.body = { message: "Film not found" };
        return;
      }
      ctx.response.status = 204;
    } catch (error) {
      console.error("Delete Error:", error);
      ctx.response.status = 400; // 400 Bad Request si l'ID est mal formé
      ctx.response.body = { message: "Invalid Film ID" };
    }
  }
  
}