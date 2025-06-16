import { MigrationInterface, QueryRunner } from "typeorm";

export class Nullables1750070861324 implements MigrationInterface {
    name = 'Nullables1750070861324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "pre_req" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "pre_req" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "description" SET NOT NULL`);
    }

}
