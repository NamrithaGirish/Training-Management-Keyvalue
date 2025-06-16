import { Column, Entity,JoinColumn,ManyToOne, OneToMany, Timestamp } from "typeorm";

import AbstractBaseEntity from "./abstract.entity";
import { Program } from "./program.enity";
import { Assignment } from "./assignment.entity";

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
  

  @Column()
  description:string;

  @Column({default:"Draft" as Status})
  status:Status

  @Column()
  preReq: string;

  @Column({type:'timestamp'})
  startTime:Date;

  @Column({type:'timestamp'})
  endTime:Date;

  @Column({ type: 'text' })
  materialQualityFeedback: string;

  @Column({ type: 'text' })
  sessionFeedback: string;

  @OneToMany(() => Assignment, (assignments) => assignments.session, {
	})
  assignments: Assignment[];
  
}

