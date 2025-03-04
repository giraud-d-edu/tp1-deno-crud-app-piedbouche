import { Note } from "../models/note.model.ts";
import { NoteDTO } from "../dtos/note.dto.ts";
import { NoteDBO } from "../dbos/note.dbo.ts";
import { Film } from "../models/film.model.ts";
import { FilmDTO } from "../dtos/film.dto.ts";
import { FilmDBO } from "../dbos/film.dbo.ts";
import { Acteur } from "../models/acteurs.model.ts";
import { ActeurDTO } from "../dtos/acteur.dto.ts";
import { ActeurDBO } from "../dbos/acteur.dbo.ts";
import { User } from "../models/users.model.ts";
import { UserDTO } from "../dtos/user.dto.ts";
import { UserDBO } from "../dbos/user.dbo.ts";
import { ObjectId } from "npm:mongodb@5.6.0";

export class ConversionService {
    static toNoteDTO(note: NoteDBO): NoteDTO {
        return {
            valeur: note.valeur,
            filmId: note.film_id.toString(),
            utilisateurId: note.utilisateur_id.toString(),
            date: note.date
        };
    }

    static toNoteDBO(noteDTO: NoteDTO): NoteDBO {
        return {
            _id: new ObjectId(),
            valeur: noteDTO.valeur,
            film_id: new ObjectId(noteDTO.filmId),
            utilisateur_id: new ObjectId(noteDTO.utilisateurId),
            date: noteDTO.date
        };
    }

    static toFilmDTO(film: FilmDBO): FilmDTO {
        return {
            titre: film.titre,
            description: film.description,
            dateDeSortie: film.date_de_sortie,
            genre: film.genre,
            acteurs: film.acteurs.map(ConversionService.toActeurDTO),
            notes: film.notes.map(ConversionService.toNoteDTO)
        };
    }

    static toFilmDBO(filmDTO: FilmDTO): FilmDBO {
        return {
            _id: new ObjectId(),
            titre: filmDTO.titre,
            description: filmDTO.description,
            date_de_sortie: filmDTO.dateDeSortie,
            genre: filmDTO.genre,
            acteurs: filmDTO.acteurs.map(ConversionService.toActeurDBO),
            notes: filmDTO.notes.map(ConversionService.toNoteDBO)
        };
    }

    static toActeurDTO(acteur: ActeurDBO): ActeurDTO {
        return {
            nom: acteur.nom,
            prenom: acteur.prenom,
            films: acteur.films.map(ConversionService.toFilmDTO)
        };
    }

    static toActeurDBO(acteurDTO: ActeurDTO): ActeurDBO {
        return {
            _id: new ObjectId(),
            nom: acteurDTO.nom,
            prenom: acteurDTO.prenom,
            films: acteurDTO.films.map(ConversionService.toFilmDBO)
        };
    }

    static toUserDTO(user: UserDBO): UserDTO {
        return {
            email: user.email,
            motDePasse: user.mot_de_passe
        };
    }

    static toUserDBO(userDTO: UserDTO): UserDBO {
        return {
            _id: new ObjectId(),
            email: userDTO.email,
            mot_de_passe: userDTO.motDePasse
        };
    }
}
