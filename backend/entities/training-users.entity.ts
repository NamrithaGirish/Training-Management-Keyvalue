import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
} from "typeorm";
import { User } from "./user.entity";

import AbstractBaseEntity from "./abstract.entity";
import { Training } from "./training.entity";

export enum TrainingUserRole {
  CANDIDATE = "candidate",
  ADMIN = "admin",
  TRAINER = "trainer",
  MODERATOR = "moderator",
}

@Entity("training_users")
export class TrainingUser extends AbstractBaseEntity {
  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Training, { onDelete: "CASCADE" })
  training: Training;

  @Column({
    type: "enum",
    enum: TrainingUserRole,
    default: TrainingUserRole.CANDIDATE,
  })
  role: TrainingUserRole;
}
