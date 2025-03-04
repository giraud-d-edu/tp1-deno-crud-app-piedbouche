import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./router.ts";
import { db } from "./db.ts"; // Importez la base de données

const app = new Application();

// Exemple d'utilisation de la base de données pour vérifier la connexion
try {
  await db.command({ ping: 1 });
  console.log("Successfully connected to the database");
} catch (error) {
  console.error("Error connecting to the database:", error);
}

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running on http://localhost:8000");
await app.listen({ port: 8000 });