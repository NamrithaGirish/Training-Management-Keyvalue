import { MigrationInterface, QueryRunner } from "typeorm";

export class UserSession1750048186467 implements MigrationInterface {
    name = 'UserSession1750048186467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_session" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "role" character varying(100) NOT NULL, "user_id" integer, "session_id" integer, CONSTRAINT "UQ_529607b3083c0ff6d138fbb7361" UNIQUE ("user_id", "session_id"), CONSTRAINT "PK_adf3b49590842ac3cf54cac451a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_session" ADD CONSTRAINT "FK_13275383dcdf095ee29f2b3455a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_session" ADD CONSTRAINT "FK_50c2b6e58a37166dab435111f25" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_session" DROP CONSTRAINT "FK_50c2b6e58a37166dab435111f25"`);
        await queryRunner.query(`ALTER TABLE "user_session" DROP CONSTRAINT "FK_13275383dcdf095ee29f2b3455a"`);
        await queryRunner.query(`DROP TABLE "user_session"`);
    }

}
