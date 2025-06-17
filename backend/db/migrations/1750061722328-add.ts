import { MigrationInterface, QueryRunner } from "typeorm";

export class Add1750061722328 implements MigrationInterface {
    name = 'Add1750061722328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_28d01f236b234d301dd5e75c783"`);
        await queryRunner.query(`ALTER TABLE "session" RENAME COLUMN "program_id" TO "training_id"`);
        await queryRunner.query(`CREATE TYPE "public"."training_users_role_enum" AS ENUM('candidate', 'admin', 'trainer', 'moderator')`);
        await queryRunner.query(`CREATE TABLE "training_users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "role" "public"."training_users_role_enum" NOT NULL DEFAULT 'candidate', "user_id" integer, "training_id" integer, CONSTRAINT "PK_99ad5c36f7ff4873d51ff4a5e41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "training" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "description" character varying NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "training_users" ADD CONSTRAINT "FK_ca96aa419f4e00c2d7a20fe33b4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "training_users" ADD CONSTRAINT "FK_9d611cc227e0af8b547ca6c0d45" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_607fd10bf744934c8b3e6c9483a" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_607fd10bf744934c8b3e6c9483a"`);
        await queryRunner.query(`ALTER TABLE "training_users" DROP CONSTRAINT "FK_9d611cc227e0af8b547ca6c0d45"`);
        await queryRunner.query(`ALTER TABLE "training_users" DROP CONSTRAINT "FK_ca96aa419f4e00c2d7a20fe33b4"`);
        await queryRunner.query(`DROP TABLE "training"`);
        await queryRunner.query(`DROP TABLE "training_users"`);
        await queryRunner.query(`DROP TYPE "public"."training_users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "session" RENAME COLUMN "training_id" TO "program_id"`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_28d01f236b234d301dd5e75c783" FOREIGN KEY ("program_id") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
