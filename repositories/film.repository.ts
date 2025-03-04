import { Film } from "../models/film.model.ts";

export class FilmRepository {
  private films: Film[] = [];
  private currentId = 1;

  getAll(): Film[] {
    return this.films;
  }

  getById(id: number): Film | undefined {
    return this.films.find(film => film.id === id);
  }

  create(film: Film): Film {
    film.id = this.currentId++;
    this.films.push(film);
    return film;
  }

  update(id: number, filmData: Partial<Film>): Film | undefined {
    const film = this.getById(id);
    if (!film) return undefined;
    Object.assign(film, filmData);
    return film;
  }

  delete(id: number): boolean {
    const index = this.films.findIndex(film => film.id === id);
    if (index === -1) return false;
    this.films.splice(index, 1);
    return true;
  }
}