# 📢 Documentación de Tablón de Anuncios y Encuestas (Guild Board)

Este documento detalla el sistema de anuncios internos y encuestas (*polls*) dentro de una hermandad en *Larping & Go*.

---

## 📑 Índice

1. [Modelo de Datos](#1-modelo-de-datos)
2. [API REST](#2-api-rest)
3. [Casos de Uso](#3-casos-de-uso)
4. [Repositorio](#4-repositorio)
5. [Permisos y Reglas](#5-permisos-y-reglas)
6. [Cron: Cierre Automático de Encuestas](#6-cron-cierre-automático-de-encuestas)
7. [WebSockets (futuro)](#7-websockets-futuro)
8. [Migraciones SQL](#8-migraciones-sql)
9. [Casos de Prueba](#9-casos-de-prueba)
10. [Tareas Pendientes](#10-tareas-pendientes)
11. [Plan de Pruebas y Ejemplos](#11-plan-de-pruebas-y-ejemplos)

---

## 1. Modelo de Datos

### 1.1 `guild_announcements`

| Campo                     | Tipo                       | Descripción                                            |
| ------------------------- | -------------------------- | ------------------------------------------------------ |
| id                        | `uuid`                     | Identificador único.                                   |
| guild\_id                 | `uuid` FK                  | Hermandad a la que pertenece.                          |
| author\_user\_id          | `uuid` FK                  | Usuario creador (nullable si se borra la cuenta).      |
| author\_character\_id     | `uuid` FK                  | Personaje activo con el que se publica.                |
| title                     | `varchar(120)`             | Título del anuncio.                                    |
| content                   | `text`                     | Contenido enriquecido / markdown.                      |
| type                      | `ENUM` (`general`, `poll`) | Tipo de publicación.                                   |
| multi\_select             | `boolean`                  | Permite seleccionar varias opciones. Default: false.   |
| max\_choices              | `int` (nullable)           | Límite máximo si multi\_select es true.                |
| close\_at                 | `timestamptz` (nullable)   | Fecha de cierre (solo si `type = poll`).               |
| show\_results             | `boolean`                  | Mostrar resultados durante la votación. Default: true. |
| is\_closed                | `boolean`                  | Marca de encuesta cerrada (por cron). Default: false.  |
| created\_at / updated\_at | `timestamptz`              | Timestamps.                                            |

**Restricciones clave**:

* `type='poll'` requiere `close_at`.
* Si `multi_select = false`, `max_choices = NULL`.
* Si `multi_select = true`, `max_choices >= 2` o `NULL`.

### 1.2 `guild_poll_options`

| Campo                     | Tipo           | Descripción                                  |
| ------------------------- | -------------- | -------------------------------------------- |
| id                        | `uuid`         | Identificador único.                         |
| announcement\_id          | `uuid` FK      | Referencia a la encuesta.                    |
| option\_text              | `varchar(120)` | Texto de la opción.                          |
| position                  | `int`          | Orden de aparición (0, 1, 2…).               |
| votes\_count              | `int`          | Contador denormalizado (trigger o servicio). |
| created\_at / updated\_at | `timestamptz`  | Timestamps.                                  |

### 1.3 `guild_votes`

| Campo            | Tipo                 | Descripción                   |
| ---------------- | -------------------- | ----------------------------- |
| id               | `uuid`               | Identificador único del voto. |
| announcement\_id | `uuid` FK            | Encuesta asociada.            |
| poll\_option\_id | `uuid` FK            | Opción seleccionada.          |
| user\_id         | `uuid` FK            | Usuario votante.              |
| character\_id    | `uuid` FK (nullable) | Personaje usado para votar.   |
| created\_at      | `timestamptz`        | Fecha del voto.               |

**Restricciones y lógica:**

* Índice único `(poll_option_id, user_id)`.
* Validación en servicio:

  * Si `multi_select = false` → solo un voto por anuncio.
  * Si `max_choices` está definido → no superar el límite.

---

## 2. API REST

| Método | Ruta                                    | Guardias                                                    | Descripción                                                                           |
| ------ | --------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| POST   | `/guilds/:id/board`                     | `Jwt`, `GuildMember`, `GuildPermissions(POST_ANNOUNCEMENT)` | Crea anuncio o encuesta.                                                              |
| GET    | `/guilds/:id/board?page=N`              | `Jwt`, `GuildMember`                                        | Devuelve lista paginada (20 por página).                                              |
| GET    | `/guilds/:id/board/:annId`              | `Jwt`, `GuildMember`                                        | Detalle del anuncio. Muestra votos propios o resultados según permisos.               |
| PUT    | `/guilds/:id/board/:annId`              | `Jwt`, `GuildMember`                                        | Edita anuncio (autor o `POST_ANNOUNCEMENT`). Reglas más estrictas en polls con votos. |
| DELETE | `/guilds/:id/board/:annId`              | `Jwt`, `GuildMember`                                        | Elimina el anuncio.                                                                   |
| POST   | `/guilds/:id/board/:annId/votes`        | `Jwt`, `GuildMember`                                        | Emitir voto(s). Validación por reglas internas del anuncio.                           |
| DELETE | `/guilds/:id/board/:annId/votes/:optId` | `Jwt`, `GuildMember`                                        | Elimina el voto emitido por el usuario para una opción específica.                    |
| GET    | `/guilds/:id/board/:annId/results`      | `Jwt`, `GuildMember`                                        | Resultado de la encuesta, si está permitido.                                          |

---

## 3. Casos de Uso

| Use Case                   | Archivo                                           | Resumen                                                         |
| -------------------------- | ------------------------------------------------- | --------------------------------------------------------------- |
| CreateAnnouncementUseCase  | `use-cases/board/create-announcement.use-case.ts` | Crea anuncio o encuesta. En polls, valida opciones y `closeAt`. |
| ListAnnouncementsQuery     | `queries/board/list-announcements.query.ts`       | Paginación real.                                                |
| GetAnnouncementDetailQuery | `queries/board/get-announcement-detail.query.ts`  | Incluye detalles y votos propios.                               |
| UpdateAnnouncementUseCase  | `use-cases/board/update-announcement.use-case.ts` | Solo autor o permiso. Edición limitada si existen votos.        |
| VotePollUseCase            | `use-cases/board/vote.use-case.ts`                | Valida límite, múltiple selección, y cierra según reglas.       |
| GetPollResultsUseCase      | `use-cases/board/get-poll-results.use-case.ts`    | Verifica si el usuario puede ver resultados.                    |
| CloseExpiredPollsJob       | `jobs/close-expired-polls.job.ts`                 | Cierre automático por cron.                                     |

---

## 4. Repositorio

Métodos adicionales:

* `findAnnouncementWithOptions`
* `findExpiredOpenPolls`
* `closePoll`
* `countVotesByOption`
* `deletePollOptions`
* `deleteVotesByAnnouncement`
* `findVotesByUser`

---

## 5. Permisos y Reglas

* Crear/editar/borrar requiere `POST_ANNOUNCEMENT` o ser autor.
* Votar: miembro activo y encuesta abierta.
* Ver resultados:

  * `showResults = true`, o
  * `isClosed = true`, o
  * Usuario con permiso `POST_ANNOUNCEMENT`.
* Conversión `poll → general` solo si no hay votos registrados.

---

## 6. Cron: Cierre Automático de Encuestas

* Corre cada 30 minutos.
* Encuentra polls con `isClosed = false` y `closeAt < now()`.
* Marca `isClosed = true`.
* Puede emitir evento `poll.closed` por WebSocket.

---

## 7. WebSockets (Futuro)

* Canal: `guild:{guildId}`
* Eventos:

  * `announcement.created`
  * `announcement.updated`
  * `announcement.deleted`
  * `poll.voted`
  * `poll.closed`

---

## 8. Migraciones SQL

```sql
ALTER TABLE guild_announcements
ADD COLUMN is_closed boolean NOT NULL DEFAULT false;
CREATE INDEX ix_ga_closed ON guild_announcements (is_closed);
```

---

## 9. Casos de Prueba

| ID   | Escenario                                | Autenticación | Resultado Esperado |
| ---- | ---------------------------------------- | ------------- | ------------------ |
| T‑1  | Crear anuncio general                    | `TK_MOD`      | 201 Created        |
| T‑2  | Crear sin permiso                        | `TK_MEMBER`   | 403 Forbidden      |
| T‑3  | Crear encuesta sin closeAt               | `TK_MOD`      | 400 Bad Request    |
| T‑4  | Editar como autor                        | `TK_MEMBER`   | 200 OK             |
| T‑5  | Modificar opciones con votos             | `TK_MOD`      | 400 Bad Request    |
| T‑6  | Convertir tipo con errores               | `TK_MOD`      | 400 Bad Request    |
| T‑7  | Votar normalmente                        | `TK_MEMBER`   | 201 Created        |
| T‑8  | Duplicar voto                            | `TK_MEMBER`   | 409 Conflict       |
| T‑9  | Votar encuesta cerrada                   | `TK_MEMBER`   | 400 Bad Request    |
| T‑10 | Resultados ocultos con showResults=false | `TK_MEMBER`   | 403 Forbidden      |
| T‑11 | Resultados tras cierre                   | `TK_MEMBER`   | 200 OK con votos   |
| T‑12 | Paginación segunda página                | `TK_MEMBER`   | 200 OK             |
| T‑13 | Eliminar voto propio                     | `TK_MEMBER`   | 200 OK             |

---

## 10. Tareas Pendientes

* Gateway en tiempo real.
* Notificaciones al cerrar encuesta.
* `perPage` como parámetro en paginación.

---

## 11. Plan de Pruebas y Ejemplos

### 11.1 Postman: Edición de anuncio

```http
PUT /guilds/{{guildId}}/board/{{annId}}
Authorization: Bearer {{TK_MOD}}
Content-Type: application/json

{
  "title": "Reunión actualizada",
  "content": "Nueva fecha: miércoles 20 h"
}
```

### 11.2 Cron manual

prueba realizada para comprobar funcionamiento

1. Crear encuesta con `closeAt = now() + 1min`.
2. Forzar job o esperar ejecución.
3. Comprobar resultado visible aun con `showResults = false`.


---

© 2025 – Larping & Go. Todos los derechos reservados.
