import { FilmDTO } from "./film.dto";

export interface ActeurDTO {
    nom: string;
    prenom: string;
    films: FilmDTO[];
}
