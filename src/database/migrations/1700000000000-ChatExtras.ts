import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChatExtras1700000000000 implements MigrationInterface {
    name = 'ChatExtras1700000000000';

    public async up(qr: QueryRunner): Promise<void> {
        /* 1 ─────────────  GIN full-text  */
        await qr.query(`
      CREATE INDEX IF NOT EXISTS gin_cm_content
      ON chat_messages
      USING gin(to_tsvector('simple', content));
    `);

        /* 2 ─────────────  last_message_at trigger  */
        await qr.query(`
      CREATE OR REPLACE FUNCTION chat_update_lastmsg()
      RETURNS trigger LANGUAGE plpgsql AS $$
      BEGIN
        UPDATE chat_channels
        SET last_message_at = NEW.sent_at
        WHERE id = NEW.channel_id;
        RETURN NEW;
      END$$;
    `);

        await qr.query(`
      DROP TRIGGER IF EXISTS trg_chat_lastmsg ON chat_messages;
      CREATE TRIGGER trg_chat_lastmsg
      AFTER INSERT ON chat_messages
      FOR EACH ROW EXECUTE FUNCTION chat_update_lastmsg();
    `);

        /* 3 ─────────────  canal de guild automático  */
        await qr.query(`
      CREATE OR REPLACE FUNCTION chat_create_guild_channel()
      RETURNS trigger LANGUAGE plpgsql AS $$
      BEGIN
        INSERT INTO chat_channels(id, type, guild_id, topic)
        VALUES (gen_random_uuid(), 'guild', NEW.id, 'Channel general de la hermandad');
        RETURN NEW;
      END$$;
    `);

        await qr.query(`
      DROP TRIGGER IF EXISTS trg_chat_guild_channel ON guilds;
      CREATE TRIGGER trg_chat_guild_channel
      AFTER INSERT ON guilds
      FOR EACH ROW EXECUTE FUNCTION chat_create_guild_channel();
    `);

        /* 4 ─────────────  check adicional carrera direct  */
        await qr.query(`
  -- Paso previo imprescindible
  CREATE EXTENSION IF NOT EXISTS pgcrypto;

  CREATE OR REPLACE FUNCTION chat_direct_hash(a UUID, b UUID)
  RETURNS TEXT IMMUTABLE LANGUAGE sql
  AS $$
    SELECT encode(digest(
             LEAST(a::text, b::text) || ':' || GREATEST(a::text, b::text),
             'sha256'
           ), 'hex')
  $$;
`);
    }

    public async down(qr: QueryRunner): Promise<void> {
        await qr.query(`DROP FUNCTION IF EXISTS chat_direct_hash(UUID,UUID)`);
        await qr.query(`DROP TRIGGER IF EXISTS trg_chat_guild_channel ON guilds`);
        await qr.query(`DROP FUNCTION IF EXISTS chat_create_guild_channel`);
        await qr.query(`DROP TRIGGER IF EXISTS trg_chat_lastmsg ON chat_messages`);
        await qr.query(`DROP FUNCTION IF EXISTS chat_update_lastmsg`);
        await qr.query(`DROP INDEX IF EXISTS gin_cm_content`);
    }
}
