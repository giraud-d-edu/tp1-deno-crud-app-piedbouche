import { ObjectId } from "npm:mongodb@5.6.0";
import { FilmDBO } from "./film.dbo.ts";

export interface ActeurDBO {
  _id: ObjectId;
  nom: string;
  prenom: string;
  films: FilmDBO[];
}