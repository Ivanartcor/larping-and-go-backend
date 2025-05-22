import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1747785809363 implements MigrationInterface {
    name = 'InitSchema1747785809363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" DROP COLUMN "attributes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" ADD "attributes" jsonb NOT NULL DEFAULT '{}'`);
    }

}
