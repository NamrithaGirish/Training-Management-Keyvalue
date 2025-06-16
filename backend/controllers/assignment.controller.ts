import { Request, Response, NextFunction } from "express";

import { AssignmentService } from "../services/assignment.service";

export default class AssignmentController {
  constructor(private assignmentService: AssignmentService) {}

  async getAssignments(req: Request, res: Response, next: NextFunction) {
    try {
      const assignments = await this.assignmentService.getAssignments();

      res.status(200).json(assignments);
    } catch (error) {
      next(error);
    }
  }
}
