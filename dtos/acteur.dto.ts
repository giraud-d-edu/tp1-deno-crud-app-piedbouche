import { FilmDTO } from "./film.dto.ts";

export interface ActeurDTO {
    nom: string;
    prenom: string;
    films: FilmDTO[];
}
