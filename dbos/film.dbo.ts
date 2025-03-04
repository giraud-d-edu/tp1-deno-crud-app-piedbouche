import { ObjectId } from "npm:mongodb@5.6.0";
import { ActeurDBO } from "./acteur.dbo.ts";
import { NoteDBO } from "./note.dbo.ts";

export interface FilmDBO {
  _id: ObjectId;
  titre: string;
  description: string;
  date_de_sortie: string;
  genre: string;
  acteurs: ActeurDBO[];
  notes: NoteDBO[];
}