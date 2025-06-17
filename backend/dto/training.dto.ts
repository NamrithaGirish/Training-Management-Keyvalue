
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { TrainingUserRole } from "../entities/training-users.entity";

class MemberDto {
  @IsNotEmpty()
  userId: number;

  @IsEnum(TrainingUserRole)
  role: TrainingUserRole;
}

export class trainingDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MemberDto)
  members?: MemberDto[];
}
