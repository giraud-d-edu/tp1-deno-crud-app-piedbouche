import { Acteur } from "./acteurs.model";
import { Note } from "./note.model";

export interface Film {
  id: number;
  titre : string;
  description : string;
  date_de_sortie : string;
  genre : string;
  acteurs : Acteur[];
  notes : Note[];
}