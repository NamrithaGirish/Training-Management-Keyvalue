import { Repository } from "typeorm";
import AssignmentSubmission from "../entities/assignmentSubmission.entity";

export default class AssignmentSubmissionRepository {
  constructor(private repository: Repository<AssignmentSubmission>) {}

  async submitAssignment(submission: AssignmentSubmission): Promise<void> {
    this.repository.save(submission);
  }
}
