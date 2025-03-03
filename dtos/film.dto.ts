import { ActeurDTO } from "./acteur.dto";
import { NoteDTO } from "./note.dto";

export interface FilmDTO {
    titre: string;
    description: string;
    dateDeSortie: string;
    genre: string;
    acteurs: ActeurDTO[];
    notes: NoteDTO[];
}
