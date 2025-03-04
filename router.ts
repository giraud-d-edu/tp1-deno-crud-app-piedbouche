import { Router } from "https://deno.land/x/oak/mod.ts";
import { FilmController } from "./controllers/film.controller.ts";
import { ActeurController } from "./controllers/acteur.controller.ts";
import { NoteController } from "./controllers/note.controller.ts";
import { UserController } from "./controllers/user.controller.ts";

const router = new Router();

// Routes pour les films
router
  .get("/films", FilmController.getAll)
  .get("/films/:id", FilmController.getById)
  .post("/films", FilmController.create)
  .put("/films/:id", FilmController.update)
  .delete("/films/:id", FilmController.delete);

// Routes pour les acteurs
router
  .get("/acteurs", ActeurController.getAll)
  .get("/acteurs/:id", ActeurController.getById)
  .post("/acteurs", ActeurController.create)
  .put("/acteurs/:id", ActeurController.update)
  .delete("/acteurs/:id", ActeurController.delete);

// Routes pour les notes
router
  .get("/notes", NoteController.getAll)
  .get("/notes/:id", NoteController.getById)
  .post("/notes", NoteController.create)
  .put("/notes/:id", NoteController.update)
  .delete("/notes/:id", NoteController.delete);

// Routes pour les utilisateurs
router
  .get("/users", UserController.getAll)
  .get("/users/:id", UserController.getById)
  .post("/users", UserController.create)
  .put("/users/:id", UserController.update)
  .delete("/users/:id", UserController.delete);

export default router;