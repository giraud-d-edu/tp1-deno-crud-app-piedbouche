import { ObjectId } from "npm:mongodb@5.6.0";

export interface UserDBO {
  _id: ObjectId;
  email: string;
  mot_de_passe: string;
}