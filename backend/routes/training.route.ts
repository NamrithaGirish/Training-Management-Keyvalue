import { Router } from "express";
import dataSource from "../db/dataSource";
import TrainingRepository from "../repositories/training.repository";
import TrainingService from "../services/training.service";
import TrainingController from "../controllers/training.controller";

const trainingRepository = new TrainingRepository(
  dataSource.getRepository("Training")
);
const trainingService = new TrainingService(trainingRepository);
const trainingController = new TrainingController(trainingService);

const trainingRouter = Router();

trainingRouter.get(
  "/",
  trainingController.getTrainings.bind(trainingController)
);
trainingRouter.get(
  "/:id",
  trainingController.getTrainingDetails.bind(trainingController)
);
trainingRouter.post(
  "/",
  trainingController.createTraining.bind(trainingController)
);
trainingRouter.patch(
  "/:id",
  trainingController.updateTraining.bind(trainingController)
);
trainingRouter.delete(
  "/:id",
  trainingController.deleteTraining.bind(trainingController)
);

trainingRouter.post(
  "/:id/members",
  trainingController.addMembers.bind(trainingController)
);
trainingRouter.delete(
  "/:id/members",
  trainingController.removeMembers.bind(trainingController)
);

export default trainingRouter;
export { trainingController, trainingService, trainingRepository };
