import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVotesTrigger1748500000000 implements MigrationInterface {
  name = 'AddVotesTrigger1748500000000';

  public async up(qr: QueryRunner): Promise<void> {
    await qr.query(`
      /* ---- función ----------------------------- */
      CREATE OR REPLACE FUNCTION trg_vote_count()
      RETURNS trigger LANGUAGE plpgsql AS $$
      BEGIN
        IF TG_OP = 'INSERT' THEN
          UPDATE guild_poll_options
          SET votes_count = votes_count + 1
          WHERE id = NEW.poll_option_id;
        ELSE
          UPDATE guild_poll_options
          SET votes_count = votes_count - 1
          WHERE id = OLD.poll_option_id;
        END IF;
        RETURN NULL;
      END $$;

      /* ---- trigger ----------------------------- */
      CREATE TRIGGER trg_votes
      AFTER INSERT OR DELETE ON guild_votes
      FOR EACH ROW EXECUTE PROCEDURE trg_vote_count();
    `);
  }

  public async down(qr: QueryRunner): Promise<void> {
    await qr.query(`
      DROP TRIGGER IF EXISTS trg_votes ON guild_votes;
      DROP FUNCTION IF EXISTS trg_vote_count();
    `);
  }
}
