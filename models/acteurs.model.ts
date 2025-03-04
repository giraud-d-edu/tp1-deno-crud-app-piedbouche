import { Film } from "./film.model.ts";

export interface Acteur {
    id: number;
    nom: string;
    prenom: string;
    films: Film[]; // On met une liste de films ici car un acteur peut jouer dans plusieurs films
}