import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
  IsEnum,
  IsNumber,
} from "class-validator";
import { Status } from "../entities/session.entity";
import { Role } from "../entities/user-session.entity";

export class CreateUserSessionDto {
  
  @IsNotEmpty()
  @IsNumber()
  session_id:number
  @IsNotEmpty()
  @IsNumber()
  user_id:number
 
  @IsNotEmpty()
  @IsEnum(Role)
  role:Role

  
}

export class UpdateUserSessionDto{
  @IsOptional()
  @IsNumber()
  session_id:number
  
  @IsOptional()
  @IsNumber()
  user_id:number
 
  @IsOptional()
  @IsEnum(Role)
  role:Role

}
