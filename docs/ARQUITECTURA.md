# 🧱 Arquitectura y estructura modular del backend de Larping & Go

La arquitectura del backend de **Larping & Go** se basa en los principios de **Domain-Driven Design (DDD)**, **arquitectura hexagonal** y **Clean Architecture**, utilizando **NestJS** como framework principal. Está diseñada para ser mantenible, escalable y adaptable a nuevas funcionalidades.

---
## Índice

* [🧩 Capas fundamentales](#🧩-capas-fundamentales)
* [📁 Archivos raíz](#📁-archivos-raíz)
* [🗂️ Carpetas de nivel superior](#🗂️-carpetas-de-nivel-superior)
* [🧱 Estructura global del backend](#🧱-estructura-global-del-backend)
* [🧬 Estructura interna de un módulo típico](#🧬-estructura-interna-de-un-módulo-típico)
* [📦 Ejemplo completo y comentado: módulo auth](#📦-ejemplo-completo-y-comentado-módulo-auth)
* [🧩 Módulos principales y responsabilidades](#🧩-módulos-principales-y-responsabilidades)
* [📡 Comunicación entre cliente y servidor](#📡-comunicación-entre-cliente-y-servidor)
* [🧬 Persistencia de datos](#🧬-persistencia-de-datos)
* [⚙️ Configuración y validación](#⚙️-configuración-y-validación)
* [✅ Buenas prácticas aplicadas](#✅-buenas-prácticas-aplicadas)
* [🔍 Arquitectura completa](#🔍arquitectura-completa)



## 🧩 Capas fundamentales

Cada módulo sigue una separación clara entre tres capas:

* **application/**: Casos de uso, servicios de orquestación, comandos, consultas, puertos y tareas.
* **domain/**: Entidades, objetos de valor, DTOs e interfaces del dominio.
* **infrastructure/**: Implementaciones técnicas como controladores, repositorios, gateways WebSocket, adaptadores, estrategias y guards.

---

## 📁 Archivos raíz

| Archivo         | Propósito                                                                              |
| --------------- | -------------------------------------------------------------------------------------- |
| `main.ts`       | Punto de entrada de NestJS. Aplica pipes globales y prefija las rutas con `/api/v1`.   |
| `app.module.ts` | Módulo raíz que importa todos los módulos de dominio y configura proveedores globales. |

---

## 🗂️ Carpetas de nivel superior

| Carpeta     | Contenido                                                        | Notas                                       |
| ----------- | ---------------------------------------------------------------- | ------------------------------------------- |
| `config/`   | Configuración centralizada (`ConfigModule`) y validación Joi.    | Separada del código de dominio.             |
| `database/` | Módulo de base de datos, fuente de datos y migraciones/seeds.    | Sin lógica de negocio.                      |
| `shared/`   | Utilidades transversales (logger, paginación, guards genéricos). | No contiene entidades ni lógica de dominio. |
| `modules/`  | Cada carpeta representa un bounded context del sistema.          | Implementa DDD liviano.                     |

---

## 🧱 Estructura global del backend

```
├── app.module.ts
├── main.ts
├── config/
│   ├── configuration.ts
│   ├── default-character-properties.ts
│   └── validation.schema.ts
├── database/
│   ├── database.module.ts
│   ├── data-source.ts
│   └── migrations/
├── modules/
│   ├── auth/
│   ├── characters/
│   ├── chat/
│   ├── guilds/
│   ├── users/
│   ├── events/
│   ├── posts/
│   ├── follows/, notifications/, moderation/, search/, storage/
├── shared/
```

---

## 🧬 Estructura interna de un módulo típico

```
modules/<nombre>/
├── application/     # Casos de uso, servicios de orquestación, validaciones complejas
├── domain/          # Entidades, value-objects, DTOs, interfaces
├── infrastructure/  # Adaptadores (repositorios, controladores, gateways WS, estrategias)
└── <nombre>.module.ts
```

**Convenciones aplicadas:**

* Entidades y DTOs viven en `domain/` para mantener cohesión.
* Repositorios se ubican en `infrastructure/`, implementando interfaces del dominio.
* `application/` exporta únicamente lo necesario para mantener la encapsulación.

---

## 📦 Ejemplo completo y comentado: módulo `auth`

```
modules/auth/
├── application/
│   ├── auth.service.ts                         # Servicio de orquestación principal
│   ├── use-cases/
│   │   ├── login-user.use-case.ts              # Lógica para login
│   │   ├── register-user.use-case.ts           # Lógica para registro
│   │   ├── request-reset-password.use-case.ts  # Solicitud de reseteo de contraseña
│   │   └── confirm-reset-password.use-case.ts  # Confirmación del reseteo
│   ├── commands/                               # Comandos para controladores
│   ├── ports/
│   │   ├── i-hasher.port.ts                    # Interfaz de encriptación
│   │   ├── i-jwt.port.ts                       # Interfaz para tokens JWT
│   │   ├── i-mailer.port.ts                    # Interfaz de envío de correos
│   │   └── i-user-auth.repository.ts           # Repositorio abstracto de usuarios
├── domain/
│   ├── dto/
│   │   ├── login.dto.ts
│   │   ├── register.dto.ts
│   │   └── password-request.dto.ts
│   ├── entities/
│   │   └── password-reset-token.entity.ts
│   └── value-objects/
│       ├── email.vo.ts
│       ├── password.vo.ts
│       └── jwt-token.vo.ts
├── infrastructure/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── password-reset.controller.ts
│   ├── adapters/
│   │   ├── bcrypt.adapter.ts
│   │   ├── jwt.adapter.ts
│   │   └── mailer.adapter.ts
│   ├── strategies/
│   │   ├── jwt-access.strategy.ts
│   │   └── jwt-refresh.strategy.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── jwt-refresh.guard.ts
│   └── repositories/
│       ├── user-auth.repository.ts
│       └── password-token.repository.ts
└── auth.module.ts
```

Este módulo refleja claramente la separación entre dominio, lógica de aplicación y detalles técnicos.

---

## 🧩 Módulos principales y responsabilidades

| Módulo                                                | Propósito                                              | Comentarios                   |
| ----------------------------------------------------- | ------------------------------------------------------ | ----------------------------- |
| `auth/`                                               | Autenticación, manejo de JWT y estrategias de acceso.  | Sin Firebase.                 |
| `users/`                                              | Perfiles públicos y privados, personaje activo.        |                               |
| `characters/`                                         | Gestión de personajes y propiedades.                   |                               |
| `guilds/`                                             | Hermandades, roles, anuncios, eventos internos y chat. | Incluye `guilds.gateway.ts`.  |
| `events/`                                             | Eventos globales y por hermandad.                      | Tipo distinguido por flags.   |
| `chat/`                                               | Chat privado y grupal con WebSocket.                   | Gateway en `chat.gateway.ts`. |
| `storage/`                                            | Subida de archivos, firma y eliminación.               |                               |
| `search/`                                             | Indexación y búsqueda de contenido.                    | Preparado para Elastic.       |
| `posts/`, `follows/`, `notifications/`, `moderation/` | Funciones sociales y moderación.                       | En desarrollo progresivo.     |

---

## 📡 Comunicación entre cliente y servidor

* **REST (HTTP)**: Endpoints definidos por módulo en `infrastructure/controllers`.
* **WebSocket (Tiempo real)**: Gateways específicos por dominio en `infrastructure/gateways/` utilizando `Socket.IO`.

> Los gateways están alojados dentro de cada módulo, lo que mejora la encapsulación, facilita las pruebas y promueve cohesión.

---

## 🧬 Persistencia de datos

* **PostgreSQL** como base de datos relacional.
* **TypeORM** para el mapeo objeto-relacional.
* Las migraciones están en `database/migrations/` y se organizan por versión temporal.

> No se mezcla lógica de negocio en la capa de base de datos.

---

## ⚙️ Configuración y validación

* Uso de `.env` y `ConfigModule` para centralizar la configuración.
* Validación estricta con `validation.schema.ts`.
* Separación clara entre configuración e implementación.

---

## ✅ Buenas prácticas aplicadas

* Convenciones de nombres: `*.controller.ts`, `*.service.ts`, `*.entity.ts`, etc.
* Versionado de rutas (`/api/v1`).
* Pruebas integradas con Jest y carpetas `__tests__/`.
* Acoplamiento mínimo y orientación a dominio.
* `shared/` limitado a utilidades reutilizables y transversales.

## Arquitectura completa 

*en verdad es mejor verla desde el propio github*

```
C:.
│   app.controller.spec.ts
│   app.controller.ts
│   app.module.ts
│   app.service.ts
│   main.ts
│
├───config
│       configuration.ts
│       default-character-properties.ts
│       validation.schema.ts
│
├───database
│   │   data-source.ts
│   │   database.module.ts
│   │
│   └───migrations
│           1700000000000-ChatExtras.ts
│           1747244225044-InitSchema.ts
│           1747485643259-InitSchema.ts
│           1747783842831-InitSchema.ts
│           1747785809363-InitSchema.ts
│           1748286000000-EventsInit.ts.ts
│           1748500000000-AddVotesTrigger.ts
│           1748897294975-InitSchema.ts
│           1749151013443-InitSchema.ts
│           1749153600000-IndexInviteExpiry.ts
│           1749594332019-InitSchema.ts
│
├───modules
│   ├───auth
│   │   │   auth.module.ts
│   │   │
│   │   ├───application
│   │   │   │   auth.service.ts
│   │   │   │
│   │   │   ├───commands
│   │   │   │       confirm-reset-password.command.ts
│   │   │   │       login.command.ts
│   │   │   │       register.command.ts
│   │   │   │       request-reset-password.command.ts
│   │   │   │
│   │   │   ├───ports
│   │   │   │       i-hasher.port.ts
│   │   │   │       i-jwt.port.ts
│   │   │   │       i-mailer.port.ts
│   │   │   │       i-password-token.repository.ts
│   │   │   │       i-user-auth.repository.ts
│   │   │   │
│   │   │   └───use-cases
│   │   │           confirm-reset-password.use-case.ts
│   │   │           login-user.use-case.ts
│   │   │           register-user.use-case.ts
│   │   │           request-reset-password.use-case.ts
│   │   │
│   │   ├───domain
│   │   │   ├───dto
│   │   │   │       login.dto.ts
│   │   │   │       password-confirm.dto.ts
│   │   │   │       password-request.dto.ts
│   │   │   │       refresh.dto.ts
│   │   │   │       register.dto.ts
│   │   │   │
│   │   │   ├───entities
│   │   │   │       password-reset-token.entity.ts
│   │   │   │
│   │   │   └───value-objects
│   │   │           email.vo.ts
│   │   │           jwt-token.vo.ts
│   │   │           password.vo.ts
│   │   │
│   │   └───infrastructure
│   │       ├───adapters
│   │       │       bcrypt.adapter.ts
│   │       │       jwt.adapter.ts
│   │       │       mailer.adapter.ts
│   │       │
│   │       ├───controllers
│   │       │       auth.controller.ts
│   │       │       password-reset.controller.ts
│   │       │
│   │       ├───guards
│   │       │       jwt-auth.guard.ts
│   │       │       jwt-refresh.guard.ts
│   │       │
│   │       ├───repositories
│   │       │       password-token.repository.ts
│   │       │       user-auth.repository.ts
│   │       │
│   │       └───strategies
│   │               jwt-access.strategy.ts
│   │               jwt-refresh.strategy.ts
│   │
│   ├───characters
│   │   │   characters.module.ts
│   │   │
│   │   ├───application
│   │   │   │   characters.service.ts
│   │   │   │
│   │   │   ├───ports
│   │   │   │       i-character.repository.ts
│   │   │   │       i-default-properties.provider.ts
│   │   │   │
│   │   │   ├───queries
│   │   │   │       get-public-character.query.ts
│   │   │   │
│   │   │   └───use-cases
│   │   │           create-character.use-case.ts
│   │   │           delete-character.use-case.ts
│   │   │           list-character-properties.use-case.ts
│   │   │           list-characters.use-case.ts
│   │   │           remove-property.use-case.ts
│   │   │           update-character.use-case.ts
│   │   │           upload-avatar.use-case.ts
│   │   │           upsert-property.use-case.ts
│   │   │
│   │   ├───domain
│   │   │   ├───dto
│   │   │   │       change-avatar.dto.ts
│   │   │   │       character-property.dto.ts
│   │   │   │       create-character.dto.ts
│   │   │   │       public-character.dto.ts
│   │   │   │       update-character.dto.ts
│   │   │   │       
│   │   │   ├───entities
│   │   │   │       character-property.entity.ts
│   │   │   │       character.entity.ts
│   │   │   │
│   │   │   └───value-objects
│   │   │           slug.vo.ts
│   │   │
│   │   └───infrastructure
│   │       ├───controllers
│   │       │       characters.controller.ts
│   │       │
│   │       ├───providers
│   │       │       default-properties.provider.ts
│   │       │
│   │       └───repositories
│   │               character.repository.ts
│   │
│   ├───chat
│   │   │   chat.module.ts
│   │   │
│   │   ├───application
│   │   │   │   chat.service.ts
│   │   │   │   presence.service.ts
│   │   │   │
│   │   │   ├───jobs
│   │   │   │       prune-attachments.job.ts
│   │   │   │
│   │   │   ├───ports
│   │   │   │       i-chat.repository.ts
│   │   │   │
│   │   │   ├───queries
│   │   │   │       count-unread.query.ts
│   │   │   │       is-moderator.query.ts
│   │   │   │       list-messages.query.ts
│   │   │   │       list-participants.query.ts
│   │   │   │       list-user-channels.query.ts
│   │   │   │       unread-summary.query.ts
│   │   │   │
│   │   │   ├───use-cases
│   │   │   │       count-unread.use-case.ts
│   │   │   │       create-guild-sub-channel.use-case.ts
│   │   │   │       delete-message.use-case.ts
│   │   │   │       join-channel.use-case.ts
│   │   │   │       join-guild-channel.use-case.ts
│   │   │   │       leave-channel.use-case.ts
│   │   │   │       mark-read.use-case.ts
│   │   │   │       open-direct-channel.use-case.ts
│   │   │   │       send-media-message.use-case.ts
│   │   │   │       send-message.use-case.ts
│   │   │   │       update-message.use-case.ts
│   │   │   │       upload-attachment.use-case.ts
│   │   │   │
│   │   │   └───ws
│   │   │           chat.events.ts
│   │   │
│   │   ├───domain
│   │   │   ├───dto
│   │   │   │       attachment.dto.ts
│   │   │   │       channel-summary.dto.ts
│   │   │   │       create-sub-channel.dto.ts
│   │   │   │       mark-read.dto.ts
│   │   │   │       pagination.dto.ts
│   │   │   │       room.dto.ts
│   │   │   │       send-media.dto.ts
│   │   │   │       send-message.dto.ts
│   │   │   │       unread-summary.dto.ts
│   │   │   │       update-message.dto.ts
│   │   │   │       upload-attachment.dto.ts
│   │   │   │       
│   │   │   └───entities
│   │   │           chat-attachment.entity.ts
│   │   │           chat-channel.entity.ts
│   │   │           chat-message-read.entity.ts
│   │   │           chat-message.entity.ts
│   │   │           chat-participant.entity.ts
│   │   │
│   │   └───infrastructure
│   │       ├───controllers
│   │       │       chat.controller.ts
│   │       │
│   │       ├───gateways
│   │       │       chat.gateway.ts
│   │       │
│   │       ├───guards
│   │       │       chat-participant.guard.ts
│   │       │       jwt-ws.guard.ts
│   │       │       ws-throttle.guard.ts
│   │       │
│   │       └───repositories
│   │               chat.repository.ts
│   │
│   ├───events
│   │   └───domain
│   │       └───entities
│   │               event-category.entity.ts
│   │               event-media.entity.ts
│   │               global-event-attendance.entity.ts
│   │               global-event.entity.ts
│   │
│   ├───follows
│   ├───guilds
│   │   │   guilds.module.ts
│   │   │
│   │   ├───application
│   │   │   │   guilds.service.ts
│   │   │   │
│   │   │   ├───helpers
│   │   │   │       join-guild-chat.ts
│   │   │   │
│   │   │   ├───jobs
│   │   │   │       close-expired-polls.job.ts
│   │   │   │       complete-past-events.job.ts
│   │   │   │       expire-invites.job.ts
│   │   │   │
│   │   │   ├───ports
│   │   │   │       i-guild.repository.ts
│   │   │   │       i-list-events-filter.repository.ts
│   │   │   │
│   │   │   ├───queries
│   │   │   │       get-announcement-detail.query.ts
│   │   │   │       get-event-detail.query.ts
│   │   │   │       get-guild-internal.query.ts
│   │   │   │       get-guild-public.query.ts
│   │   │   │       list-announcements.query.ts
│   │   │   │       list-attendances.query.ts
│   │   │   │       list-guilds.query.ts
│   │   │   │       list-internal-events.query.ts
│   │   │   │       list-members.query.ts
│   │   │   │       list-pending-invites.query.ts
│   │   │   │       list-roles.query.ts
│   │   │   │
│   │   │   └───use-cases
│   │   │       │   create-guild.use-case.ts
│   │   │       │   delete-guild.use-case.ts
│   │   │       │   transfer-leadership.use-case.ts
│   │   │       │   update-guild.use-case.ts
│   │   │       │
│   │   │       ├───board
│   │   │       │       create-announcement.use-case.ts
│   │   │       │       delete-announcement.use-case.ts
│   │   │       │       get-poll-results.use-case.ts
│   │   │       │       remove-vote.use-case.ts
│   │   │       │       update-announcement.use-case.ts
│   │   │       │       vote-poll.use-case.ts
│   │   │       │
│   │   │       ├───events
│   │   │       │       cancel-attendance.use-case.ts
│   │   │       │       change-event-status.use-case.ts
│   │   │       │       confirm-attendance.use-case.ts
│   │   │       │       create-internal-event.use-case.ts
│   │   │       │       toggle-highlight.use-case.ts
│   │   │       │       update-internal-event.use-case.ts
│   │   │       │
│   │   │       ├───member
│   │   │       │       handle-invite.use-case.ts
│   │   │       │       join-by-code.use-case.ts
│   │   │       │       kick-member.use-case.ts
│   │   │       │       leave-guild.use-case.ts
│   │   │       │       request-join.use-case.ts
│   │   │       │       respond-invite.use-case.ts
│   │   │       │       send-invite.use-case.ts
│   │   │       │
│   │   │       └───role
│   │   │               assign-role.use-case.ts
│   │   │               create-role.use-case.ts
│   │   │               delete-role.use-case.ts
│   │   │               update-role.use-case.ts
│   │   │
│   │   ├───domain
│   │   │   ├───dto
│   │   │   │   │   create-guild.dto.ts
│   │   │   │   │   guild-details.dto.ts
│   │   │   │   │   public-guild.dto.ts
│   │   │   │   │   transfer-leader.dto.ts
│   │   │   │   │   update-guild.dto.ts
│   │   │   │   │
│   │   │   │   ├───announcements
│   │   │   │   │       announcement-detail.dto.ts
│   │   │   │   │       create-announcement.dto.ts
│   │   │   │   │       poll-results.dto.ts
│   │   │   │   │       update-announcement.dto.ts
│   │   │   │   │       vote.dto.ts
│   │   │   │   │
│   │   │   │   ├───events
│   │   │   │   │       attendance.dto.ts
│   │   │   │   │       change-status.dto.ts
│   │   │   │   │       create-internal-event.dto.ts
│   │   │   │   │       event-detail.dto.ts
│   │   │   │   │       update-internal-event.dto.ts
│   │   │   │   │
│   │   │   │   ├───invites
│   │   │   │   │       create-invite.dto.ts
│   │   │   │   │       handle-invite.dto.ts
│   │   │   │   │       kick-member.dto.ts
│   │   │   │   │       public-invite.dto.ts
│   │   │   │   │       request-join.dto.ts
│   │   │   │   │
│   │   │   │   └───role
│   │   │   │           assin-role.ts
│   │   │   │           create-role.ts
│   │   │   │           update-role.ts
│   │   │   │
│   │   │   └───entities
│   │   │           guild-announcement.entity.ts
│   │   │           guild-event-attendance.entity.ts
│   │   │           guild-internal-event.entity.ts
│   │   │           guild-invite.entity.ts
│   │   │           guild-membership.entity.ts
│   │   │           guild-poll-option.entity.ts
│   │   │           guild-role.entity.ts
│   │   │           guild-vote.entity.ts
│   │   │           guild.entity.ts
│   │   │
│   │   └───infrastructure
│   │       ├───controllers
│   │       │       guilds.controller.ts
│   │       │
│   │       ├───decorators
│   │       │       guild-permissions.decorator.ts
│   │       │
│   │       ├───guards
│   │       │       guild-member.guard.ts
│   │       │       guild-permissions.guard.ts
│   │       │
│   │       └───repositories
│   │               guild.repository.ts
│   │
│   ├───moderation
│   ├───notifications
│   ├───posts
│   ├───search
│   │   └───domain
│   │       └───view-entities
│   │               search-index.view.ts
│   │
│   ├───storage
│   └───users
│       │   users.module.ts
│       │
│       ├───application
│       │   │   users.service.ts
│       │   │
│       │   ├───ports
│       │   │       i-storage.port.ts
│       │   │       i-user.repository.ts
│       │   │
│       │   ├───queries
│       │   │       get-public-profile.query.ts
│       │   │
│       │   └───use-cases
│       │           change-active-character.use-case.ts
│       │           update-profile.user-case.ts
│       │
│       ├───domain
│       │   ├───dto
│       │   │       change-active-character.dto.ts
│       │   │       public-user.dto.ts
│       │   │       update-profile.dto.ts
│       │   │
│       │   ├───entities
│       │   │       user.entity.ts
│       │   │
│       │   └───value-objects
│       └───infrastructure
│           ├───adapters
│           │       local-storage.adapter.ts
│           │
│           ├───controllers
│           │       users.controller.ts
│           │
│           └───repositories
│                   user.repository.ts
│
├───shared
│   ├───guard
│   ├───hash
│   │       sha256.ts
│   │
│   ├───logger
│   └───pagination
```

---

Esta arquitectura está pensada para escalar progresivamente, facilitar la colaboración entre equipos y permitir una futura migración hacia microservicios cuando sea necesario.
