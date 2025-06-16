import {
	IsString,
	IsNotEmpty,
	IsOptional,
	IsDateString,
	IsNumber,
} from "class-validator";

export class CreateAssignmentDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsDateString()
	@IsNotEmpty()
	dueDate: Date;

	@IsNumber()
	@IsNotEmpty()
	sessionId: number;
}

export class UpdateAssignmentDto {
	@IsString()
	@IsOptional()
	title?: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsDateString()
	@IsOptional()
	dueDate?: string;

	@IsNumber()
	@IsOptional()
	sessionId?: number;
}
