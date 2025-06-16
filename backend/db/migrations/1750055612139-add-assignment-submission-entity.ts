import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAssignmentSubmissionEntity1750055612139 implements MigrationInterface {
    name = 'AddAssignmentSubmissionEntity1750055612139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "assignment_submission" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "completed_on" TIMESTAMP NOT NULL, "completion_link" character varying NOT NULL, "file" character varying NOT NULL, "user_id" integer, "assignment_id" integer, CONSTRAINT "PK_098e58241f975dce9d82c759034" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assignment_submission" ADD CONSTRAINT "FK_b133b37f3fb27f44cfd1911a05a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assignment_submission" ADD CONSTRAINT "FK_1323428daa36441de68edd30a3f" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignment_submission" DROP CONSTRAINT "FK_1323428daa36441de68edd30a3f"`);
        await queryRunner.query(`ALTER TABLE "assignment_submission" DROP CONSTRAINT "FK_b133b37f3fb27f44cfd1911a05a"`);
        await queryRunner.query(`DROP TABLE "assignment_submission"`);
    }

}
