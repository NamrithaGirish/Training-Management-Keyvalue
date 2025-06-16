import { Request, Response, NextFunction } from "express";
import type TrainingService from "../services/training.service";
import { Training } from "../entities/training.entity";

export default class TrainingController {
  constructor(private trainingService: TrainingService) {}

  async getTrainings(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query.userId
        ? parseInt(req.query.userId as string)
        : undefined;
      const trainings = await this.trainingService.getAllTrainings(userId);
      res.status(200).json(trainings);
    } catch (err) {
      next(err);
    }
  }

  async getTrainingDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const training = await this.trainingService.getTrainingById(id);
      res.status(200).json(Training);
    } catch (err) {
      next(err);
    }
  }

  async createTraining(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.trainingService.createTraining(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async updateTraining(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const result = await this.trainingService.updateTraining(id, req.body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async deleteTraining(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await this.trainingService.deleteTraining(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  // async addMembers(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const TrainingId = parseInt(req.params.id);
  //     const result = await this.trainingService.addMembers(
  //       TrainingId,
  //       req.body
  //     );
  //     res.status(200).json(result);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // async removeMembers(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const TrainingId = parseInt(req.params.id);
  //     const { userId } = req.body;
  //     const result = await this.trainingService.removeMember(
  //       TrainingId,
  //       userId
  //     );
  //     res.status(200).json(result);
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}
