import { Router } from "express";
import { SessionController } from "../controllers/session.controller";
import dataSource from "../db/dataSource";
import SessionRepository from "../repositories/session.repository";
import { SessionService } from "../services/session.service";


const sessionRepository = new SessionRepository(dataSource.getRepository("Session"));
const sessionService= new SessionService(sessionRepository);
const sessionController=new SessionController(sessionService);

const sessionRouter=Router();

sessionRouter.post("/", sessionController.createSession.bind(sessionController));
sessionRouter.get("/", sessionController.getAllSessions.bind(sessionController));
sessionRouter.get("/:id", sessionController.getSessionById.bind(sessionController));
sessionRouter.patch("/:id", sessionController.updateSession.bind(sessionController));
sessionRouter.delete("/:id", sessionController.deleteSession.bind(sessionController));
export default sessionRouter;
export { sessionController, sessionService, sessionRepository};