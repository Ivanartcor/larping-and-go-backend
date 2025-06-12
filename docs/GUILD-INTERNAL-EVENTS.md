# 📅 Documentación de Eventos Internos de Hermandad (Guild Internal Events)

Este documento detalla el funcionamiento del sistema de eventos internos dentro de una hermandad en *Larping & Go*, como entrenamientos, reuniones y demás actividades gestionadas por miembros con privilegios.

---

### 📑 Índice

1. [Modelo de Datos](#1-modelo-de-datos)
2. [Permisos](#2-permisos)
3. [Casos de Uso](#3-casos-de-uso)
4. [API REST](#4-api-rest)
5. [Flujos Principales](#5-flujos-principales)
6. [Ejemplos API](#6-ejemplos-api)
7. [Errores Comunes](#7-errores-comunes)
8. [Próximos Pasos](#8-próximos-pasos)

---

## 1. Modelo de Datos

### 1.1 `guild_internal_events`

| Columna                | Tipo                        | Detalles                                      |
| ---------------------- | --------------------------- | --------------------------------------------- |
| id                     | uuid PK `gen_random_uuid()` | Identificador único                           |
| guild\_id              | uuid FK → guilds.id         | Hermandad propietaria                         |
| creator\_user\_id      | uuid FK → users.id          | Usuario que crea el evento (NULL si se borra) |
| creator\_character\_id | uuid FK → characters.id     | Máscara del creador (NULL si se borra)        |
| title                  | varchar(120)                | Título visible en listados                    |
| description            | text                        | Texto largo (markdown)                        |
| banner\_url            | text                        | Imagen opcional                               |
| location\_text         | varchar(120)                | Ubicación legible                             |
| latitude / longitude   | numeric(9,6)                | Coordenadas GPS (nullable)                    |
| start\_at              | timestamptz                 | Inicio del evento                             |
| end\_at                | timestamptz                 | Fin (`end_at > start_at`)                     |
| capacity               | int NULL                    | Plazas máximas (NULL = sin límite)            |
| attendee\_count        | int DEFAULT 0               | Contador solo de confirmados                  |
| status                 | event\_status ENUM          | `scheduled`, `cancelled`, `completed`         |
| highlighted            | boolean DEFAULT false       | Marca para "próximo evento"                   |
| created\_at            | timestamptz                 | Creación                                      |
| updated\_at            | timestamptz                 | Última edición                                |

**Índices clave**:

* `(guild_id, start_at DESC)` para próximos/pasados.
* `status` para filtrar por estado.

### 1.2 `guild_event_attendance`

| Columna       | Tipo                                 | Detalles                            |
| ------------- | ------------------------------------ | ----------------------------------- |
| id            | uuid PK                              | Identificador                       |
| event\_id     | uuid FK → guild\_internal\_events.id | Evento asociado                     |
| user\_id      | uuid FK → users.id                   | Jugador que confirma                |
| character\_id | uuid FK → characters.id              | Personaje activo usado como máscara |
| status        | attendance\_status ENUM              | `confirmed` o `cancelled`           |
| changed\_at   | timestamptz                          | Última vez que cambió el estado     |
| created\_at   | timestamptz                          | Creación del registro               |

**Restricciones**:

* Índice único `(event_id, user_id)` asegura una sola fila por usuario‑evento.
* Solo los registros `status = 'confirmed'` cuentan para `attendee_count` (trigger).
* Antes de confirmar se verifica `capacity`.

---

## 2. Permisos

| Acción                                           | Bit | Rol líder | `CREATE_EVENTS` |
| ------------------------------------------------ | --- | --------- | --------------- |
| Crear / editar / cancelar / completar / destacar | –   | ✔️        | ✔️              |
| Confirmar / cancelar asistencia                  | –   | ✔️        | Miembro         |
| Ver detalles o listado asistencias               | –   | ✔️        | Miembro         |

---

## 3. Casos de Uso

| UC                          | Archivo                                          | Resumen                                              |
| --------------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| `CreateEventUseCase`        | `use-cases/events/create-event.use-case.ts`      | Valida campos obligatorios y fecha futura.           |
| `UpdateEventUseCase`        | `use-cases/events/update-event.use-case.ts`      | Solo autor o moderador puede editar.                 |
| `DeleteEventUseCase`        | `use-cases/events/delete-event.use-case.ts`      | Solo autor o moderador puede eliminar.               |
| `ListEventsQuery`           | `queries/events/list-events.query.ts`            | Devuelve lista filtrada por fecha futura.            |
| `GetEventDetailQuery`       | `queries/events/get-event-detail.query.ts`       | Carga info del evento y asistencia propia si aplica. |
| `SubmitAttendanceUseCase`   | `use-cases/events/submit-attendance.use-case.ts` | Guarda o actualiza asistencia del usuario.           |
| `GetAttendanceSummaryQuery` | `queries/events/get-attendance-summary.query.ts` | Devuelve lista agrupada por estatus.                 |

---

## 4. API REST

| Verbo & Path                                               | Descripción                     | Body / Query             | Permiso                 |
| ---------------------------------------------------------- | ------------------------------- | ------------------------ | ----------------------- |
| `POST  /guilds/:id/events`                                 | Crear evento                    | `CreateInternalEventDto` | `CREATE_EVENTS` o líder |
| `PUT   /guilds/:id/events/:eventId`                        | Editar evento                   | `UpdateInternalEventDto` | idem                    |
| `PATCH /guilds/:id/events/:eventId/status`                 | Cambiar estado                  | `{status}`               | idem                    |
| `PATCH /guilds/:id/events/:eventId/highlight`              | Toggle destacado                | –                        | idem                    |
| `GET   /guilds/:id/events/:eventId`                        | Detalle + preview asistencias   | –                        | miembro                 |
| `GET   /guilds/:id/events/:eventId/attendances?filter=...` | Listado de asistencias          | –                        | miembro                 |
| `POST  /guilds/:id/events/:eventId/attendances`            | Confirmar / cancelar asistencia | `{status}`               | miembro                 |

---

## 5. Flujos Principales

### 5.1 Crear evento

1. Validación de fechas (`end_at > start_at`).
2. `status = scheduled`, `attendee_count = 0`, `highlighted = false`.
3. Devuelve DTO público con ID generado.

### 5.2 Editar evento

*Solo mientras `status = scheduled`.*

* `capacity ≥ attendee_count`
* `end_at > start_at`

### 5.3 Cambiar estado

| De          | A           | Efecto                                                            |
| ----------- | ----------- | ----------------------------------------------------------------- |
| `scheduled` | `cancelled` | Se conserva historial; las confirmaciones siguen pero no cuentan. |
| `scheduled` | `completed` | Marca fin manual sin esperar cron.                                |

### 5.4 Destacar evento

`PATCH /highlight` invierte `highlighted` para resaltar el evento en la UI.

### 5.5 Confirmar / cancelar asistencia

* **Confirmar**: crea fila si no existe o revive si estaba cancelada.
* **Cancelar**: cambia `status` y decrementa contador (trigger).
* Se valida el aforo antes de confirmar.

### 5.6 Detalle del evento

Incluye:

* Datos del evento con `creatorUser` y `creatorCharacter`
* `confirmedPreview`: número total + primeras N confirmaciones

### 5.7 Cron `CompletePastEventsJob`

* Corre cada 15 minutos.
* Cambia a `completed` los eventos `scheduled` cuyo `end_at < now()`.
* También aplica si `start_at < now()` y `end_at` es NULL.

---

## 6. Ejemplos API

### 6.1 Crear evento

```http
POST /guilds/43e1/events
Authorization: Bearer <token-mod>
Content-Type: application/json

{
  "title": "Entrenamiento dominical",
  "description": "Sesión de combate ligero",
  "startAt": "2025-06-15T09:00:00Z",
  "endAt": "2025-06-15T12:00:00Z",
  "capacity": 30
}
```

### 6.2 Editar evento

```http
PUT /guilds/43e1/events/3c0b
{ "capacity": 40 }
```

### 6.3 Cancelar evento

```bash
curl -X PATCH -H "Authorization: Bearer $TK_LEADER" \
     -d '{"status":"cancelled"}' \
     http://localhost:3000/guilds/43e1/events/3c0b/status
```

### 6.4 Confirmar asistencia

```http
POST /guilds/43e1/events/3c0b/attendances
Authorization: Bearer <token-member>
Content-Type: application/json

{ "status": "confirmed" }
```

### 6.5 Ver detalle del evento

```http
GET /guilds/43e1/events/3c0b
```

---

## 7. Errores Comunes

| Código | Motivo                                         |
| ------ | ---------------------------------------------- |
| 403    | Falta bit `CREATE_EVENTS` o no es líder        |
| 400    | Fechas inválidas · `capacity < attendee_count` |
| 409    | Aforo superado al confirmar asistencia         |

---

## 8. Próximos Pasos

* 🔁 Integrar notificaciones WebSocket para cambios de estado o confirmaciones.
* 📆 Permitir recordatorios automáticos antes del evento (cron + WebPush).
* 📝 Añadir feedback o notas post-evento para asistentes confirmados.
* 📊 Incluir exportación de lista de asistentes confirmados.
* 🔍 Añadir filtros avanzados por tipo o ubicación en el listado de eventos.


