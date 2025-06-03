import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1748897294975 implements MigrationInterface {
    name = 'InitSchema1748897294975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guild_announcements" ADD "is_closed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "guilds" DROP COLUMN "access_code_hash"`);
        await queryRunner.query(`ALTER TABLE "guilds" ADD "access_code_hash" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guilds" DROP COLUMN "access_code_hash"`);
        await queryRunner.query(`ALTER TABLE "guilds" ADD "access_code_hash" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "guild_announcements" DROP COLUMN "is_closed"`);
    }

}
