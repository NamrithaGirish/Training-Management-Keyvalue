import { Entity, Column, Check, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import AbstractBaseEntity from "./abstract.entity";
import { Session } from "./session.entity";

export enum FeedbackType {
	ABOUT_TRAINER = "aboutTrainer",
	ABOUT_CANDIDATE = "aboutCandidate",
}

@Check(`"rating" >= 0 AND "rating" <= 10`)
@Entity("feedback")
export class Feedback extends AbstractBaseEntity {
	@ManyToOne(() => User, (from) => from.sentFeedbacks, {
		onDelete: "CASCADE",
	})
	from: User;

	@ManyToOne(() => User, (from) => from.receivedFeedbacks, {
		onDelete: "CASCADE",
	})
	to: User;

	@ManyToOne(() => Session, (session) => session.feedbacks, {
		onDelete: "CASCADE",
	})
	session: Session;

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
