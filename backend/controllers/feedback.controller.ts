import { Request, Response, NextFunction } from "express";
import { FeedbackService } from "../services/feedback.service";
import { Feedback } from "../entities/feedback.entity";
import HTTPException from "../exceptions/http.exception";

export class FeedbackController {
	//TO_DO: Add validation and error handling
	constructor(private feedbackService: FeedbackService) {}

	async createFeedback(req: Request, res: Response, next: NextFunction) {
		try {
			const feedback = await this.feedbackService.createFeedback(
				req.body
			);
			res.status(201).json(feedback);
		} catch (error) {
			next(error);
		}
	}

	async getAllFeedbacks(req: Request, res: Response, next: NextFunction) {
		try {
			const feedbacks = await this.feedbackService.getAllFeedbacks();
			res.status(200).json(feedbacks);
		} catch (error) {
			next(error);
		}
	}

	async getFeedbackById(req: Request, res: Response, next: NextFunction) {
		try {
			const id: number = parseInt(req.params.id);
			const feedback = await this.feedbackService.getFeedbackById(id);
			if (!feedback) {
				throw new HTTPException(404, "Feedback not found");
			}
			res.status(200).json(feedback);
		} catch (error) {
			next(error);
		}
	}

	async updateFeedback(req: Request, res: Response, next: NextFunction) {
		try {
			const id: number = parseInt(req.params.id);
			const body: Feedback = req.body;
			const updated = await this.feedbackService.updateFeedback(id, body);
			if (!updated) {
				return res.status(404).json({ message: "Feedback not found" });
			}
			res.status(200).json(updated);
		} catch (error) {
			next(error);
		}
	}

	async deleteFeedback(req: Request, res: Response, next: NextFunction) {
		try {
			const id: number = parseInt(req.params.id);
			await this.feedbackService.deleteFeedback(id);

			res.status(204).send();
		} catch (error) {
			next(error);
		}
	}
}
