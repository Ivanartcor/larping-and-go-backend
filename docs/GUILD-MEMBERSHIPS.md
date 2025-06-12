# 🤝 Documentación de Miembros e Invitaciones en Hermandades (`GuildMembership` y `GuildInvite`)

Este documento detalla los flujos de membresía de una hermandad en *Larping & Go*, incluyendo uniones, invitaciones, solicitudes y roles asociados.

---

## 📑 Índice

1. [Diseño de las Tablas](#1--diseño-de-las-tablas)
2. [Estados](#2--estados)
3. [Invitaciones y Solicitudes](#3--invitaciones-y-solicitudes)
4. [Casos de Uso](#4--casos-de-uso)
5. [DTO y Validaciones](#5--dto-y-validaciones)
6. [Repositorio y Métodos Clave](#6--repositorio-y-métodos-clave)
7. [Endpoints REST](#7--endpoints-rest)
8. [Reglas de Negocio](#8--reglas-de-negocio)
9. [Seguridad y Guards](#9--seguridad-y-guards)
10. [Cron de Expiración](#10--cron-de-expiración)
11. [Casos de Prueba](#11--casos-de-prueba)

---

## 1 · Diseño de las Tablas

### `guild_memberships`

Une usuarios y hermandades, indicando rol y estado del vínculo.

| Columna         | Tipo                     | Detalles                                 |
| --------------- | ------------------------ | ---------------------------------------- |
| `id`            | `uuid`                   | PK `gen_random_uuid()`                   |
| `user_id`       | `uuid`                   | FK → `users.id`                          |
| `guild_id`      | `uuid`                   | FK → `guilds.id`                         |
| `role_id`       | `uuid`                   | FK → `guild_roles.id`                    |
| `status`        | `membership_status` ENUM | `pending` / `active` / `kicked` / `left` |
| `invited_by_id` | `uuid`                   | FK → `users.id`, NULLABLE                |
| `joined_at`     | `timestamptz`            | Se rellena al pasar a `active`           |
| `left_at`       | `timestamptz`            | Fecha de salida o expulsión              |
| `created_at`    | `timestamptz`            | Creación                                 |
| `updated_at`    | `timestamptz`            | Actualización                            |

**Índices y restricciones**

```sql
CREATE UNIQUE INDEX ux_gm_user_guild ON guild_memberships (user_id, guild_id);
CREATE INDEX ix_gm_status ON guild_memberships (status);
CREATE INDEX ix_gm_guild_active ON guild_memberships (guild_id) WHERE status = 'active';
```

### `guild_invites`

Gestiona **invitaciones** y **solicitudes de acceso** a la hermandad.

| Columna              | Tipo                 | Detalles                                                  |
| -------------------- | -------------------- | --------------------------------------------------------- |
| `id`                 | `uuid`               | PK `gen_random_uuid()`                                    |
| `guild_id`           | `uuid`               | FK → `guilds.id`                                          |
| `type`               | `invite_type` ENUM   | `invite` / `request`                                      |
| `sender_user_id`     | `uuid`               | Usuario que envía la invitación o solicitud               |
| `target_user_id`     | `uuid`               | Usuario invitado (NULL si es invitación por email)        |
| `email`              | `varchar(255)`       | Opcional para invitaciones por email                      |
| `token_hash`         | `varchar(255)`       | SHA-256 del token de acceso                               |
| `expires_at`         | `timestamptz`        | Fecha de expiración                                       |
| `status`             | `invite_status` ENUM | `pending`, `accepted`, `rejected`, `cancelled`, `expired` |
| `handled_by_user_id` | `uuid`               | Usuario moderador que gestionó la invitación              |
| `handled_at`         | `timestamptz`        | Fecha de resolución                                       |
| `created_at`         | `timestamptz`        | Creación                                                  |
| `updated_at`         | `timestamptz`        | Última modificación                                       |

**Índices y enums**

```sql
CREATE INDEX ix_gi_guild_status ON guild_invites (guild_id, status);
CREATE UNIQUE INDEX ux_gi_token_hash ON guild_invites (token_hash) WHERE token_hash IS NOT NULL;
CREATE TYPE invite_type AS ENUM ('invite', 'request');
CREATE TYPE invite_status AS ENUM ('pending', 'accepted', 'rejected', 'cancelled', 'expired');
CREATE TYPE membership_status AS ENUM ('pending', 'active', 'kicked', 'left');
```

---

---

## 2 · Estados

### Estados de Membresía

* `pending`: en espera de aceptación.
* `active`: miembro actual.
* `kicked`: fue expulsado.
* `left`: abandonó voluntariamente.

### Estados de Invitación

* `pending`: invitación o solicitud aún no gestionada.
* `accepted`: ha sido aceptada, se ha activado (o reactivado) la membresía.
* `rejected`: fue rechazada por un moderador (o por el destinatario en caso de invitación directa).
* `cancelled`: eliminada por el moderador antes de gestionarse.
* `expired`: expiró automáticamente según `expiresAt`.

---

## 3 · Invitaciones y Solicitudes

| Tipo                  | Acción                                                           | Resultado                                              |
| --------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| Invitación directa    | Crea `guild_invite` con `target_user_id` y `status='pending'`    | Si acepta → se activa `guild_membership`.              |
| Invitación por link   | Genera token, almacena hash y `expires_at`                       | Cualquiera con cuenta válida y enlace puede unirse.    |
| Solicitud de acceso   | Usuario envía `request` con `sender_user_id`                     | Moderador acepta/rechaza → puede activar membresía.    |
| Aceptar               | Cambia a `accepted`, rellena `handled_by_user_id` y `handled_at` | Activa o crea `guild_membership`, incrementa contador. |
| Rechazar / Cancelar   | Cambia estado sin tocar membresía                                | Estado queda como `rejected` o `cancelled`.            |
| Expiración automática | Cron job revisa `expires_at` y cambia a `expired` si corresponde | El token deja de ser válido.                           |

---

## 4 · Casos de Uso

| UC                | Responsable  | Descripción                                             |
| ----------------- | ------------ | ------------------------------------------------------- |
| `RequestJoinUC`   | Usuario      | Envía solicitud a la guild si tipo de acceso lo permite |
| `JoinByCodeUC`    | Usuario      | Valida código y activa membresía                        |
| `SendInviteUC`    | Moderador    | Envía invitación directa o por email                    |
| `HandleInviteUC`  | Moderador    | Acepta o rechaza solicitud                              |
| `RespondInviteUC` | Destinatario | Acepta o rechaza una invitación                         |
| `KickMemberUC`    | Moderador    | Cambia estado a `kicked`                                |
| `LeaveGuildUC`    | Miembro      | Cambia estado a `left` si no es líder                   |

---

## 5 · DTO y Validaciones

* `InviteMemberDto`: `userId`
* `RequestJoinDto`: `accessCode?`
* `ChangeMemberRoleDto`: `memberId`, `roleId`

---

## 6 · Repositorio y Métodos Clave

| Método                  | Descripción                                                |
| ----------------------- | ---------------------------------------------------------- |
| `createInvite`          | Inserta nueva invitación                                   |
| `updateInvite`          | Cambia estado o expiración                                 |
| `findInviteById`        | Carga invitación con relaciones                            |
| `findInviteByHash`      | Recupera por hash (enlace público)                         |
| `expireInvites(cutoff)` | Marca como `expired` todas las vencidas                    |
| `createMembership`      | Inserta nueva membresía                                    |
| `updateMembership`      | Modifica estado                                            |
| `findMembershipAny`     | Devuelve incluso si `left/kicked` para poder reactivar     |
| `countActiveMembers`    | Para controlar el contador denormalizado                   |
| `findLowestRole`        | Rol con `position > 0` más bajo (para asignar por defecto) |

---

## 7 · Endpoints REST

```http
POST   /guilds/:id/requests             # RequestJoinUC
POST   /guilds/:id/join/:token          # JoinByCodeUC
GET    /guilds/:id/invites              # listPendingInvites
POST   /guilds/:id/invites              # SendInviteUC
PATCH  /guilds/:id/invites/:invId       # HandleInviteUC
PATCH  /guilds/:id/invites/:invId/respond # RespondInviteUC
GET    /guilds/:id/members              # listMembers
DELETE /guilds/:id/members              # KickMemberUC (body: memberId)
DELETE /guilds/:id/leave                # LeaveGuildUC
```

---

## 8 · Reglas de Negocio

* No se permite expulsar ni abandonar si se es líder.
* Cada usuario puede tener una única membresía por guild (incluso si `kicked/left`).
* Si el miembro se reactiva, se reutiliza la fila.
* Se evita escalada: solo puedes gestionar miembros con `position` mayor.
* El contador `memberCount` se mantiene sincronizado con los estados activos.

---

## 9 · Seguridad y Guards

* `JwtAuthGuard`: token válido.
* `GuildMemberGuard`: adjunta la membresía.
* `GuildPermissionsGuard`: requiere permisos específicos (`MANAGE_MEMBERS`).

---

## 10 · Cron de Expiración

**Tarea horaria:**

* Registra cron en `GuildsModule` con `@Cron('0 */60 * * * *')`
* Método: `expireInvites(now)`
* Cambia `status → expired` en invitaciones vencidas

**Índice parcial:**

```sql
CREATE INDEX ix_gi_expires ON guild_invites (expires_at) WHERE status = 'pending';
```

---

## 11 · Casos de Prueba

| #  | Escenario                                   | Precondición                                                | Pasos                                                                            | Resultado esperado                                       |
| -- | ------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------- |
| 1  | Solicitud → Aceptada                        | User *A* no es miembro                                      | A envía `POST /guilds/{id}/requests` → Moderador M `PATCH` `{status:'accepted'}` | Invite `accepted`, Membership `active`, `memberCount` +1 |
| 2  | Solicitud → Rechazada                       | Igual a #1                                                  | A envía request → M `PATCH` `{status:'rejected'}`                                | Invite `rejected`, sin membership, contador sin cambios  |
| 3  | Invitación directa → Aceptada               | A no es miembro                                             | M `POST /invites` → A `PATCH /invites/{id}/respond` `{accept:true}`              | Invite `accepted`, Membership `active`, `memberCount` +1 |
| 4  | Invitación directa → Rechazada              | Igual a #3                                                  | A responde `{accept:false}`                                                      | Invite `rejected`, contador sin cambios                  |
| 5  | Invitación cancelada por moderador          | Invitación pendiente                                        | M `PATCH /invites/{id}` `{status:'cancelled'}`                                   | Invite `cancelled`                                       |
| 6  | Enlace público (TOKEN)                      | Guild accessType = `code`, A no es miembro                  | A `POST /join/{token}`                                                           | Membership `active`, contador +1                         |
| 7  | Kick                                        | A es miembro (rol posición 3), M rol 1                      | M `DELETE /members` con `{memberId:A}`                                           | Membership `kicked`, contador -1                         |
| 8  | Reinvitar expulsado                         | A tiene status `kicked`                                     | M re‑invita → A acepta                                                           | Membership reactivada, contador +1                       |
| 9  | Leave                                       | A es miembro con rol > 0                                    | A `DELETE /leave`                                                                | Membership `left`, contador -1                           |
| 10 | Líder no puede abandonar                    | L es líder                                                  | L `DELETE /leave`                                                                | 403 Forbidden                                            |
| 11 | No se puede expulsar a rango superior       | B (rol 2) intenta kick a A (rol 1)                          | B `DELETE /members` con `{memberId:A}`                                           | 403 Forbidden                                            |
| 12 | Moderador no puede aceptar su propia invite | M crea invite y luego intenta aceptarla                     | M `PATCH /invites/{id}` `{status:'accepted'}`                                    | 403 Forbidden                                            |
| 13 | Invitación expirada                         | Invite con `expiresAt` < now                                | Cron job la marca `expired`                                                      | Token no válido → 403                                    |
| 14 | Integridad de contador                      | Comparar `memberCount` vs COUNT(\*) de `active` memberships | Ambos deben coincidir                                                            |                                                          |
| 15 | Ver lista de miembros                       | Usuario es miembro activo                                   | `GET /guilds/:id/members`                                                        | Devuelve lista `members[]`                               |
| 16 | Ver invitaciones pendientes                 | Usuario es moderador con permiso                            | `GET /guilds/:id/invites`                                                        | Devuelve lista `invites[]`                               |

✅ Este sistema garantiza un control seguro, auditado y flexible de la membresía en hermandades, con soporte para múltiples flujos de entrada y jerarquía de permisos.

---




© 2025 – Larping & Go. Todos los derechos reservados.
