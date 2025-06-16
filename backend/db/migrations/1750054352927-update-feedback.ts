import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFeedback1750054352927 implements MigrationInterface {
    name = 'UpdateFeedback1750054352927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."feedback_type_enum" AS ENUM('aboutTrainer', 'aboutCandidate')`);
        await queryRunner.query(`CREATE TABLE "feedback" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "rating" integer NOT NULL, "comments" text, "type" "public"."feedback_type_enum" NOT NULL, "from_id" integer, "to_id" integer, "session_id" integer, CONSTRAINT "CHK_7251e80557ba660c9cfd51a0ec" CHECK ("rating" >= 0 AND "rating" <= 10), CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_876eb6a326971d11f41c30dee48" FOREIGN KEY ("from_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_eea9c144eb3b78994f2d375df78" FOREIGN KEY ("to_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_e5bfaf86ab81e5ce5c1b54559d7" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_e5bfaf86ab81e5ce5c1b54559d7"`);
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_eea9c144eb3b78994f2d375df78"`);
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_876eb6a326971d11f41c30dee48"`);
        await queryRunner.query(`DROP TABLE "feedback"`);
        await queryRunner.query(`DROP TYPE "public"."feedback_type_enum"`);
    }

}
