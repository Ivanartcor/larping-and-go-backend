import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventsInit1748986000000 implements MigrationInterface {
  name = 'EventsInit1748986000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    /* ------------------------------------------------------------ */
    /* 1. Índices auxiliares                                        */
    /* ------------------------------------------------------------ */
    await queryRunner.query(`
      -- Búsqueda rápida por destacado
      CREATE INDEX IF NOT EXISTS ix_gie_highlighted
        ON guild_internal_events (highlighted)
        WHERE highlighted = TRUE
    `);

    /* ------------------------------------------------------------ */
    /* 2. Trigger · attendee_count                                  */
    /* ------------------------------------------------------------ */
    await queryRunner.query(`
      -- Función generadora
      CREATE OR REPLACE FUNCTION trg_update_gie_attendee_count()
      RETURNS TRIGGER AS $$
      BEGIN
        /* INSERT -------------------------------------------------- */
        IF TG_OP = 'INSERT' THEN
          IF NEW.status = 'confirmed' THEN
            UPDATE guild_internal_events
               SET attendee_count = attendee_count + 1
             WHERE id = NEW.event_id;
          END IF;
          RETURN NEW;
        END IF;

        /* UPDATE -------------------------------------------------- */
        IF TG_OP = 'UPDATE' THEN
          -- De confirmado a cancelado
          IF OLD.status = 'confirmed' AND NEW.status <> 'confirmed' THEN
            UPDATE guild_internal_events
               SET attendee_count = attendee_count - 1
             WHERE id = NEW.event_id;
          -- De cancelado a confirmado
          ELSIF OLD.status <> 'confirmed' AND NEW.status = 'confirmed' THEN
            UPDATE guild_internal_events
               SET attendee_count = attendee_count + 1
             WHERE id = NEW.event_id;
          END IF;
          RETURN NEW;
        END IF;

        /* DELETE -------------------------------------------------- */
        IF TG_OP = 'DELETE' THEN
          IF OLD.status = 'confirmed' THEN
            UPDATE guild_internal_events
               SET attendee_count = attendee_count - 1
             WHERE id = OLD.event_id;
          END IF;
          RETURN OLD;
        END IF;

        RETURN NULL; -- seguridad
      END;
      $$ LANGUAGE plpgsql;
    `);

    /* Trigger para INSERT/UPDATE/DELETE */
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS trg_gie_attendance_count
        ON guild_event_attendance;

      CREATE TRIGGER trg_gie_attendance_count
      AFTER INSERT OR UPDATE OR DELETE ON guild_event_attendance
      FOR EACH ROW EXECUTE FUNCTION trg_update_gie_attendee_count();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /* Borrar trigger y función */
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS trg_gie_attendance_count
        ON guild_event_attendance;
      DROP FUNCTION IF EXISTS trg_update_gie_attendee_count;
    `);

    /* Quitar índice highlighted */
    await queryRunner.query(`
      DROP INDEX IF EXISTS ix_gie_highlighted;
    `);
  }
}