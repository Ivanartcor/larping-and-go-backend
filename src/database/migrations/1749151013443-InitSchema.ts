import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1749151013443 implements MigrationInterface {
    name = 'InitSchema1749151013443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."ix_gie_highlighted"`);
        await queryRunner.query(`DROP INDEX "public"."ix_gi_expires"`);
        await queryRunner.query(`ALTER TABLE "guild_roles" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "guild_roles" ADD "icon" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guild_roles" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "guild_roles" ADD "icon" character varying(50)`);
        await queryRunner.query(`CREATE INDEX "ix_gi_expires" ON "guild_invites" ("expires_at") WHERE (status = 'pending'::guild_invites_status_enum)`);
        await queryRunner.query(`CREATE INDEX "ix_gie_highlighted" ON "guild_internal_events" ("highlighted") WHERE (highlighted = true)`);
    }

}
