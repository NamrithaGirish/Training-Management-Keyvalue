import { Request, Response, NextFunction } from "express";

import HTTPException from "../exceptions/http.exception";
import { SessionService } from "../services/session.service";
import { CreateSessionDto } from "../dto/session.dto";
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
    

    
}
