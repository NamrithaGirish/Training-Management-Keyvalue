import { Repository } from "typeorm";
import { Feedback, FeedbackType } from "../entities/feedback.entity";
import { User } from "../entities/user.entity";
import { Session } from "../entities/session.entity";

export class FeedbackRepository {
	constructor(private repository: Repository<Feedback>) {}

	async create(data: Feedback): Promise<Feedback> {
		return await this.repository.save(data);
	}

	async getById(id: number): Promise<Feedback | null> {
		return await this.repository.findOne({
			where: { id },
			relations: {
				from: true,
				to: true,
				session: true,
			},
		});
	}

	async update(id: number, data: Feedback): Promise<Feedback | null> {
		return await this.repository.save({ id, ...data });
	}

	async delete(id: number): Promise<void> {
		await this.repository.delete({ id });
	}

	async getAll(): Promise<Feedback[]> {
		return this.repository.find({
			relations: {
				from: true,
				to: true,
				session: true,
			},
		});
	}

	async getBySender(from: User): Promise<Feedback[]> {
		return await this.repository.find({
			where: { from },
			relations: {
				from: true,
				to: true,
				session: true,
			},
		});
	}

	async getByReceiver(to: User): Promise<Feedback[]> {
		return await this.repository.find({
			where: { to },
			relations: {
				from: true,
				to: true,
				session: true,
			},
		});
	}

	async getBySession(session: Session): Promise<Feedback[]> {
		console.log("session to get feedback", session.id);
		const feedbacks = await this.repository.find({
			where: { session: session },
			relations: {
				from: true,
				to: true,
				session: true,
			},
		});
		console.log("feedbacks for session", feedbacks);
		return feedbacks;
	}

	async getBySessionAndType(
		type: FeedbackType,
		session: Session
	): Promise<Feedback[]> {
		return await this.repository.find({
			where: { type, session },
			relations: {
				from: true,
				to: true,
				session: true,
			},
		});
	}
}
