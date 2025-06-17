import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterSessionEntity1750191175688 implements MigrationInterface {
    name = 'AlterSessionEntity1750191175688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "start_time"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "end_time"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD "slot" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD "duration" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "description" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "slot"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "end_time" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD "start_time" TIMESTAMP NOT NULL`);
    }

}
