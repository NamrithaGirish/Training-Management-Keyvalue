import { Entity, PrimaryGeneratedColumn, Column, Check } from "typeorm";
import { User } from "./user.entity";
import AbstractBaseEntity from "./abstract.entity";

export enum FeedbackType {
	ABOUT_TRAINER = "aboutTrainer",
	ABOUT_CANDIDATE = "aboutCandidate",
}

@Check(`"rating" >= 0 AND "rating" <= 10`)
@Entity("feedback")
export class Feedback extends AbstractBaseEntity {
	@Column()
	from: User;

	@Column()
	to: User;

	// @Column()
	// session: Session;

	@Column("int")
	rating: number;

	@Column({ type: "text", nullable: true })
	comments: string;

	@Column({
		type: "enum",
		enum: FeedbackType,
	})
	type: FeedbackType;
}
