import { Router } from "express";

import { AuthRoles } from "../types/authorization.type";
import validRoles from "../middlewares/authorization.middleware";
import { SessionController } from "../controllers/session.controller";
import dataSource from "../db/dataSource";
import SessionRepository from "../repositories/session.repository";
import { SessionService } from "../services/session.service";
import { UserSessionRepository } from "../repositories/user-session.repository";
import { userService } from "./user.route";
import { trainingService } from "./training.route";

const sessionRepository = new SessionRepository(
  dataSource.getRepository("Session")
);
const sessionService = new SessionService(sessionRepository, trainingService);
const sessionController = new SessionController(sessionService);

const sessionRouter = Router();

sessionRouter.post(
  "/",
  validRoles([AuthRoles.ADMIN]),
  sessionController.createSession.bind(sessionController)
);
sessionRouter.get(
  "/",
  validRoles([AuthRoles.ADMIN]),
  sessionController.getAllSessions.bind(sessionController)
);
sessionRouter.get(
  "/:id",
  validRoles([
    AuthRoles.ADMIN,
    AuthRoles.TRAINER,
    AuthRoles.MODERATOR,
    AuthRoles.CANDIDATE,
  ]),
  sessionController.getSessionById.bind(sessionController)
);
sessionRouter.patch(
  "/:id",
  validRoles([AuthRoles.TRAINING_ADMIN]),
  sessionController.updateSession.bind(sessionController)
);
sessionRouter.delete(
  "/:id",
  validRoles([AuthRoles.TRAINING_ADMIN]),
  sessionController.deleteSession.bind(sessionController)
);
export default sessionRouter;
export { sessionController, sessionService, sessionRepository };
