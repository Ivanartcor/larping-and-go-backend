import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1747783842831 implements MigrationInterface {
    name = 'InitSchema1747783842831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "character_properties" ALTER COLUMN "value" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "character_properties" ALTER COLUMN "value" SET NOT NULL`);
    }

}
