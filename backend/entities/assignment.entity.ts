import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import AbstractBaseEntity from "./abstract.entity";

@Entity("assignments")
export class Assignment extends AbstractBaseEntity {
	// @ManyToOne(() => Session, (session) => session.assignments, {
	// 	onDelete: "SET NULL",
	// })
	// session: Session;

	@Column()
	title: string;

	@Column({ nullable: true })
	description?: string;

	@Column({ nullable: true })
	referenceUrl?: string;

	@Column({ type: "date" })
	dueDate: Date;
}
