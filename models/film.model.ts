import { Acteur } from "./acteurs.model.ts";
import { Note } from "./note.model.ts";

export interface Film {
  id: number;
  titre : string;
  description : string;
  date_de_sortie : string;
  genre : string;
  acteurs : Acteur[];  // On met une liste d'acteurs ici car il peut y avoir plusieurs acteurs
  notes : Note[]; // Liste des notes du film
}