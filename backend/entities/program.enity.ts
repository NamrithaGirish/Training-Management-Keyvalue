import { Column, Entity, OneToMany } from "typeorm";
import AbstractBaseEntity from "./abstract.entity";
<<<<<<< HEAD
import { Session } from "./session.entity"
=======
import { Session } from "./session.entity";
import { UserSession } from "./userSession.entity";
>>>>>>> 9fefb53 (update head)

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

<<<<<<< HEAD
=======
  @OneToMany(() => UserSession, (userSession) => userSession.session)
  userSessions: UserSession[];
>>>>>>> 9fefb53 (update head)
}
