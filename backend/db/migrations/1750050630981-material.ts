import { MigrationInterface, QueryRunner } from "typeorm";

export class Material1750050630981 implements MigrationInterface {
    name = 'Material1750050630981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "material" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "link" text NOT NULL, "session_id" integer, CONSTRAINT "PK_0343d0d577f3effc2054cbaca7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "material" ADD CONSTRAINT "FK_fe9abdd84e98fa1a9b91226a9ce" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "material" DROP CONSTRAINT "FK_fe9abdd84e98fa1a9b91226a9ce"`);
        await queryRunner.query(`DROP TABLE "material"`);
    }

}
