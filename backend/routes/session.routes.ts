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


export default sessionRouter;
export { sessionController, sessionService, sessionRepository};