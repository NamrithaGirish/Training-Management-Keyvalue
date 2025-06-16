import { Request, Response, NextFunction } from "express";
import type ProgramService from "../services/program.service";

export default class ProgramController {
  constructor(private programService: ProgramService) {}

  async getPrograms(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const programs = await this.programService.getAllPrograms(userId);
      res.status(200).json(programs);
    } catch (err) {
      next(err);
    }
  }

  async getProgramDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const program = await this.programService.getProgramById(id);
      res.status(200).json(program);
    } catch (err) {
      next(err);
    }
  }

  async createProgram(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.programService.createProgram(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async updateProgram(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const result = await this.programService.updateProgram(id, req.body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async deleteProgram(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await this.programService.deleteProgram(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async addMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const programId = parseInt(req.params.id);
      const result = await this.programService.addMembers(programId, req.body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async removeMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const programId = parseInt(req.params.id);
      const { userId } = req.body;
      const result = await this.programService.removeMember(programId, userId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}