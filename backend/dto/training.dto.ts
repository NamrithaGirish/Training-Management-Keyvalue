import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from "class-validator";

export class trainingDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  end_date: Date;
}
