import { MongoClient } from "npm:mongodb@5.6.0";

const MONGODB_URI = "mongodb+srv://corehippot:CvFRfNBmDF2M3BP1@cluster0.1mhsrpr.mongodb.net/";
const DB_NAME = "films_db"; // Utilisez des minuscules pour le nom de la base de données

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set");
  Deno.exit(1);
}

const client = new MongoClient(MONGODB_URI);

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
  Deno.exit(1);
}

const db = client.db(DB_NAME);
const todos = db.collection("todos");

export { db, todos };