
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
import { MemberDto } from "./training-members.dto";




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
