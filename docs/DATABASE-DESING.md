# 🧬 Diseño de la Base de Datos en Larping & Go

*PostgreSQL · TypeORM · NestJS*

Este documento describe la estructura lógica de la base de datos del proyecto **Larping & Go**, cubriendo todas las entidades, relaciones, vistas, triggers, funciones y convenciones utilizadas para reflejar las necesidades del dominio LARP en una arquitectura relacional robusta.

---

## 📑 Índice

* [📌 Introducción](#-introducción)
* [📋 Principales entidades](#-principales-entidades)
* [🔗 Relaciones y claves foráneas](#-relaciones-y-claves-foráneas)
* [📐 Convenciones de diseño](#-convenciones-de-diseño)
* [🧠 Vistas y consultas complejas](#-vistas-y-consultas-complejas)
* [⚙️ Triggers y funciones SQL](#-triggers-y-funciones-sql)
* [🧪 Validación y restricciones](#-validación-y-restricciones)

---

### 📌 Introducción

La base de datos es relacional (PostgreSQL) y está normalizada. Usa **TypeORM** para generar y sincronizar el esquema a partir de las entidades definidas en los módulos del backend. Se utiliza el patrón DDD liviano, por lo que cada módulo define sus propias entidades dentro de `domain/entities/`.

Además, se han implementado migraciones versionadas, una vista materializada para búsqueda avanzada y funciones específicas para mantener integridad y rendimiento.

---

### 🗺️ Diagrama entidad-relación (ERD)

> A continuación se muestra una imagen representativa del diseño relacional completo de la base de datos. Incluye las entidades y sus relaciones clave. Puedes ampliarla para consultar las uniones, claves foráneas y tipos de dato utilizados.

![ERD Larping & Go](./assets/ERD-larping-and-go-11-06-2025.pgerd.png)

---

### 📋 Principales entidades

A continuación, se listan las entidades actualmente implementadas en el modelo de datos:

* **User**: usuario registrado con datos públicos y privados.
* **Character**: personaje LARP creado por un usuario.
* **CharacterProperty**: propiedad estructurada de un personaje.
* **Guild**: hermandad o grupo al que pueden unirse los personajes.
* **GuildMembership**: asociación entre usuario y guild.
* **GuildRole**: roles dentro de la guild (Líder, Oficial, etc.).
* **GuildInvite**: invitaciones a una hermandad.
* **GuildAnnouncement**: anuncios publicados en la hermandad.
* **GuildPollOption**: opciones de votación dentro de un anuncio tipo encuesta.
* **GuildVote**: voto de un usuario sobre una opción.
* **GuildEventAttendance**: registro de asistencia a eventos internos.
* **GuildInternalEvent**: eventos propios de una guild.
* **GlobalEvent**: eventos públicos visibles para toda la comunidad.
* **GlobalEventAttendance**: asistencia a eventos globales.
* **EventCategory**: categorías maestras para clasificar eventos.
* **EventMedia**: archivos multimedia adjuntos a eventos.
* **ChatChannel**: canal de chat (directo o grupal).
* **ChatMessage**: mensaje individual enviado en un canal.
* **ChatAttachment**: archivo adjunto a un mensaje.
* **ChatParticipant**: usuarios activos en un canal.
* **ChatMessageRead**: control de lectura de mensajes.
* **Notification**: sistema de alertas del sistema.
* **SearchIndex**: vista materializada para búsquedas combinadas.
* **PasswordResetToken**: entidad utilizada para gestionar solicitudes de restablecimiento de contraseña.

Cada entidad tiene su archivo `.entity.ts` y se define con decoradores de TypeORM. Muchas de ellas están relacionadas entre sí mediante claves foráneas y cumplen funciones específicas dentro del dominio DDD del sistema.

---

### 🔗 Relaciones y claves foráneas

Se han definido relaciones explícitas usando `@ManyToOne`, `@OneToMany`, `@JoinColumn`, etc. Las claves foráneas tienen restricciones `ON DELETE CASCADE` cuando aplica.

Ejemplos:

* Un `Character` pertenece a un `User`.
* Un `GuildAnnouncement` está vinculado a un `Guild` y a un `Character` (autor).
* Un `GuildMembership` referencia a `User`, `Guild` y `GuildRole`.

Estas relaciones son mapeadas por TypeORM y reflejadas en las migraciones.

---

### 📐 Convenciones de diseño

* Nombres en `snake_case` para columnas, usando `@Column({ name: '...' })` si es necesario.
* Entidades en singular (`User`, `Character`) y tablas generadas en plural automáticamente.
* Relación inversa bien definida para todas las asociaciones.
* `created_at`, `updated_at` y `deleted_at` en tablas relevantes.
* Enumeraciones definidas como `enum` en TypeScript + mapeo PostgreSQL.

---

### 🧠 Vistas y consultas complejas

#### `search_index` (Materialized View)

Vista materializada que unifica información de personajes, usuarios y hermandades en un único índice de búsqueda.

Se crea manualmente en una migración con SQL:

```sql
CREATE MATERIALIZED VIEW search_index AS
  SELECT ...
UNION ALL
  SELECT ...;

CREATE INDEX gin_si_tsv ON search_index USING gin(tsv);
```

Refrescable con:

```sql
REFRESH MATERIALIZED VIEW CONCURRENTLY search_index;
```

---

### ⚙️ Triggers y funciones SQL

En migraciones manuales también se han definido triggers y funciones. Ejemplo:

* **Trigger \*\*\*\*`update_vote_count`**:
  Actualiza el número de votos de un anuncio tipo votación al insertar o eliminar en `guild_vote`.

```sql
CREATE FUNCTION update_vote_count() RETURNS trigger AS $$
BEGIN
  UPDATE guild_poll_option
  SET votes = (
    SELECT COUNT(*) FROM guild_vote WHERE option_id = NEW.option_id
  )
  WHERE id = NEW.option_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_vote_count
AFTER INSERT OR DELETE ON guild_vote
FOR EACH ROW
EXECUTE FUNCTION update_vote_count();
```

---

### 🧪 Validación y restricciones

* Claves primarias (`id`) auto-generadas con UUID v4.
* Restricciones `NOT NULL` donde corresponde.
* Índices `UNIQUE` para nombres únicos o alias (`slug`, `username`, etc.).
* Verificaciones adicionales con `Check` si es necesario (por ejemplo: fechas de eventos).

---

Este diseño de base de datos está orientado a escalabilidad, mantenibilidad y refleja fielmente la estructura de dominio de la aplicación.
