
import { Column, Entity,JoinColumn,ManyToOne, OneToMany, Timestamp } from "typeorm";
import AbstractBaseEntity from "./abstract.entity";
import { Program } from "./program.enity";
import { Assignment } from "./assignment.entity";
import { Feedback } from "./feedback.entity";
import { UserSession } from "./user-session.entity";
import { Material } from "./material.entity";

export enum Status{
Draft="Draft",
Scheduled="Scheduled",
InProgress="InProgress",
Completed="Completed"

}


@Entity()
export class Session extends AbstractBaseEntity {

  @Column()
  title: string;

  @ManyToOne(() => Program, (program) => program.sessions)
  program: Program;

  @Column({nullable:true})
  description: string;

  @Column({ default: "Draft" as Status })
  status: Status;

  @Column({nullable:true})
  preReq: string;

  @Column({type:'timestamp'})
  startTime:Date;

  @Column({type:'timestamp'})
  endTime:Date;

  @Column({ type: 'text' ,nullable:true})
  materialQualityFeedback?: string;

  @Column({ type: 'text' ,nullable:true})
  sessionFeedback?: string;

  @OneToMany(() => Assignment, (assignments) => assignments.session, {
	})
  assignments?: Assignment[];

  @OneToMany(() => Feedback, (feedbacks) => feedbacks.session, {
	})
  feedbacks?: Feedback[];

  @OneToMany(() => UserSession, (userSession) => userSession.session)
  userSessions?: UserSession[];

  @OneToMany(() => Material, (material) => material.session, {
    cascade: true,
  })
  materials?: Material[];
  
}
