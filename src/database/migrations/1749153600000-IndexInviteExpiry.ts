import { MigrationInterface, QueryRunner } from 'typeorm';

export class IndexInviteExpiry1749153600000 implements MigrationInterface {
  name = 'IndexInviteExpiry1749153600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS ix_gi_expires
        ON guild_invites (expires_at)
        WHERE status = 'pending';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS ix_gi_expires`);
  }
}
