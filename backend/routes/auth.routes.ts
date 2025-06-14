import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import express from "express";
import { userService } from "./user.route";

const authService = new AuthService(userService);
const authRouter = express.Router();
const authController = new AuthController(authService, authRouter);

export default authRouter;
