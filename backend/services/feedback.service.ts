import { FeedbackRepository } from "../repositories/feedback.repository";
import { Feedback } from "../entities/feedback.entity";

export class FeedbackService {
	constructor(private feedbackRepository: FeedbackRepository) {}

	async createFeedback(data: Feedback): Promise<Feedback> {
		return this.feedbackRepository.create(data);
	}

	async updateFeedback(
		id: number,
		data: Partial<Feedback>
	): Promise<Feedback | null> {
		const existingFeedback = await this.feedbackRepository.getById(id);
		if (!existingFeedback) {
			throw new Error(`Required feedback not found`);
		}
		return this.feedbackRepository.update(id, data);
	}
	async getFeedbackById(id: number): Promise<Feedback> {
		const feedback = this.feedbackRepository.getById(id);
		if (!feedback) {
			throw new Error(`Feedback not found`);
		}
		return feedback;
	}
	async getAllFeedbacks(): Promise<Feedback[]> {
		return this.feedbackRepository.getAll();
	}
	async deleteFeedback(id: number): Promise<void> {
		const feedback = this.feedbackRepository.getById(id);
		if (!feedback) {
			throw new Error(`Feedback not found`);
		}
		return this.feedbackRepository.delete(id);
	}
}
