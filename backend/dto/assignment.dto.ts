import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsNumber,
  IsUrl,
} from "class-validator";

export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  referenceUrl?: string;

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

  @IsString()
  @IsOptional()
  referenceUrl?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsNumber()
  @IsOptional()
  sessionId?: number;
}

export class AssignmentSubmissionDto {
  @IsNotEmpty()
  @IsDateString()
  completedOn: Date;

  @IsNotEmpty()
  @IsUrl()
  completionLink: string;

  @IsNotEmpty()
  @IsUrl()
  file: string;
}
