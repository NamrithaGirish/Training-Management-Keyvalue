import { Column, Entity, ManyToOne } from "typeorm";
import AbstractBaseEntity from "./abstract.entity";
import { User } from "./user.entity";
import { Assignment } from "./assignment.entity";

@Entity()
export default class AssignmentSubmission extends AbstractBaseEntity {
  @Column()
  completedOn: Date;

  @Column()
  completionLink: string;

  @Column()
  file: string;

  @ManyToOne(() => User, (user) => user.assignments)
  user: User;

  @ManyToOne(() => Assignment, (assignment) => assignment.submissions)
  assignment: Assignment;
}
