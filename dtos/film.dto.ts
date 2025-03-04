import { ActeurDTO } from "./acteur.dto.ts";
import { NoteDTO } from "./note.dto.ts";

export interface FilmDTO {
    titre: string;
    description: string;
    dateDeSortie: string;
    genre: string;
    acteurs: ActeurDTO[];
    notes: NoteDTO[];
}
