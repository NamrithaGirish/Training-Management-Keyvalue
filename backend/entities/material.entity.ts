// entities/material.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Session } from "./session.entity";
import AbstractBaseEntity from "./abstract.entity";

@Entity()
export class Material extends AbstractBaseEntity {
  
  @ManyToOne(() => Session, (session) => session.materials, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "session_id" })
  session: Session;

  @Column("text")
  link: string;

}
