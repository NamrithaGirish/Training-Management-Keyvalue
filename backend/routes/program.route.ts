import { Router } from "express";
import dataSource from "../db/dataSource";
import ProgramService from "../services/program.service";
import ProgramController from "../controllers/program.controller";
import ProgramRepository from "../repositories/program.repository";

const programRepository = new ProgramRepository(
  dataSource.getRepository("Program")
);
const programService = new ProgramService(programRepository);
const programController = new ProgramController(programService);

const programRouter = Router();

programRouter.get("/", programController.getPrograms.bind(programController));
programRouter.get(
  "/:id",
  programController.getProgramDetails.bind(programController)
);
programRouter.post(
  "/",
  programController.createProgram.bind(programController)
);
programRouter.patch(
  "/:id",
  programController.updateProgram.bind(programController)
);
programRouter.delete(
  "/:id",
  programController.deleteProgram.bind(programController)
);

programRouter.post(
  "/:id/members",
  programController.addMembers.bind(programController)
);
programRouter.delete(
  "/:id/members",
  programController.removeMembers.bind(programController)
);

export default programRouter;
export { programController, programService, programRepository };
