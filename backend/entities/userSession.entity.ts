import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
} from "typeorm";
import { User } from "./user.entity";
import { Session } from "./session.entity";
import AbstractBaseEntity from "./abstract.entity";

@Entity()
@Unique(["user", "session"]) // prevent duplicate pairs
export class UserSession extends AbstractBaseEntity{

  @ManyToOne(() => User, (user) => user.userSessions, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Session, (session) => session.userSessions, { onDelete: "CASCADE" })
  session: Session;

  @Column({ type: "varchar", length: 100 })
  role: string; 
 
}