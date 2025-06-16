import { Column, Entity, OneToMany } from "typeorm";
import AbstractBaseEntity from "./abstract.entity";
import { Session } from "./session.entity";
import { UserSession } from "./user-session.entity";

@Entity()
export class Program extends AbstractBaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: "date" })
  start_date: Date;

  @Column({ type: "date" })
  end_date: Date;

  @OneToMany(() => Session, (session) => session.program)
  sessions: Session[];

  @OneToMany(() => UserSession, (userSession) => userSession.session)
  userSessions: UserSession[];
}
