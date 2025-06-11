import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1749594332019 implements MigrationInterface {
    name = 'InitSchema1749594332019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_channels" ADD "auto_sync" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "chat_channels" ADD "parent_channel_id" uuid`);
        await queryRunner.query(`ALTER TABLE "chat_channels" ADD CONSTRAINT "FK_ce9b25899545e8af4f5961406e1" FOREIGN KEY ("parent_channel_id") REFERENCES "chat_channels"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_channels" DROP CONSTRAINT "FK_ce9b25899545e8af4f5961406e1"`);
        await queryRunner.query(`ALTER TABLE "chat_channels" DROP COLUMN "parent_channel_id"`);
        await queryRunner.query(`ALTER TABLE "chat_channels" DROP COLUMN "auto_sync"`);
    }

}
