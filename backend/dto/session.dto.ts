import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
  IsEnum,
} from "class-validator";
import { Status } from "../entities/session.entity";

export class CreateSessionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  preReq?: string;

  @IsEnum(Status)
  status:Status

  @IsNotEmpty()
  @IsDateString()
  startTime:Date;

  @IsNotEmpty()
  @IsDateString()
  endTime:Date;
}

export class UpdateSessionDto{
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  preReq?: string;

  @IsEnum(Status)
  status?:Status

  @IsNotEmpty()
  @IsDateString()
  startTime?:Date;

  @IsNotEmpty()
  @IsDateString()
  endTime?:Date;

}
