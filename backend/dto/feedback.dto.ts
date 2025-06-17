import {
	IsString,
	IsNotEmpty,
	IsOptional,
	IsNumber,
	Min,
	Max,
	IsEnum,
} from "class-validator";
import { FeedbackType } from "../entities/feedback.entity";

export class CreateFeedbackDto {
	@IsString()
	@IsNotEmpty()
	comments: string;

	@IsNumber()
	@Min(0)
	@Max(10)
	rating: number;

	@IsNumber()
	@IsNotEmpty()
	fromId: number;

	@IsNumber()
	@IsNotEmpty()
	toId: number;

	@IsNumber()
	@IsNotEmpty()
	sessionId: number;

	@IsEnum(FeedbackType)
	@IsNotEmpty()
	type: FeedbackType;
}

export class UpdateFeedbackDto {
	@IsOptional()
	@IsString()
	comments?: string;

	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(10)
	rating?: number;

	@IsNumber()
	@IsOptional()
	fromId: number;

	@IsNumber()
	@IsOptional()
	toId: number;

	@IsNumber()
	@IsOptional()
	sessionId: number;

	@IsEnum(FeedbackType)
	@IsOptional()
	type: FeedbackType;
}
