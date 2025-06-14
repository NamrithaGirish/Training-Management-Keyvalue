import { Column, Entity } from "typeorm";

import AbstractBaseEntity from "./abstract.entity";

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
}
