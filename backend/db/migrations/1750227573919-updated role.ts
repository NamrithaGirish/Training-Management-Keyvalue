import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedRole1750227573919 implements MigrationInterface {
    name = 'UpdatedRole1750227573919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "description" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "description" DROP NOT NULL`);
    }

}
