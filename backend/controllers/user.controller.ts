import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";

import type UserService from "../services/user.service";
import { plainToInstance } from "class-transformer";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";

export default class UserController {
  constructor(private userService: UserService) {}

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await this.userService.findOneById(userId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userDto = plainToInstance(CreateUserDto, req.body);

      const errors = await validate(userDto);
      if (errors.length > 0) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.map((error) => error.constraints),
        });
      }

      const user = await this.userService.createUser(userDto);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id, 10);
      const userDto = plainToInstance(UpdateUserDto, req.body);

      const errors = await validate(userDto);
      if (errors.length > 0) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.map((error) => error.constraints),
        });
      }

      const updatedUser = await this.userService.updateUser(userId, userDto);

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id, 10);
      await this.userService.deleteUser(userId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.findAllUsers();

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getAllAdmins(req: Request, res: Response, next: NextFunction) {
    try {
      const admins = await this.userService.findAllAdmins();

      res.status(200).json(admins);
    } catch (error) {
      next(error);
    }
  }

  async changeAdminStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id, 10);
      const isAdmin = req.body.isAdmin;

      await this.userService.changeAdminStatus(userId, isAdmin);

      res.status(200).json();
    } catch (error) {
      next(error);
    }
  }
}
