import { Request, Response, NextFunction, Router } from "express";
import { FeedbackService } from "../services/feedback.service";
import { Feedback } from "../entities/feedback.entity";
import HTTPException from "../exceptions/http.exception";
import { plainToInstance } from "class-transformer";
import { CreateFeedbackDto, UpdateFeedbackDto } from "../dto/feedback.dto";
import { validate } from "class-validator";
import LoggerService from "../services/logger.service";

export class FeedbackController {
	private logger = LoggerService.getInstance(FeedbackController.name);

	//TO_DO: Add validation and error handling
	constructor(
		private feedbackService: FeedbackService,
		feedbackRouter: Router
	) {
		feedbackRouter.post("/", this.createFeedback.bind(this));
		feedbackRouter.get("/", this.getAllFeedbacks.bind(this));
		feedbackRouter.get("/:id", this.getFeedbackById.bind(this));
		feedbackRouter.patch("/:id", this.updateFeedback.bind(this));
		feedbackRouter.delete("/:id", this.deleteFeedback.bind(this));
	}

	async createFeedback(req: Request, res: Response, next: NextFunction) {
		try {
			const data = req.body;
			const createFeedbackDto = plainToInstance(CreateFeedbackDto, data);
			const err = await validate(createFeedbackDto);
			if (err.length > 0) {
				this.logger.error("Validation failed" + err);
				throw new HTTPException(400, "Validation failed");
			}
			const feedback = await this.feedbackService.createFeedback(
				createFeedbackDto
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
			const data= req.body;
			const updateFeedbackDto = plainToInstance(UpdateFeedbackDto, data);
			const err = await validate(updateFeedbackDto);
			if (err.length > 0) {
				this.logger.error("Validation failed" + err);
				throw new HTTPException(400, "Validation failed");
			}
			const updated = await this.feedbackService.updateFeedback(id, updateFeedbackDto);
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
