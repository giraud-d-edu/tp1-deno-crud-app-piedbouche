import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { UserRepository } from "../repositories/user.repository.ts";
import { ConversionService } from "../services/conversion.service.ts";
import { UserDTO } from "../dtos/user.dto.ts";
import { User } from "../models/users.model.ts";

const userRepo = new UserRepository();

export class UserController {
  // Récupère tous les utilisateurs - 200 OK
  static async getAll(ctx: RouterContext) {
    const users: User[] = userRepo.getAll();
    ctx.response.status = 200;
    ctx.response.body = users.map(ConversionService.toUserDTO);
  }

  // Récupère un utilisateur par son id - 200 OK si trouvé, 404 sinon
  static async getById(ctx: RouterContext) {
    const id = Number(ctx.params.id);
    const user = userRepo.getById(id);
    if (!user) {
      ctx.response.status = 404;
      ctx.response.body = { message: "User not found" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = ConversionService.toUserDTO(user);
  }

  // Crée un nouvel utilisateur - 201 Created
  static async create(ctx: RouterContext) {
    const body = await ctx.request.body().value;
    const userDTO: UserDTO = body;
    const user: User = ConversionService.toUser(userDTO);
    const createdUser = userRepo.create(user);
    ctx.response.status = 201;
    ctx.response.body = ConversionService.toUserDTO(createdUser);
  }

  // Met à jour un utilisateur existant - 200 OK si mis à jour, 404 sinon
  static async update(ctx: RouterContext) {
    const id = Number(ctx.params.id);
    const existingUser = userRepo.getById(id);
    if (!existingUser) {
      ctx.response.status = 404;
      ctx.response.body = { message: "User not found" };
      return;
    }
    const body = await ctx.request.body().value;
    const userDTO: UserDTO = body;
    const userUpdates: Partial<User> = ConversionService.toUser(userDTO);
    const updatedUser = userRepo.update(id, userUpdates);
    ctx.response.status = 200;
    ctx.response.body = ConversionService.toUserDTO(updatedUser as User);
  }

  // Supprime un utilisateur - 204 No Content si supprimé, 404 sinon
  static async delete(ctx: RouterContext) {
    const id = Number(ctx.params.id);
    const success = userRepo.delete(id);
    if (!success) {
      ctx.response.status = 404;
      ctx.response.body = { message: "User not found" };
      return;
    }
    ctx.response.status = 204;
  }
}