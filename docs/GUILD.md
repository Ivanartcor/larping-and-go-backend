# 🛡️ Documentación del módulo `guilds`

*Gestión de hermandades, membresías, roles, anuncios, eventos internos y chat grupal en Larping & Go*

Este módulo representa el sistema de **hermandades (guilds)** en la plataforma. Cada guild es una organización de jugadores con:

* Identidad y lore personalizados.
* Configuración de privacidad y tipos de acceso.
* Sistema jerárquico de roles con permisos.
* Gestión de miembros, anuncios, eventos y chat privado.

> ## 🔗 Documentación dividida por secciones:
>
> * [`Sistema de Roles`](./GUILD-ROLES.md)
> * [`Sistema de Miembros e Invitaciones`](./GUILD-MEMBERSHIPS.md)
> * [`Sistema de Anuncios Internos y Encuestas`](./GUILD-ANNOUNCEMENTS.md)
> * [`Sistema de Eventos Internos`](./GUILD-INTERNAL-EVENTS.md)
> * [`Chat Grupal (explicado en el sistema de chat general)`](./CHAT.md)

---

## 📑 Índice

1. [Entidad Guild](#1-tabla-guilds)
2. [Modelo de Entidades y Relaciones](#2--modelo-de-entidades-y-relaciones)
3. [Sistema de Roles y Permisos](#3--sistema-de-roles-y-permisos)
4. [Arquitectura del Módulo (DDD)](#4--arquitectura-de-carpetas-ddd)
5. [Reglas de Negocio](#5--reglas-de-negocio-clave)

---

## 1. Tabla `guilds`

Representa la hermandad en sí: configuración, identidad, liderazgo y parámetros de acceso.

| Columna            | Tipo                 | Detalles                                        |
| ------------------ | -------------------- | ----------------------------------------------- |
| `id`               | `uuid`               | PK `gen_random_uuid()`                          |
| `name`             | `varchar(60)`        | Único. Nombre visible (insensible a mayúsculas) |
| `slug`             | `varchar(80)`        | Único. Alias URL‑safe derivado de `name`        |
| `description`      | `text`               | Breve descripción visible en listados           |
| `emblem_url`       | `text`               | URL del escudo o imagen oficial                 |
| `rules`            | `text`               | Normativa en formato markdown                   |
| `history`          | `text`               | Cronología y lore de la hermandad               |
| `privacy`          | `guild_privacy` ENUM | `public` / `private`                            |
| `access_type`      | `guild_access` ENUM  | `public` / `invite` / `code`                    |
| `access_code_hash` | `varchar(255)`       | SHA‑256 (si `access_type = 'code'`)             |
| `leader_user_id`   | `uuid`               | FK → `users.id`                                 |
| `member_count`     | `int`                | Denormalizado, `DEFAULT 1`, `CHECK ≥ 1`         |
| `is_active`        | `boolean`            | Soft‑delete. `DEFAULT true`                     |
| `created_at`       | `timestamptz`        | Fecha de creación                               |
| `updated_at`       | `timestamptz`        | Última actualización                            |

#### Índices recomendados

```sql
CREATE UNIQUE INDEX ux_guild_name  ON guilds (lower(name));
CREATE UNIQUE INDEX ux_guild_slug  ON guilds (slug);
CREATE        INDEX ix_guild_leader ON guilds (leader_user_id);
CREATE INDEX gin_guild_search ON guilds
  USING gin (to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(description,'')));
```

---

## 2 · Modelo de Entidades y Relaciones

| Entidad                  | Rol                                                                                      | Relaciones clave                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Guild**                | Agregado raíz. Configuración, visibilidad, lore, normas, privacidad, líder.              | 1\:N `GuildRole`, `GuildMembership`, `GuildAnnouncement`, `GuildInternalEvent` |
| **GuildRole**            | Rol con nombre, posición jerárquica y permisos                                           | N:1 `Guild`                                                                    |
| **GuildMembership**      | Unión entre `User` y `Guild`. Posee rol y estado (`pending`, `active`, `kicked`, `left`) | N:1 `Guild`, `User`, `GuildRole`                                               |
| **GuildInvite**          | Solicitudes o invitaciones activas para ingresar a una guild                             | N:1 `Guild`, `User` (remitente)                                                |
| **GuildAnnouncement**    | Entrada de tablón, puede ser general o encuesta                                          | N:1 `Guild`, 1\:N `GuildPollOption`, `GuildVote`                               |
| **GuildInternalEvent**   | Eventos internos como entrenamientos, reuniones o misiones                               | N:1 `Guild`, 1\:N `GuildEventAttendance`                                       |
| **GuildPollOption**      | Opciones de una encuesta dentro de un anuncio                                            | N:1 `GuildAnnouncement`                                                        |
| **GuildVote**            | Registro de voto por usuario                                                             | N:1 `GuildPollOption`, `User`                                                  |
| **GuildEventAttendance** | Registro de asistencia de usuarios a eventos                                             | N:1 `GuildInternalEvent`, `User`                                               |

### 2.1 Diagrama lógico resumido

```
users ─╴< guild_memberships >╶─ guilds ─╶< guild_roles
                           ╰─< guild_announcements >─╶< guild_poll_options >╶─< guild_votes
                           ╰─< guild_internal_events >╶< guild_event_attendance
                           ╰─< guild_invites
```

---

## 3 · Sistema de Roles y Permisos

Permisos representados con bit-mask (`int` de 0 a 127). Se interpretan combinando bits:

| Bit | Valor | Permiso             | Descripción                          |
| --- | ----- | ------------------- | ------------------------------------ |
| 0   | 1     | `EDIT_INFO`         | Editar configuración general         |
| 1   | 2     | `MANAGE_MEMBERS`    | Aceptar, expulsar y revisar miembros |
| 2   | 4     | `MANAGE_ROLES`      | Editar roles con menor rango         |
| 3   | 8     | `POST_ANNOUNCEMENT` | Publicar en el tablón                |
| 4   | 16    | `CREATE_EVENTS`     | Crear eventos internos               |
| 5   | 32    | `CHAT`              | Participar en el chat grupal         |
| 6   | 64    | `CREATE_ROLES`      | Crear nuevos roles                   |
| —   | 127   | `ALL`               | Todos los permisos (rol de Líder)    |

---

## 4 · Arquitectura del Módulo (DDD)

```
guilds/
├─ domain/
│   ├─ entities/            → `Guild`, `GuildRole`, `GuildMembership`, etc.
│   └─ dto/                 → `create-guild.dto.ts`, `guild-details.dto.ts`, etc.
├─ application/
│   ├─ helpers/
│   ├─ jobs/
│   ├─ ports/               → `i-guild.repository.ts`
│   ├─ use-cases/           → `CreateGuildUseCase`, `UpdateGuildUseCase`, etc.
│   ├─ queries/             → `GetGuildPublicQuery`, `GetGuildInternalQuery`, etc.
│   └─ guilds.service.ts    → Façade
├─ infrastructure/
│   ├─ decorators/
│   ├─ repositories/        → `guild.repository.ts`
│   ├─ controllers/         → `guilds.controller.ts`
│   └─ guards/              → `GuildMemberGuard`, `GuildPermissionsGuard`, decoradores
└─ guilds.module.ts
```

---

## 5 · Reglas de Negocio Clave

1. **Jerarquía de roles**: los miembros sólo pueden gestionar roles con posición numérica mayor (menor jerarquía).
2. **Rol de Líder**: único e inmutable. Sólo el Líder puede transferir liderazgo.
3. **`memberCount`**: contador denormalizado de miembros. Se actualizará vía trigger (Fase 4).
4. **Privacidad y tipo de acceso**: `privacy = private` excluye del buscador; `accessType` regula entrada (`public`, `invite`, `code`).
5. **Soft-delete**: el campo `is_active = false` desactiva la guild sin eliminarla físicamente.

---
Para ver mas sobre el resto de funcionalidades dentro de una hermandad, vaya a la
  [**documentación dividida por secciones**](#🔗-documentación-dividida-por-secciones) del inicio 

  ---

© 2025 – Larping & Go. Todos los derechos reservados.
