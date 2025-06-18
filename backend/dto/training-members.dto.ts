import { IsEnum, IsNotEmpty } from "class-validator";
import {Role } from "../entities/training-users.entity";

export class MemberDto {
  @IsNotEmpty()
  userId: number;

  @IsEnum(Role)
  role: Role;
}