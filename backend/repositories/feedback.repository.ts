import { Repository } from "typeorm";
import { Feedback } from "../entities/feedback.entity";

export class FeedbackRepository {
	constructor(private repository: Repository<Feedback>) {}

	async create(data: Feedback): Promise<Feedback> {
		return await this.repository.save(data);
	}

	async getById(id: number): Promise<Feedback | null> {
		return await this.repository.findOne({ where: { id } });
	}

	async update(id: number, data: Feedback): Promise<Feedback | null> {
		return await this.repository.save({ id, ...data });
	}

	async delete(id: number): Promise<void> {
		await this.repository.delete({ id });
	}

	async getAll(): Promise<Feedback[]> {
		return this.repository.find();
	}
}
