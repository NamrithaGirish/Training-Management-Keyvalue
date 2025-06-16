import { Request, Response, NextFunction } from "express";

import HTTPException from "../exceptions/http.exception";
import { SessionService } from "../services/session.service";
import { CreateSessionDto, UpdateSessionDto } from "../dto/session.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export class SessionController {
  constructor(private sessionService: SessionService) {}

  async createSession(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionDto = plainToInstance(CreateSessionDto, req.body);

      const errors = await validate(sessionDto);
      if (errors.length > 0) {
        return res.status(400).json({
          message: "Validation failed for session",
          errors: errors.map((error) => error.constraints),
        });
      }

      const session = await this.sessionService.createSession(sessionDto);

      res.status(201).json(session);
    } catch (error) {
      next(error);
    }
  }
  async getAllSessions(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.sessionService.findAllSessions();

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  async getSessionById(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionId = parseInt(req.params.id, 10);
      const session = await this.sessionService.findOneById(sessionId);

      res.status(200).json(session);
    } catch (error) {
      next(error);
    }
  }
  async deleteSession(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id, 10);
      await this.sessionService.deleteSession(userId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
  async updateSession(req: Request, res: Response, next: NextFunction) {
      try {
        const sessionId = parseInt(req.params.id, 10);
        const sessionDto = plainToInstance(UpdateSessionDto, req.body);
  
        const errors = await validate(sessionDto);
        if (errors.length > 0) {
          return res.status(400).json({
            message: "Validation failed",
            errors: errors.map((error) => error.constraints),
          });
        }
  
        const updatedSession = await this.sessionService.updateSession(sessionId, sessionDto);
  
        res.status(200).json(updatedSession);
      } catch (error) {
        next(error);
      }
    }
  

}
