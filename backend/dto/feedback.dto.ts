import {
	IsString,
	IsNotEmpty,
	IsOptional,
	IsNumber,
	Min,
	Max,
} from "class-validator";

export class CreateFeedbackDto {
	@IsString()
	@IsNotEmpty()
	comment: string;

	@IsNumber()
	@Min(0)
	@Max(10)
	rating: number;

	@IsString()
	@IsNotEmpty()
	fromId: number;

	@IsString()
	@IsNotEmpty()
	toId: number;
}

export class UpdateFeedbackDto {
	@IsOptional()
	@IsString()
	comment?: string;

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
}
