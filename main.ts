import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./router.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running on http://localhost:8000");
await app.listen({ port: 8000 });