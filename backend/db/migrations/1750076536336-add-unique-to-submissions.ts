import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueToSubmissions1750076536336 implements MigrationInterface {
    name = 'AddUniqueToSubmissions1750076536336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignment_submission" ADD CONSTRAINT "UQ_f701e74d360c213a63371a5fa85" UNIQUE ("user_id", "assignment_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignment_submission" DROP CONSTRAINT "UQ_f701e74d360c213a63371a5fa85"`);
    }

}
