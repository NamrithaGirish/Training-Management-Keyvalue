import { AssignmentRepository } from "../repositories/assignment.repository";
import { Assignment } from "../entities/assignment.entity";

export class AssignmentService {
	constructor(private assignmentRepository: AssignmentRepository) {}

	async createAssignment(assignment: Assignment): Promise<Assignment> {
		//TODO: Validate session id before creating
		return this.assignmentRepository.create(assignment);
	}

	async getAssignmentById(id: number): Promise<Assignment | null> {
		return this.assignmentRepository.getById(id);
	}

	async getAllAssignments(): Promise<Assignment[]> {
		return this.assignmentRepository.getAll();
	}

	async updateAssignment(
		id: number,
		data: Partial<Assignment>
	): Promise<Assignment | null> {
		const existingAssignment = await this.assignmentRepository.getById(id);
		//TODO: Validate session id if updating session id
		if (!existingAssignment) {
			throw new Error(`Assignment with id ${id} not found`);
		}
		return this.assignmentRepository.update(id, data);
	}

	async deleteAssignment(id: number): Promise<Assignment> {
		const assignment = await this.assignmentRepository.getById(id);
		if (assignment) {
			await this.assignmentRepository.delete(id);
			return assignment;
		}
		return null;
	}
}
