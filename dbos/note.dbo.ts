import { ObjectId } from "npm:mongodb@5.6.0";

export interface NoteDBO {
  _id: ObjectId;
  valeur: number;
  film_id: ObjectId;
  utilisateur_id: ObjectId;
  date: string;
}