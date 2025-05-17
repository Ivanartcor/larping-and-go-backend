import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1747485643259 implements MigrationInterface {
    name = 'InitSchema1747485643259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar_url"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar_url" text`);
    }

}
