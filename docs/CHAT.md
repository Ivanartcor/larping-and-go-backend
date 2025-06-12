# 💬 Documentación del Módulo de Chat

El módulo de **Chat** permite la comunicación en tiempo real entre usuarios en Larping & Go. Implementa mensajería instantánea basada en WebSockets, con canales privados y grupales, sistema de lectura, edición y borrado de mensajes, así como control de presencia y notificaciones en tiempo real.

---

## 📑 Índice

1. [Arquitectura General](#1-arquitectura-general)
2. [Entidades y Relación de Datos](#2-entidades-y-relación-de-datos)
3. [Pasos del Flujo de Comunicación](#3-pasos-del-flujo-de-comunicación)
4. [Lógica de negocio](#4-lógica-de-negocio)
5. [Casos de uso principales](#5-casos-de-uso-principales)
6. [Endpoints REST clave](#6-endpoints-rest-clave)
7. [WebSocket API ( **/chat** namespace)](#7-websocket-api-chat-namespace)
8. [Seguridad, Rate‑limit y Guards](#8-seguridad-rate‑limit-y-guards)
9. [Cron y Mantenimiento](#9-cron-y-mantenimiento)
10. [Flujos de Funcionalidad (Resumen)](#10-flujos-de-funcionalidad-resumen)
11. [Lógica de Negocio del Sistema de Chat](#11-lógica-de-negocio-del-sistema-de-chat)
12. [Reglas de negocio](#12-reglas-de-negocio)
13. [Pruebas REST](#13-pruebas-rest)
14. [Pruebas WebSocket](#14-pruebas-websocket)
15. [Funcionalidades previstas](#15-funcionalidades-previstas)



---

## 1. Arquitectura General

El módulo de chat está diseñado bajo arquitectura DDD y soporta comunicación en tiempo real mediante `socket.io` con `namespace /chat`. Integra los eventos del cliente con lógica de negocio dentro del gateway `ChatGateway`, y persiste los datos mediante repositorios asociados a las entidades `Message`, `Channel`, `Participant`, `Read`, `Attachment` y (próximamente) `Reaction`.



```
chat
│   chat.module.ts
│
├── application
│   │   chat.service.ts
│   │   presence.service.ts
│   │
│   ├── jobs
│   │       prune-attachments.job.ts
│   │
│   ├── ports
│   │       i-chat.repository.ts
│   │
│   ├── queries
│   │       count-unread.query.ts
│   │       is-moderator.query.ts
│   │       list-messages.query.ts
│   │       list-participants.query.ts
│   │       list-user-channels.query.ts
│   │       unread-summary.query.ts
│   │
│   ├── use-cases
│   │       count-unread.use-case.ts
│   │       create-guild-sub-channel.use-case.ts
│   │       delete-message.use-case.ts
│   │       join-channel.use-case.ts
│   │       join-guild-channel.use-case.ts
│   │       leave-channel.use-case.ts
│   │       mark-read.use-case.ts
│   │       open-direct-channel.use-case.ts
│   │       send-media-message.use-case.ts
│   │       send-message.use-case.ts
│   │       update-message.use-case.ts
│   │       upload-attachment.use-case.ts
│   │
│   └── ws
│           chat.events.ts
│
├── domain
│   ├── dto
│   │       attachment.dto.ts
│   │       channel-summary.dto.ts
│   │       create-sub-channel.dto.ts
│   │       mark-read.dto.ts
│   │       pagination.dto.ts
│   │       room.dto.ts
│   │       send-media.dto.ts
│   │       send-message.dto.ts
│   │       unread-summary.dto.ts
│   │       update-message.dto.ts
│   │       upload-attachment.dto.ts
│   │
│   └── entities
│           chat-attachment.entity.ts
│           chat-channel.entity.ts
│           chat-message-read.entity.ts
│           chat-message.entity.ts
│           chat-participant.entity.ts
│
└── infrastructure
    ├── controllers
    │       chat.controller.ts
    │
    ├── gateways
    │       chat.gateway.ts
    │
    ├── guards
    │       chat-participant.guard.ts
    │       jwt-ws.guard.ts
    │       ws-throttle.guard.ts
    │
    └── repositories
            chat.repository.ts
```

---


## 2. Entidades y Relación de Datos

### 2.1 Estructura General

* **chat\_channels**: Define cada canal. Dos tipos: `direct` (entre dos usuarios) y `guild` (chat grupal de hermandad). También admite subcanales mediante `parent_channel_id`. Incluye atributos como `auto_sync`, `is_archived` y `last_message_at`.
* **chat\_participants**: Usuarios enrolados en un canal, con máscara de personaje, rol y estado de conexión (`active` / `left`).
* **chat\_messages**: Mensajes enviados dentro de un canal. Soporta texto, adjuntos, y sistema. Pueden tener respuestas (`reply_to_id`) y estado de edición o eliminación.
* **chat\_attachments**: Archivos vinculados a un mensaje, con metadatos como MIME, dimensiones, nombre y tamaño.
* **chat\_message\_reads**: Marca de lectura por usuario con timestamp.
* **chat\_reactions** *(futuro)*: Reacciones emoji a un mensaje.

### 2.2 Relaciones Clave

```
chat_channels       1─N  chat_participants   N─1  users
chat_channels       1─N  chat_messages       N─1  users
chat_messages       1─N  chat_attachments
chat_messages       1─N  chat_message_reads  N─1  users
```

### 2.3 Permisos y Jerarquía

* Un **participante activo** puede enviar y leer mensajes.
* Un **moderador** (campo `role` en `chat_participants`) puede editar/borrar mensajes ajenos y gestionar expulsiones.
* En canales `guild`, los usuarios con bit `MANAGE_MEMBERS` se consideran moderadores implícitos.

---

### 2.4 Descripción de Tablas

#### 📁 Tabla `chat_channels`

| Columna             | Tipo                 | Detalles                                             |
| ------------------- | -------------------- | ---------------------------------------------------- |
| id                  | uuid PK              | `gen_random_uuid()`                                  |
| type                | `channel_type` ENUM  | `'direct'` o `'guild'`                               |
| guild\_id           | uuid FK → guilds.id  | Solo si `type='guild'`                               |
| direct\_hash        | varchar(64)          | SHA‑256(`<userA>:<userB>`). Único si `type='direct'` |
| parent\_channel\_id | uuid NULLABLE        | Subcanales opcionales                                |
| topic               | varchar(120)         | Título opcional en canales de guild                  |
| auto\_sync          | boolean DEFAULT true | Sincronizar automáticamente miembros de guild        |
| last\_message\_at   | timestamptz          | Se actualiza con cada nuevo mensaje                  |
| is\_archived        | boolean              | Permite ocultar sin eliminar                         |

**Índices:** `ux_cc_direct_hash`, `ix_cc_guild`, `ix_cc_lastmsg`

**Check:**

```
(type='guild' AND guild_id IS NOT NULL AND direct_hash IS NULL)
OR
(type='direct' AND guild_id IS NULL AND direct_hash IS NOT NULL)
```

Notas:

* Cada par de usuarios tiene un único canal directo.
* Al crear una guild, se genera automáticamente su canal.

---

#### 👥 Tabla `chat_participants`

| Columna       | Tipo                        | Detalles                      |
| ------------- | --------------------------- | ----------------------------- |
| id            | uuid PK                     |                               |
| channel\_id   | uuid FK → chat\_channels.id |                               |
| user\_id      | uuid FK → users.id          |                               |
| character\_id | uuid FK → characters.id     | Personaje usado como máscara  |
| role          | `participant_role` ENUM     | `member` / `moderator`        |
| status        | `participant_status` ENUM   | `active` / `left`             |
| joined\_at    | timestamptz                 | `DEFAULT now()`               |
| left\_at      | timestamptz                 | NULL salvo si `status='left'` |

**Índice único:** `(channel_id, user_id)`

Notas:

* Cambio de personaje activo no afecta `character_id` guardado.
* En canales `guild`, se sincroniza con membresía activa.

---

#### 💬 Tabla `chat_messages`

| Columna               | Tipo                        | Detalles                            |
| --------------------- | --------------------------- | ----------------------------------- |
| id                    | uuid PK                     | Identificador único                 |
| channel\_id           | uuid FK → chat\_channels.id | Canal al que pertenece              |
| sender\_user\_id      | uuid FK → users.id          | NULL si `type='system'`             |
| sender\_character\_id | uuid FK → characters.id     | Máscara pública al momento de envío |
| type                  | `message_type` ENUM         | `text`, `media` o `system`          |
| content               | text                        | Texto o payload                     |
| reply\_to\_id         | uuid FK → chat\_messages.id | Para hilos simples o citas          |
| sent\_at              | timestamptz DEFAULT now()   | Fecha de envío                      |
| edited\_at            | timestamptz NULL            | Fecha de última edición             |
| is\_deleted           | boolean DEFAULT false       | Soft-delete: conserva el orden      |
| created\_at           | timestamptz                 |                                     |
| updated\_at           | timestamptz                 |                                     |

**Índices:** `ix_cm_channel_sent`, `gin_cm_content`

**Checks:**

* Mensajes `system` no pueden tener `sender_user_id`.

Lógica:

* Al enviar mensaje: validar participante activo, insertar mensaje, actualizar `last_message_at`.
* Edición válida solo por autor o moderador.
* Borrado lógico (soft-delete).
* Soporte para búsqueda full-text.

---

#### 📎 Tabla `chat_attachments`

| Columna       | Tipo                        | Detalles                                   |
| ------------- | --------------------------- | ------------------------------------------ |
| id            | uuid PK                     |                                            |
| message\_id   | uuid FK → chat\_messages.id | Borrado en cascada                         |
| file\_url     | text                        | URL al Storage                             |
| file\_name    | varchar(140)                | Nombre para descarga                       |
| content\_type | varchar(100)                | MIME type (`image/png`, `application/pdf`) |
| size\_bytes   | bigint                      | Tamaño                                     |
| width\_px     | int NULL                    | Solo para imágenes / vídeos                |
| height\_px    | int NULL                    | Solo para imágenes / vídeos                |
| created\_at   | timestamptz                 |                                            |

**Índices:** `ix_ca_message`, `ix_ca_mime`

Notas:

* Se sube al Storage antes de registrar.
* Política de MIME y tamaño fuera de BD.
* Cron elimina adjuntos huérfanos si el mensaje es borrado.

---

#### ✅ Tabla `chat_message_reads`

| Columna     | Tipo                        | Detalles         |
| ----------- | --------------------------- | ---------------- |
| message\_id | uuid FK → chat\_messages.id | Parte de la PK   |
| user\_id    | uuid FK → users.id          | Parte de la PK   |
| read\_at    | timestamptz DEFAULT now()   | Fecha de lectura |

**Índices:** `ix_cmr_user`, `ix_cmr_message`

Notas:

* Cada lectura se registra con ON CONFLICT DO NOTHING.
* Se puede calcular mensajes no leídos por diferencia.
* WS emite `read:ack` para actualizar UI.

---


## 3. Pasos del Flujo de Comunicación

1. Cliente se conecta al namespace `/chat` con JWT válido.
2. Emite `channel:join` para suscribirse a un canal.
3. Escucha y emite eventos como `message:send`, `message:read`, `typing:start`.
4. Servidor responde con eventos de confirmación (`:ack`) y propagación (`:new`, `:edited`, etc.).
5. Al desconectarse o salir de un canal, emite `channel:leave`.

## 4. Lógica de Negocio

### 4.1 Envío de mensaje

1. Verificar participación activa.
2. Validar ventana anti‑spam (20 mensajes en 10 segundos).
3. Insertar mensaje (+ adjuntos) → trigger actualiza `last_message_at`.
4. Emitir evento WebSocket `message:new` y actualizar contadores de no leídos.

### 4.2 Lecturas

* El evento `message:read` marca la fila en `chat_message_reads`, genera `message:read:ack` y pone contador a 0.

### 4.3 Edición y borrado

* El **autor** puede editar/borrar dentro de los primeros 120 segundos.
* Un **moderador** puede hacerlo en cualquier momento.
* El borrado es lógico (`is_deleted = true`).

### 4.4 Subcanales de guild

* `auto_sync=true` (por defecto) → nuevos miembros se añaden automáticamente; expulsados se eliminan.
* Límite de 30 subcanales por guild.

### 4.5 Presencia y escritura (typing)

* El servicio en memoria rastrea sockets ⇄ usuarios.
* Se emiten eventos `presence:online/offline`, `typing:start/stop` (con timeout de 4 segundos).

### 4.6 Rate-limit

* REST: 50 peticiones por minuto (vía `@nestjs/throttler`).
* WS: 20 eventos cada 10 segundos por canal y usuario; exceso → `error:rate`.
* El use-case de envío replica esta verificación.

### 4.7 Cron Jobs

| JobFrecuenciaAcción      |           |                                                                   |
| ------------------------ | --------- | ----------------------------------------------------------------- |
| `prune-chat-attachments` | Cada hora | Borra adjuntos sin mensaje asociado (creados hace más de 1 hora). |


---


## 5. Casos de uso principales

| Use‑case                                  | Entrada                          | Actores         | Descripción resumida                                                     |
| ----------------------------------------- | -------------------------------- | --------------- | ------------------------------------------------------------------------ |
| **ListUserChannelsQuery**                 | `userId,page,perPage`            | Usuario auth    | Devuelve resúmenes + contadores *unread* con paginación.                 |
| **ListMessagesQuery**                     | `channelId,userId,limit,before?` | Participante    | Historial hacia atrás (lazy‑scroll).                                     |
| **SendMessageUseCase**                    | `channelId,userId,charId?,dto`   | Participante    | Valida anti‑spam, adjuntos, crea mensaje y emite `message:new`.          |
| **UploadAttachmentUseCase**               | `userId,file`                    | Usuario         | Sube binario, guarda `chat_attachments`, devuelve `fileId`.              |
| **MarkReadUseCase**                       | `messageId,userId`               | Participante    | Inserta en `chat_message_reads` (ON CONFLICT DO NOTHING).                |
| **UpdateMessageUseCase**                  | `messageId,userId,dto,isMod`     | Autor/Moderador | Edita dentro de ventana (120 s) o sin límite si moderador.               |
| **DeleteMessageUseCase**                  | idem                             | Autor/Moderador | Marca `is_deleted=true`, vacía `content` y emite `message:deleted`.      |
| **JoinChannelUseCase**                    | `channelId,userId,charId`        | Usuario         | (Re)activa `chat_participants`, socket join y emite presencia ONLINE.    |
| **LeaveChannelUseCase**                   | `channelId,userId`               | Usuario         | Marca `LEFT`, socket leave y emite presencia OFFLINE.                    |
| **CountUnreadQuery / UnreadSummaryQuery** | `channelId,userId` / `userId`    | Cliente         | Devuelve contadores no leídos por canal o global.                        |
| **CreateGuildSubChannelUseCase**          | `topic,autoSync,guildId,userId`  | Líder / Mod     | Crea sub‑canal; clona participantes si `autoSync`.                       |
| **IsModeratorQuery**                      | `messageId,userId`               | Sistema         | Determina si el usuario puede moderar (rol `moderator` o permiso guild). |
| **PruneAttachmentsJob**                   | — (cron)                         | Sistema         | Elimina adjuntos huérfanos (>1 h) y borra archivo físico.                |

---


## 6. Endpoints REST clave

| Método & Path                            | Descripción                          |
| ---------------------------------------- | ------------------------------------ |
| **GET /chat/channels**                   | Lista canales + `unread` (paginado). |
| **GET /chat/channels/\:id/messages**     | Historial (lazy scroll).             |
| **POST /chat/channels/\:id/messages**    | Envía mensaje TEXT/MEDIA.            |
| **POST /chat/attachments**               | Sube archivo, devuelve `fileId`.     |
| **PATCH /chat/messages/\:id**            | Edita (autor ≤120 s o moderator).    |
| **DELETE /chat/messages/\:id**           | Soft-delete.                         |
| **GET /chat/channels/\:id/unread**       | Contador no leídos.                  |
| **GET /chat/unread-summary**             | Array `{channelId, unread}`.         |
| **GET /chat/channels/\:id/participants** | Lista activos.                       |
| **POST /guilds/\:gid/chat-channels**     | Crea sub‑canal `{topic,autoSync}`.   |

---


## 7. WebSocket API (`/chat` namespace)

| Evento cliente → servidor         | Payload                    | Respuesta / Broadcast                                                   |
| --------------------------------- | -------------------------- | ----------------------------------------------------------------------- |
| `channels:list`                   | `{page,perPage}`           | `channels:list` array summaries                                         |
| `channel:join` / `channel:leave`  | `{channelId}`              | `channel:join:ack` · broadcast `channel:joined/left` + presence updates |
| `messages:list`                   | `{channelId,limit,before}` | List of messages                                                        |
| `message:send`                    | `{channelId,…dto}`         | Broadcast `message:new` + badge updates                                 |
| `message:edit` / `message:delete` | `ids`                      | Broadcast `message:edited/deleted`                                      |
| `message:read`                    | `{messageId,channelId}`    | `message:read:ack` & badge 0                                            |
| `typing:start` / `typing:stop`    | `{channelId}`              | Broadcast typing events                                                 |
| `presence:online/offline`         | auto                       | –                                                                       |

---

## 8. Seguridad, Rate‑limit y Guards

* `JwtAuthGuard` (REST) · `JwtWsGuard` (WS)
* `WsThrottleGuard` (por socket)
* `ChatParticipantGuard` protege REST de mensajes/lecturas
* Límite REST: 50 req/min (`@nestjs/throttler`)
* Límite WS: 20 eventos/10 s por canal/usuario

---

## 9. Cron y Mantenimiento

* `ExpireInvitesJob` (Guilds): afecta auto‑sync sub‑canales
* `PruneAttachmentsJob`: limpia adjuntos huérfanos

---

## 10. Flujos de Funcionalidad (Resumen)

1. **Directo**: `getOrCreateDirectChannel` garantiza 1 canal/user-pair
2. **Guild**: canal default creado por trigger, sub‑canales vía endpoint
3. Adjuntos: subir (`fileId`) → incluir en mensaje
4. Presencia actualiza listas online y typing

---

## 11. Lógica de Negocio del Sistema de Chat

### 11.1. Envío de mensajes

1. Verificar participación activa
2. Validar ventana anti‑spam (20 msg / 10 s)
3. Insertar mensaje (+ adjuntos) → trigger actualiza `last_message_at`
4. Broadcast WS `message:new`; actualizar contadores *unread*

### 11.2. Lecturas

* `message:read` marca fila en `chat_message_reads` y genera `message:read:ack`

### 11.3. Edición y borrado

* Autor puede editar/borrar en ≤120 s
* Moderator puede siempre
* Soft-delete (`is_deleted = true`)

### 11.4. Sub‑canales de guild

* `autoSync=true` → nuevos miembros se añaden; expulsados se quitan
* Límite: 30 sub‑canales por guild

### 11.5. Presencia & Typing

* Servicio in-memory registra sockets ⇄ users
* Eventos WS: `presence:online/offline`, `typing:start/stop` (timeout 4 s)

### 11.6. Cron Jobs

| Job                      | Frecuencia | Acción                                                             |
| ------------------------ | ---------- | ------------------------------------------------------------------ |
| `prune-chat-attachments` | Cada hora  | Borra adjuntos sin mensaje (>1 h) y archivos físicos en el storage |

---



---

## 12. Reglas de negocio

* Solo miembros de un canal pueden unirse o enviar mensajes.
* Solo el autor (o moderador) puede editar o borrar mensajes.
* No se puede leer un mensaje sin estar unido al canal.
* Los adjuntos se suben antes de registrar el mensaje.
* Los mensajes system no deben tener `sender_user_id`.

## 13. Pruebas REST

A continuación se documentan los ensayos mínimos recomendados para validar la primera versión del microdominio Chat. Cada test contiene **petición**, **respuesta esperada** y **notas**.

| #  | Endpoint                                        | Caso                          | Request (cURL)                                                                 | Respuesta esperada (HTTP / JSON)                  | Notas                                     |
| -- | ----------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------- | ----------------------------------------- |
| 1  | **POST** `/chat/direct/{targetUserId}`          | Crear / recuperar canal 1‑a‑1 | `curl -X POST -H "Authorization: Bearer <JWT>" https://api/chat/direct/USER_B` | **201** `{ id, type:"direct", participants:[…] }` | Reenvía canal existente o crea nuevo.     |
| 2  | **POST** `/chat/channels/{id}/messages`         | Enviar texto OK               | Body `{ "content":"Hola", "type":"text" }`                                     | **201** `{ id, content:"Hola" }`                  | Trigger actualiza `lastMessageAt`.        |
| 3  | idem                                            | Error: mensaje vacío          | Body `{ "content":"" }`                                                        | **400** `"El mensaje está vacío"`                 | Sin texto ni adjuntos.                    |
| 4  | **GET** `/chat/channels/{id}/messages?limit=30` | Historial lazy-scroll         |                                                                                | **200** `[ {id,sentAt,…}, … ]`                    | Orden ascendente (antiguo → nuevo).       |
| 5  | **PATCH** `/chat/messages/{id}`                 | Editar dentro de ventana      | Body `{ "content":"edit" }`                                                    | **200** `{ editedAt != null }`                    | ≤ 120 s & autor.                          |
| 6  | idem                                            | Editar fuera de ventana       | > 120 s                                                                        | **403**                                           | Falla por tiempo.                         |
| 7  | **DELETE** `/chat/messages/{id}`                | Borrar moderador              | Header JWT con rol moderator                                                   | **200** `{id}`                                    | `is_deleted=true`.                        |
| 8  | **POST** `/chat/attachments`                    | Subir archivo PNG             | multipart `file=@img.png`                                                      | **201** `{ fileId, fileUrl }`                     | Máx 10 MB, PNG/JPEG/PDF.                  |
| 9  | **GET** `/chat/channels/{id}/unread`            | Contador no leídos            |                                                                                | **200** `{ unread: <int> }`                       | Tras `message:read` debe ser 0.           |
| 10 | **POST** `/guilds/{gid}/chat-channels`          | Crear subcanal OK             | Body `{ "topic":"Clan A", "autoSync":true }`                                   | **201** `{ id, topic }`                           | Requiere permiso `CREATE_EVENTS` o líder. |

---

## 14. Pruebas WebSocket

Todos los ejemplos usan Socket.IO (JSON). El token JWT se pasa en `auth.token` durante la conexión o en el header (Authentication: Bearer jwt).

### 14.1. Conexión y presencia

| Paso | Emisor → Servidor            | Respuesta / Broadcast                  | Comprobaciones                               |
| ---- | ---------------------------- | -------------------------------------- | -------------------------------------------- |
| 1    | `io("/chat",{auth:{token}})` | `connected`                            | Socket autorizado.                           |
| 2    | `channel:join` `{channelId}` | `channel:join:ack` + `presence:online` | Usuario se une a la sala & presencia global. |
| 3    | Desconectar socket           | `presence:offline` broadcast           | Sólo si es el último socket del usuario.     |

### 14.2. Mensajes

| # | Evento cliente | Payload                                                      | Respuesta esperada                               | Notas                                           |
| - | -------------- | ------------------------------------------------------------ | ------------------------------------------------ | ----------------------------------------------- |
| 1 | `message:send` | `{channelId, type:"text", content:"Ping"}`                   | Broadcast `message:new` con objeto mensaje       | `senderCharacterId` propagado.                  |
| 2 | idem (adjunto) | `{channelId,type:"media",content:"",attachments:[{fileId}]}` | `message:new` con `attachments`                  | El adjunto debe existir y sin mensaje previo.   |
| 3 | `message:read` | `{channelId,messageId}`                                      | `message:read:ack` + `channel:update` unread = 0 | Otros participantes reciben `message:read:ack`. |

### 14.3. Indicadores de escritura (Typing)

| Evento         | Payload       | Broadcast                              |
| -------------- | ------------- | -------------------------------------- |
| `typing:start` | `{channelId}` | `typing:start` a sala (excluye emisor) |
| `typing:stop`  | idem          | `typing:stop`                          |

### 14.4. Moderación

| Caso                  | Evento           | Resultado                                 |
| --------------------- | ---------------- | ----------------------------------------- |
| Autor edita ≤ 120 s   | `message:edit`   | Broadcast `message:edited` con `editedAt` |
| Moderator borra       | `message:delete` | Broadcast `message:deleted`               |
| Usuario no autorizado | idem             | `error` `code:403`                        |

---


## 15. Funcionalidades previstas

* **Mensajes fijados**: Permitir que moderadores o usuarios destacados fijen mensajes importantes en un canal.
* **Reacciones emoji a mensajes** (`chat_reactions`): Reacciones rápidas con emojis a los mensajes enviados.
* **Notificaciones push**: Envío de notificaciones por email o WebPush al ser mencionado mediante `@username`.
* **Comandos slash**: Soporte para comandos especiales como `/roll`, `/spoiler`, etc., que ejecuten funciones adicionales dentro del canal.
* **Moderación avanzada**:

  * Silenciar temporal o permanentemente a participantes conflictivos.
  * Bloqueo o expulsión de usuarios por parte de moderadores.

### 15.1. Mejoras técnicas previstas

* **Mejoras en la búsqueda full-text**: Optimizar y ampliar las consultas mediante `to_tsvector` y `plainto_tsquery`, incluyendo filtros por fecha, usuario, tipo de mensaje, etc.
* **Archivado y limpieza automática de canales**: Soporte para `archive/unarchive` de canales y eliminación automática de participantes inactivos tras cierto tiempo.
* **Persistencia distribuida para presencia y rate-limit**: Uso de Redis como almacenamiento compartido para:

  * Estado de presencia en tiempo real (sockets por usuario).
  * Lógica de `throttle` y control de eventos WebSocket en despliegues multi‑nodo.

### 15.2. Mejoras de experiencia en la interfaz

* **Carga diferida del árbol de sub‑canales**: `lazy‑loading` de canales anidados para mejorar rendimiento en grandes hermandades.
* **Avisos de menciones por WebSocket**: Envío de eventos WS automáticos cuando se detecta una mención directa en un mensaje.

---

Fase actual cerrada. El sistema cubre mensajería 1:1 y grupal (guild), y queda preparado para futuras ampliaciones como reacciones, moderación y menciones.



