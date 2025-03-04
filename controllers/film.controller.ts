import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { FilmRepository } from "../repositories/film.repository.ts";
import { ConversionService } from "../services/conversion.service.ts";
import { FilmDTO } from "../dtos/film.dto.ts";
import { Film } from "../models/film.model.ts";

const filmRepo = new FilmRepository();

export class FilmController {
  // Récupère tous les films
  // Code HTTP - 200 OK sur réussite
  static async getAll(ctx: RouterContext) {
    const films: Film[] = filmRepo.getAll();
    ctx.response.status = 200;
    ctx.response.body = films.map(ConversionService.toFilmDTO);
  }

  // Récupère un film par son id
  // Code HTTP - 200 OK si trouvé, 404 Not Found sinon
  static async getById(ctx: RouterContext) {
    const id = Number(ctx.params.id);
    const film = filmRepo.getById(id);
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
    const body = await ctx.request.body().value;
    const filmDTO: FilmDTO = body;
    const film: Film = ConversionService.toFilm(filmDTO);
    const createdFilm = filmRepo.create(film);
    ctx.response.status = 201;
    ctx.response.body = ConversionService.toFilmDTO(createdFilm);
  }

  // Met à jour un film existant
  // Code HTTP - 200 OK si mis à jour, 404 Not Found sinon
  static async update(ctx: RouterContext) {
    const id = Number(ctx.params.id);
    const existingFilm = filmRepo.getById(id);
    if (!existingFilm) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Film not found" };
      return;
    }
    const body = await ctx.request.body().value;
    // Ici, on suppose que le body contient un FilmDTO complet, ajustez si besoin pour une mise à jour partielle
    const filmDTO: FilmDTO = body;
    // Conversion inversée pour avoir un Film modifiable
    const filmUpdates: Partial<Film> = ConversionService.toFilm(filmDTO);
    const updatedFilm = filmRepo.update(id, filmUpdates);
    ctx.response.status = 200;
    ctx.response.body = ConversionService.toFilmDTO(updatedFilm as Film);
  }

  // Supprime un film
  // Code HTTP - 204 No Content sur réussite, 404 Not Found si inexistant
  static async delete(ctx: RouterContext) {
    const id = Number(ctx.params.id);
    const success = filmRepo.delete(id);
    if (!success) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Film not found" };
      return;
    }
    ctx.response.status = 204;
  }
}