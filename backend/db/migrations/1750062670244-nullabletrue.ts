import { MigrationInterface, QueryRunner } from "typeorm";

export class Nullabletrue1750062670244 implements MigrationInterface {
    name = 'Nullabletrue1750062670244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "material_quality_feedback" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "session_feedback" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "session_feedback" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "material_quality_feedback" SET NOT NULL`);
    }

}
