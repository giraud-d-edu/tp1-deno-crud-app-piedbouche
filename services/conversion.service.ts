import { Note } from "../models/note.model.ts";
import { NoteDTO } from "../dtos/note.dto.ts";
import { Film } from "../models/film.model.ts";
import { FilmDTO } from "../dtos/film.dto.ts";
import { Acteur } from "../models/acteurs.model.ts";
import { ActeurDTO } from "../dtos/acteur.dto.ts";
import { User } from "../models/users.model.ts";
import { UserDTO } from "../dtos/user.dto.ts";

export class ConversionService {
    static toNoteDTO(note: Note): NoteDTO {
        return {
            valeur: note.valeur,
            filmId: note.film_id,
            utilisateurId: note.utilisateur_id,
            date: note.date
        };
    }

    static toNote(noteDTO: NoteDTO): Note {
        return {
            id: 0, // L'id sera généré par la base de données
            valeur: noteDTO.valeur,
            film_id: noteDTO.filmId,
            utilisateur_id: noteDTO.utilisateurId,
            date: noteDTO.date
        };
    }

    static toFilmDTO(film: Film): FilmDTO {
        return {
            titre: film.titre,
            description: film.description,
            dateDeSortie: film.date_de_sortie,
            genre: film.genre,
            acteurs: film.acteurs.map(ConversionService.toActeurDTO),
            notes: film.notes.map(ConversionService.toNoteDTO)
        };
    }

    static toFilm(filmDTO: FilmDTO): Film {
        return {
            id: 0, // L'id sera généré par la base de données
            titre: filmDTO.titre,
            description: filmDTO.description,
            date_de_sortie: filmDTO.dateDeSortie,
            genre: filmDTO.genre,
            acteurs: filmDTO.acteurs.map(ConversionService.toActeur),
            notes: filmDTO.notes.map(ConversionService.toNote)
        };
    }

    static toActeurDTO(acteur: Acteur): ActeurDTO {
        return {
            nom: acteur.nom,
            prenom: acteur.prenom,
            films: acteur.films.map(ConversionService.toFilmDTO)
        };
    }

    static toActeur(acteurDTO: ActeurDTO): Acteur {
        return {
            id: 0, // L'id sera généré par la base de données
            nom: acteurDTO.nom,
            prenom: acteurDTO.prenom,
            films: acteurDTO.films.map(ConversionService.toFilm)
        };
    }

    static toUserDTO(user: User): UserDTO {
        return {
            email: user.email,
            motDePasse: user.mot_de_passe
        };
    }

    static toUser(userDTO: UserDTO): User {
        return {
            id: 0, // L'id sera généré par la base de données
            email: userDTO.email,
            mot_de_passe: userDTO.motDePasse
        };
    }
}
