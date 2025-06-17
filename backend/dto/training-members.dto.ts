import { IsEnum, IsNotEmpty } from "class-validator";
import { TrainingUserRole } from "../entities/training-users.entity";

export class MemberDto {
  @IsNotEmpty()
  userId: number;

  @IsEnum(TrainingUserRole)
  role: TrainingUserRole;
}