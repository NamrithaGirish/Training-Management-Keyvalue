import {
	IsNotEmpty,
	IsString,
	IsDateString,
	IsOptional,
	IsEnum,
	IsNumber,
} from "class-validator";
import { Status } from "../entities/session.entity";

export class CreateSessionDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsNumber()
	program_id: number;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsString()
	preReq?: string;

	@IsEnum(Status)
	status: Status;

	@IsNotEmpty()
	@IsDateString()
	date: Date;

	@IsNotEmpty()
	@IsNumber()
	slot: number;

	@IsNotEmpty()
	@IsNumber()
	duration?: number;
}

export class UpdateSessionDto {
	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsNumber()
	program_id?: number;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsString()
	preReq?: string;

	@IsOptional()
	@IsEnum(Status)
	status?: Status;

	@IsOptional()
	@IsDateString()
	date?: Date;

	@IsOptional()
	@IsNumber()
	slot?: number;

	@IsOptional()
	@IsNumber()
	duration?: number;
}
