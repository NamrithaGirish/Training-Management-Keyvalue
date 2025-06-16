import { FeedbackRepository } from "../repositories/feedback.repository";
import { Feedback } from "../entities/feedback.entity";
import { CreateFeedbackDto, UpdateFeedbackDto } from "../dto/feedback.dto";
import { userService } from "../routes/user.route";
import { Session } from "../entities/session.entity";
import LoggerService from "./logger.service";

export class FeedbackService {
	private logger = LoggerService.getInstance(FeedbackService.name);

	constructor(private feedbackRepository: FeedbackRepository) {}

	async createFeedback(
		createFeedbackDto: CreateFeedbackDto
	): Promise<Feedback> {
		const feedback = new Feedback();
		feedback.from = await userService.findOneById(createFeedbackDto.fromId);
		feedback.to = await userService.findOneById(createFeedbackDto.toId);
		feedback.session = new Session();
		feedback.rating = createFeedbackDto.rating;
		feedback.comments = createFeedbackDto.comments;
		feedback.type = createFeedbackDto.type;
		return this.feedbackRepository.create(feedback);
	}

	async updateFeedback(
		id: number,
		data: UpdateFeedbackDto
	): Promise<Feedback | null> {
		const feedback = await this.feedbackRepository.getById(id);
		if (!feedback) {
			throw new Error(`Required feedback not found`);
		}
		this.logger.info("feedback to update" + feedback);
		if (data.fromId) {
			const sender = await userService.findOneById(data.fromId);
			if (!sender) {
				throw new Error(`Invalid sender ID`);
			}
			feedback.from = sender;
		}
		if (data.toId) {
			const recipient = await userService.findOneById(data.toId);
			if (!recipient) {
				throw new Error(`Invalid recipient ID`);
			}
			feedback.to = recipient;
		}
		feedback.session = feedback.session;
		feedback.rating = data.rating || feedback.rating;
		feedback.comments = data.comments || feedback.comments;
		return this.feedbackRepository.update(id, feedback);
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
