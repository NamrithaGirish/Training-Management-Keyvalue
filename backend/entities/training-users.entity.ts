import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
} from "typeorm";


import AbstractBaseEntity from "./abstract.entity";
import { Training } from "./training.entity";
import { User } from "./user.entity";
// import { User } from "./user.entity";

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
