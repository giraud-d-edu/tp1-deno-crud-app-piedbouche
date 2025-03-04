import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { UserRepository } from "../repositories/user.repository.ts";
import { ConversionService } from "../services/conversion.service.ts";
import { UserDTO } from "../dtos/user.dto.ts";
import { UserDBO } from "../dbos/user.dbo.ts";

const userRepo = new UserRepository();

export class UserController {
  static async getAll(ctx: RouterContext) {
    const users: UserDBO[] = await userRepo.getAll();
    ctx.response.status = 200;
    ctx.response.body = users.map(ConversionService.toUserDTO);
  }

  static async getById(ctx: RouterContext) {
    const id = ctx.params.id!;
    const user = await userRepo.getById(id);
    if (!user) {
      ctx.response.status = 404;
      ctx.response.body = { message: "User not found" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = ConversionService.toUserDTO(user);
  }

  static async create(ctx: RouterContext) {
    const body = await ctx.request.body.json();
    const userDTO: UserDTO = body;
    const userDBO: UserDBO = ConversionService.toUserDBO(userDTO);
    const createdUser = await userRepo.create(userDBO);
    ctx.response.status = 201;
    ctx.response.body = ConversionService.toUserDTO(createdUser);
  }

  static async update(ctx: RouterContext) {
    const id = ctx.params.id!;
    const existingUser = await userRepo.getById(id);
    if (!existingUser) {
      ctx.response.status = 404;
      ctx.response.body = { message: "User not found" };
      return;
    }
    const body = await ctx.request.body.json();
    const userDTO: UserDTO = body;
    const userUpdates: Partial<UserDBO> = ConversionService.toUserDBO(userDTO);
    delete userUpdates._id;
    const updatedUser = await userRepo.update(id, userUpdates);
    ctx.response.status = 200;
    ctx.response.body = ConversionService.toUserDTO(updatedUser as UserDBO);
  }

static async delete(ctx: RouterContext) {
    const id = ctx.params.id!;
    try {
      const success = await userRepo.delete(id);
      if (!success) {
        ctx.response.status = 404;
        ctx.response.body = { message: "User not found" };
        return;
      }
      ctx.response.status = 204;
    } catch (error) {
      console.error("Delete Error:", error);
      ctx.response.status = 400; // 400 Bad Request si l'ID est mal formé
      ctx.response.body = { message: "Invalid User ID" };
    }
  }
}