import { MigrationInterface, QueryRunner } from "typeorm";

export class AssignmentEntity1750049511193 implements MigrationInterface {
    name = 'AssignmentEntity1750049511193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "assignments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "description" character varying, "reference_url" character varying, "due_date" date NOT NULL, "session_id" integer, CONSTRAINT "PK_c54ca359535e0012b04dcbd80ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD CONSTRAINT "FK_0794a8fbaac4a2eea0f6bba5bed" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignments" DROP CONSTRAINT "FK_0794a8fbaac4a2eea0f6bba5bed"`);
        await queryRunner.query(`DROP TABLE "assignments"`);
    }

}
