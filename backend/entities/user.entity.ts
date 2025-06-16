import { Column, Entity, OneToMany } from "typeorm";

import AbstractBaseEntity from "./abstract.entity";
import { Feedback } from "./feedback.entity";
import AssignmentSubmission from "./assignmentSubmission.entity";

@Entity()
export class User extends AbstractBaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // Password should not be show up on SELECT queries unless explicitly requested
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Feedback, (feedback) => feedback.from, {})
  receivedFeedbacks: Feedback[];

  @OneToMany(() => Feedback, (feedback) => feedback.to, {})
  sentFeedbacks: Feedback[];

  @OneToMany(
    () => AssignmentSubmission,
    (assignmentSubmission) => assignmentSubmission.user
  )
  assignments: AssignmentSubmission[];
}
