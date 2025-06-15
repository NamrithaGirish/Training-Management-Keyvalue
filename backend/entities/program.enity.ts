import { Column, Entity } from "typeorm";
import AbstractBaseEntity from "./abstract.entity";

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
}
