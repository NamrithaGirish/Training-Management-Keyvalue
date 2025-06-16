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
  program_id:number

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
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  program_id?:number


  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  preReq?: string;


  @IsOptional()
  @IsEnum(Status)
  status?:Status

  @IsOptional()
  @IsDateString()
  startTime?:Date;

  @IsOptional()
  @IsDateString()
  endTime?:Date;

}
