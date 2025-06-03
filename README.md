<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).




## ¿Qué contendrá cada carpeta?

### auth/

- Servicios de login, registro, recuperación de contraseñas.

- Guards JWT (JwtAuthGuard, RolesGuard).

- Estrategias Passport (JwtStrategy).

### users/

- Datos de usuario (email, configuración privada).

- Perfil público basado en personaje activo.

- Control de privacidad.

### characters/

- CRUD de personajes.

- Selección de personaje activo.

- Definición de características personalizadas.

### guilds/

- Crear, gestionar hermandades.

- Roles personalizados.

- Aceptar, invitar, expulsar miembros.

- Acceso a info de miembros.

### Submódulos dentro de guilds/:

#### roles/ → Gestión de roles y permisos.

#### announcements/ → Tablón de anuncios y votaciones internas.

### events/
- Eventos internos de hermandades.

- Eventos globales abiertos a toda la comunidad.

### messaging/
- Mensajes privados entre usuarios (chat 1-1).

- Chat grupal de hermandad en tiempo real.

### notifications/ (futuro)
- Notificaciones internas tipo:

- Mensaje nuevo.

- Invitación a hermandad.

- Evento próximo.

### follows/ (futuro)
- Sistema de seguimiento de usuarios.

- Seguimiento del muro público de personajes.

### posts/ (futuro)
- Publicaciones del personaje activo en su muro.

- Menciones, reacciones, compartidos.

### search/
APIs para buscar:

- Usuarios

- Hermandades

- Eventos

- Personajes activos

### uploads/
- APIs para subir imágenes.

- Gestión de avatar de personajes, banners de eventos, etc.

### common/
- Pipes de validación

- Decoradores de roles, usuarios

- Excepciones personalizadas

- Interceptors para respuestas uniformes

### config/
- config.module.ts para cargar .env

- Configs para base de datos, JWT, etc.

### database/
- Entidades TypeORM (user.entity.ts, character.entity.ts, etc.)

- Migraciones (opcional en producción)

### gateway/
- WebSocket Gateway para chats y notificaciones

- Configuración de canales/salas




# estructura v2

modules/ con triple capa (domain / application / infrastructure):
Aplica DDD / Onion sin sobre‑ingeniería: las entidades viven en domain, los casos de uso en application y los adaptadores externos (repos, sockets, providers) en infrastructure.


Entidades dentro del módulo:
Evita imports circulares y mantiene la cohesión del dominio.


Gateways alojados en el módulo correspondiente:
Encapsula la lógica tiempo real allí donde pertenece; facilita tests y reemplazos.


shared/ muy pequeño:
Solo utilidades transversales (paginación, logging); se reduce el acoplamiento.


database/ propio:
Orquesta TypeORM, seeds y migraciones sin mezclar lógica de negocio.



Buenas prácticas incorporadas

Convenciones de nombres: users.controller.ts, create-user.dto.ts, etc., con sufijos coherentes. (arnab-k.medium.com)

Passport + JWT en lugar de Firebase (facilita despliegues locales).

Config modular: ConfigModule.forRoot({ isGlobal:true }) + validación JOI en config/.

CQRS opcional: si en el futuro se requiere alta concurrencia, cada application/ puede adoptar comandos/queries usando @nestjs/cqrs. (docs.nestjs.com)

Tests por dominio: carpeta __tests__/ junto a application/.

Rutas versionadas: prefijo /api/v1 en app.module.ts (preparado para micro‑fronts).

Monorrepo Nx listo para añadir apps/web, apps/mobile y mover shared/ a libs/.


# larping‑and‑go‑backend – Carpeta de proyecto (NestJS)

Este README describe **qué va dentro de cada carpeta** del backend y por qué existe. Úsalo como referencia rápida para nuevos desarrolladores.

```
src/
├── app.module.ts
├── main.ts
├── config/
│   ├── configuration.ts
│   └── validation.schema.ts
├── database/
│   ├── database.module.ts
│   ├── ormconfig.ts
│   └── migrations/
├── shared/
│   ├── pagination/
│   ├── logger/
│   └── guard/
└── modules/
    ├── auth/
    │   ├── application/
    │   ├── domain/
    │   └── infrastructure/
    ├── users/
    ├── characters/
    ├── guilds/
    │   ├── roles/
    │   ├── announcements/
    │   └── guilds.gateway.ts
    ├── events/
    ├── chat/
    │   └── chat.gateway.ts
    ├── storage/
    ├── search/
    ├── posts/
    ├── follows/
    ├── notifications/
    ├── moderation/
    └── gateway/
```

## Archivos raíz

| Archivo | Propósito |
|---------|-----------|
| **`main.ts`** | Punto de arranque de Nest  · Arranca la app, aplica pipes globales y prefijo `/api/v1`. |
| **`app.module.ts`** | Módulo raíz—importa todos los módulos de dominios y configura proveedores globales. |

---

## Carpetas de nivel superior

| Carpeta | Contenido | Notas |
|---------|-----------|-------|
| **`config/`** | Carga de variables con `ConfigModule` y validación Joi (`validation.schema.ts`). | Separamos la configuración del código de dominio. |
| **`database/`** | `database.module.ts` (provee `DataSource`), `ormconfig.ts` (TypeORM) y **migraciones/seeds**. | Ninguna lógica de negocio aquí. |
| **`shared/`** | Reutilizables transversales: paginación, logger, guards genéricos. | **Nunca** entidades ni casos de uso. |
| **`modules/`** | Cada carpeta = *bounded context* con enfoque DDD liviano. | Se detallan abajo. |

---

## Estructura interna de cada módulo

```
modules/<nombre>/
├── application/     # Casos de uso, services de orquestación, validaciones complejas
├── domain/          # Entidades, value‑objects, DTO, interfaces
├── infrastructure/  # Adaptadores externos: repositorios TypeORM, strategies, gateways WS
└── <nombre>.module.ts
```

### Convenciones
* **Entidades y DTO** viven en `domain/` para mantener cohesión.
* **Repositories** en `infrastructure/`, implementan interfaces del dominio.
* Exportar solo lo necesario desde `application/` para no exponer detalles internos.

---

## Módulos principales

| Módulo | Propósito / Subcarpetas | Comentarios |
|--------|-------------------------|-------------|
| **`auth/`** | Autenticación local · JWT · Passport strategies (`infrastructure/strategies`). | Sin Firebase por ahora. |
| **`users/`** | Perfil privado y público, configuración. | |
| **`characters/`** | CRUD de personajes y gestión de “activo”. | |
| **`guilds/`** | Hermandades. Subcarpetas **`roles/`**, **`announcements/`** y `guilds.gateway.ts` para chat interno y eventos. | |
| **`events/`** | Gestión de eventos internos y globales (flag en entidad). | |
| **`chat/`** | Mensajería 1‑1 y grupal, `chat.gateway.ts`. | |
| **`storage/`** | Subida de archivos, firma de URLs y eliminación. | |
| **`search/`** | Endpoints y adaptadores para indexar/buscar (Elastic/Lucene). | |
| **`posts/`**, **`follows/`**, **`notifications/`**, **`moderation/`** | Funciones sociales y de moderación que se activarán en futuras releases. | |
| **`gateway/`** | (Opcional) Gateway WS global para notificaciones en tiempo real si no encaja en uno de dominio. | |

---

## Buenas prácticas incluidas

* **Nombres coherentes**: `*.controller.ts`, `*.service.ts`, `*.entity.ts`, etc.
* **Rutas versionadas** por defecto (`/api/v1`).  
* **Pruebas**: Jest con carpetas `__tests__/` dentro de cada módulo.  
* **DDD liviano**: máxima independencia entre dominios; el núcleo no conoce infraestructura.

---

> **Tip**: cuando un módulo crezca mucho, considera extraerlo a su propio microservicio sin cambiar namespaces internos.



# Diseño de Base de Datos – Hermandades (Guilds)
# Diseño de Base de Datos — Módulo de Hermandades (Guilds)

Esta sección recopila la definición de todas las entidades que intervienen en la gestión de hermandades: **Guilds**, **Guild Roles** y **Guild Memberships**. Para cada tabla se incluyen columnas, restricciones, índices y notas de integridad.

---

## 1. Tabla `guilds`
Representa la hermandad en sí (información pública, configuración y liderazgo).

| Columna | Tipo | Detalles |
|---------|------|----------|
| `id` | `uuid` PK `gen_random_uuid()` | Identificador único. |
| `name` | `varchar(60)` `UNIQUE` | Nombre visible (no distingue mayúsculas). |
| `slug` | `varchar(80)` `UNIQUE` | Alias URL‑safe derivado de `name`. |
| `description` | `text` | Resumen corto que aparece en listados. |
| `emblem_url` | `text` | Imagen o escudo oficial. |
| `rules` | `text` | Normativa interna en markdown. |
| `history` | `text` | Lore o cronología de la hermandad. |
| `privacy` | `guild_privacy` ENUM | `public` / `private` → visibilidad en buscador. |
| `access_type` | `guild_access` ENUM | `public` / `invite` / `code`. |
| `access_code_hash` | `varchar(255)` `NULLABLE` | SHA‑256 del código de acceso (`access_type = 'code'`). |
| `leader_user_id` | `uuid` FK → `users.id` | Usuario que ostenta el rol **Líder**. |
| `member_count` | `int` `DEFAULT 1` `CHECK ≥ 1` | Contador denormalizado de miembros. |
| `is_active` | `boolean` `DEFAULT true` | Soft‑delete. |
| `created_at` | `timestamptz` `DEFAULT now()` | Creación. |
| `updated_at` | `timestamptz` `DEFAULT now()` | Actualización. |

**Índices recomendados**
```sql
CREATE UNIQUE INDEX ux_guild_name  ON guilds (lower(name));
CREATE UNIQUE INDEX ux_guild_slug  ON guilds (slug);
CREATE        INDEX ix_guild_leader ON guilds (leader_user_id);
-- Búsqueda full‑text opcional
CREATE INDEX gin_guild_search ON guilds
  USING gin (to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(description,'')));
```

---

## 2. Tabla `guild_roles`
Define los roles personalizados, su jerarquía y permisos dentro de una hermandad.

| Columna | Tipo | Detalles |
|---------|------|----------|
| `id` | `uuid` PK `gen_random_uuid()` | Identificador único del rol. |
| `guild_id` | `uuid` FK → `guilds.id` | Pertenece a esta hermandad. |
| `name` | `varchar(40)` | Nombre único dentro de la guild. |
| `color` | `varchar(7)` | Hex `#RRGGBB` para UI. |
| `icon` | `varchar(50)` `NULLABLE` | Nombre de icono (FontAwesome, Lucide…). |
| `position` | `int` | Jerarquía: **0 = líder**, números mayores = menor rango. |
| `permissions` | `int` | Máscara de bits (ver tabla de valores). |
| `is_leader` | `boolean` `DEFAULT false` | Marca al rol líder (único por guild). |
| `created_at` | `timestamptz` `DEFAULT now()` | Creación. |
| `updated_at` | `timestamptz` `DEFAULT now()` | Actualización. |

**Restricciones clave**
```sql
CREATE UNIQUE INDEX ux_role_name      ON guild_roles (guild_id, lower(name));
CREATE UNIQUE INDEX ux_role_position  ON guild_roles (guild_id, position);
CREATE UNIQUE INDEX ux_role_one_leader ON guild_roles (guild_id) WHERE is_leader = TRUE;
```

### 2.1 Mapa de bits para `permissions`
| Bit | Valor | Permiso | Descripción breve |
|----:|------:|---------|-------------------|
| 0 | 1 | EDIT_INFO | Editar información de la guild. |
| 1 | 2 | MANAGE_MEMBERS | Aceptar/expulsar miembros. |
| 2 | 4 | MANAGE_ROLES | Crear/editar/eliminar roles (≠ líder). |
| 3 | 8 | POST_ANNOUNCEMENT | Publicar en el tablón interno. |
| 4 | 16 | CREATE_EVENTS | Crear eventos internos. |
| 5 | 32 | CHAT | Enviar mensajes en chat de guild. |
| 6 | 64 | CREATE_ROLES | Añadir nuevos roles. |
| – | **127** | ALL | Todos los permisos (rol líder por defecto). |

---

## 3. Tabla `guild_memberships`
Une usuarios y hermandades, indicando rol y estado del vínculo.

| Columna | Tipo | Detalles |
|---------|------|----------|
| `id` | `uuid` PK `gen_random_uuid()` | Identificador de la membresía. |
| `user_id` | `uuid` FK → `users.id` | Usuario miembro. |
| `guild_id` | `uuid` FK → `guilds.id` | Hermandad asociada. |
| `role_id` | `uuid` FK → `guild_roles.id` | Rol asignado. |
| `status` | `membership_status` ENUM | `pending` / `active` / `kicked` / `left`. |
| `invited_by_id` | `uuid` FK → `users.id` `NULLABLE` | Quién invitó (solo `pending`). |
| `joined_at` | `timestamptz` `NULLABLE` | Se rellena al pasar a `active`. |
| `left_at` | `timestamptz` `NULLABLE` | Fecha de salida o expulsión. |
| `created_at` | `timestamptz` `DEFAULT now()` | Creación. |
| `updated_at` | `timestamptz` `DEFAULT now()` | Actualización. |

**Restricciones e índices**
```sql
-- Un usuario no puede tener dos memberships en la misma guild
aCREATE UNIQUE INDEX ux_gm_user_guild ON guild_memberships (user_id, guild_id);

-- Consultas por estado
aCREATE INDEX ix_gm_status ON guild_memberships (status);

-- Miembros activos de una guild
aCREATE INDEX ix_gm_guild_active ON guild_memberships (guild_id)
  WHERE status = 'active';
```

**Reglas de integridad relevantes**
- `joined_at` **debe** contener valor cuando `status = 'active'`.
- En `status = 'pending'`, `joined_at` y `left_at` son **NULL**.
- Lógica de jerarquía: un miembro solo puede asignar o modificar roles con `position` mayor (rangos inferiores).

---

##  Enums utilizados
```sql
-- Visibilidad de la guild
aCREATE TYPE guild_privacy AS ENUM ('public', 'private');

-- Tipos de acceso
aCREATE TYPE guild_access AS ENUM ('public', 'invite', 'code');

-- Estados de membresía
aCREATE TYPE membership_status AS ENUM ('pending', 'active', 'kicked', 'left');
```

---

### Resumen de dependencias
```
users ──< guild_memberships >── guilds ──< guild_roles
          ⤷ role_id ────────────────┘
```
- `guilds.leader_user_id` **debe** existir en `guild_memberships` con el rol marcado `is_leader = true`.
- Eliminaciones en cascada: borrar una guild elimina sus roles y memberships.

---


## 4. Tabla `guild_announcements`
Representa publicaciones internas del tablón. Puede ser **general** o **poll**.

| Columna | Tipo | Detalles |
|---------|------|----------|
| id | uuid PK `gen_random_uuid()` | Identificador único |
| guild_id | uuid FK → guilds.id | Hermandad a la que pertenece |
| author_user_id | uuid FK → users.id | Usuario creador (puede quedar NULL si se borra la cuenta) |
| author_character_id | uuid FK → characters.id | Personaje activo con el que se publica |
| title | varchar(120) | Título del anuncio |
| content | text | Texto Markdown/enriquecido |
| type | announcement_type ENUM | `general` / `poll` |
| multi_select | boolean | Permite votar varias opciones (DEFAULT false) |
| max_choices | int NULLABLE | Límite máximo de opciones que un usuario puede marcar cuando `multi_select=true` |
| close_at | timestamptz NULLABLE | Fecha de cierre (requerida si `type='poll'`) |
| show_results | boolean | Mostrar resultados durante la votación (DEFAULT true) |
| created_at | timestamptz | Marca de creación |
| updated_at | timestamptz | Actualizado automáticamente |

**Restricciones**
- `type='poll'` → `close_at` NOT NULL.
- Si `multi_select=false`, `max_choices` debe ser NULL.
- Si `multi_select=true`, `max_choices` > 1 o NULL.

---

## 5. Tabla `guild_poll_options`
Opciones disponibles dentro de una encuesta.

| Columna | Tipo | Detalles |
|---------|------|----------|
| id | uuid PK | Identificador único |
| announcement_id | uuid FK → guild_announcements.id | Encuesta propietaria |
| option_text | varchar(120) | Texto visible |
| position | int | Orden (0,1,2…) |
| votes_count | int | Contador denormalizado (trigger con `guild_votes`) |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Fecha de actualización |

**Índice**: `(announcement_id, position)` para ordenar por opción.

---

## 6. Tabla `guild_votes`
Registro de votos emitidos por los usuarios.

| Columna | Tipo | Detalles |
|---------|------|----------|
| id | uuid PK | Identificador único |
| announcement_id | uuid FK → guild_announcements.id | Encuesta a la que pertenece el voto |
| poll_option_id | uuid FK → guild_poll_options.id | Opción seleccionada |
| user_id | uuid FK → users.id | Votante (cuenta) |
| character_id | uuid FK → characters.id NULLABLE | Personaje activo al votar |
| created_at | timestamptz | Marca temporal |

**Restricciones**
- **Un solo voto por usuario y opción**: índice único `(poll_option_id, user_id)`.
- Lógica en servicio: si `announcement.multi_select=false` → sólo se permite un voto para todo el anuncio; si `max_choices` está definido → no superar ese límite.

**Trigger sugerido**
```sql
AFTER INSERT OR DELETE ON guild_votes
  UPDATE guild_poll_options
  SET votes_count = votes_count + CASE WHEN TG_OP = 'INSERT' THEN 1 ELSE -1 END
  WHERE id = NEW.poll_option_id;
```


---

## 7. Tabla `guild_internal_events`

Gestiona entrenamientos, reuniones y otros eventos exclusivos de la hermandad.

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
| attendee\_count        | int DEFAULT 0               | Contador sólo de confirmados                  |
| status                 | event\_status ENUM          | `scheduled`·`cancelled`·`completed`           |
| highlighted            | boolean DEFAULT false       | Marca para "próximo evento"                   |
| created\_at            | timestamptz                 | Creación                                      |
| updated\_at            | timestamptz                 | Última edición                                |

**Índices clave**

- `(guild_id, start_at DESC)` para próximos/pasados.
- `status` para filtrar por estado.

---

## 8. Tabla `guild_event_attendance`

Registra la asistencia por usuario/personaje a los eventos internos.

| Columna       | Tipo                                 | Detalles                            |
| ------------- | ------------------------------------ | ----------------------------------- |
| id            | uuid PK                              | Identificador                       |
| event\_id     | uuid FK → guild\_internal\_events.id | Evento asociado                     |
| user\_id      | uuid FK → users.id                   | Jugador que confirma                |
| character\_id | uuid FK → characters.id              | Personaje activo usado como máscara |
| status        | attendance\_status ENUM              | `confirmed` o `cancelled`           |
| changed\_at   | timestamptz                          | Última vez que cambió el estado     |
| created\_at   | timestamptz                          | Creación del registro               |

**Restricciones**

- Índice único `(event_id, user_id)` asegura una sola fila por usuario‑evento.
- Sólo los registros `status='confirmed'` cuentan para `attendee_count` (trigger).
- Antes de confirmar se verifica `capacity` en la tabla de eventos.

---

> **Integridad**: Al eliminar un evento se purgan sus asistencias en cascada y se actualiza el contador de la hermandad. El control de aforo y los cambios de estado se manejan en los servicios NestJS para mantener transacciones y emitir notificaciones en tiempo real.



## 9. Tabla `guild_invites`

Gestiona **invitaciones** y **solicitudes de acceso** a la hermandad.

| Columna               | Tipo                        | Detalles                                                      |
| --------------------- | --------------------------- | ------------------------------------------------------------- |
| id                    | uuid PK `gen_random_uuid()` | Identificador único                                           |
| guild\_id             | uuid FK → guilds.id         | Hermandad destino                                             |
| type                  | `invite_type` ENUM          | `invite` = la guild invita · `request` = el usuario solicita  |
| sender\_user\_id      | uuid FK → users.id          | Quien crea la invitación o solicitud                          |
| target\_user\_id      | uuid FK → users.id NULLABLE | Usuario invitado (NULL si es por email/link)                  |
| email                 | varchar(255) NULLABLE       | Invitar a correo externo                                      |
| token\_hash           | varchar(255) NULLABLE       | SHA‑256 de token para invitaciones por enlace                 |
| expires\_at           | timestamptz NULLABLE        | Caducidad del token/link                                      |
| status                | `invite_status` ENUM        | `pending` · `accepted` · `rejected` · `cancelled` · `expired` |
| handled\_by\_user\_id | uuid FK → users.id NULLABLE | Moderador que acepta/rechaza                                  |
| handled\_at           | timestamptz NULLABLE        | Marca de tiempo de la resolución                              |
| created\_at           | timestamptz                 | Creación                                                      |
| updated\_at           | timestamptz                 | Última modificación                                           |

### Enums

```sql
CREATE TYPE invite_type AS ENUM ('invite', 'request');
CREATE TYPE invite_status AS ENUM ('pending', 'accepted', 'rejected', 'cancelled', 'expired');
```

### Índices

```sql
CREATE INDEX ix_gi_guild_status ON guild_invites (guild_id, status);
CREATE UNIQUE INDEX ux_gi_token_hash ON guild_invites (token_hash) WHERE token_hash IS NOT NULL;
```

### Lógica de negocio resumida

| Caso                            | Acción                                                                 | Resultado                                              |
| ------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------ |
| Invitación directa a un usuario | Crea fila `invite`, `target_user_id`, `status='pending'`               | El usuario acepta → se crea **guild\_membership**.     |
| Invitación por enlace           | Genera token + `token_hash`, `expires_at`                              | Cualquiera con el enlace y cuenta válida puede unirse. |
| Solicitud de acceso             | Crea fila `request` con `sender_user_id`                               | Un moderador acepta/rechaza.                           |
| Aceptar                         | Cambia `status='accepted'`, rellena `handled_by_user_id`, `handled_at` | Se crea/activa la membresía correspondiente.           |
| Rechazar / Cancelar             | `status='rejected'` o `cancelled`                                      | No se toca `guild_memberships`.                        |
| Expirar                         | Tarea cron cambia `status='expired'` si `now() > expires_at`           | Invalida el token.                                     |

---




# Diseño de Base de Datos — Subsistema de Mensajería

Esta sección describe las tablas y relaciones que soportan el chat 1‑a‑1 y el chat grupal de hermandad, con identidad de personaje activo, historial persistente y preparación para WebSockets.

---

## 1. Vista global

| Tabla                    | Descripción breve                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| **chat\_channels**       | Define cada canal. Dos tipos: `direct` (entre dos usuarios) y `guild` (chat de hermandad). |
| **chat\_participants**   | Usuarios enrolados en un canal; guarda la máscara de personaje usada al entrar.            |
| **chat\_messages**       | Mensajes enviados (texto, adjuntos, metadata).                                             |
| **chat\_message\_reads** | Marca de lectura por usuario con timestamp.                                                |
| **chat\_attachments**    | Archivos vinculados a un mensaje (imágenes, documentos).                                   |
| **chat\_reactions**      | Reacciones emoji a un mensaje. *(Futuro)*                                                  |

Relaciones clave:

```
chat_channels 1─N chat_participants N─1 users
chat_channels 1─N chat_messages     N─1 users
chat_messages 1─N chat_attachments
chat_messages 1─N chat_message_reads N─1 users
```

---

## 2. Tabla `chat_channels`

Definición resumida:

| Columna           | Tipo                | Detalles                                             |           |
| ----------------- | ------------------- | ---------------------------------------------------- | --------- |
| id                | uuid PK             | `gen_random_uuid()`                                  |           |
| type              | `channel_type` ENUM | \`'direct'                                           | 'guild'\` |
| guild\_id         | uuid FK → guilds.id | SOLO para `type='guild'`                             |           |
| direct\_hash      | varchar(64)         | SHA‑256(`<userA>:<userB>`). Único si `type='direct'` |           |
| topic             | varchar(120)        | Título opcional en canales de guild                  |           |
| last\_message\_at | timestamptz         | Para ordenar chats "recientes"                       |           |
| is\_archived      | boolean             | Ocultar sin borrar                                   |           |



Índices: `ux_cc_direct_hash`, `ix_cc_guild`, `ix_cc_lastmsg`

**Regla de coherencia** (`chk_cc_guild_type`):

```
(type='guild'  AND guild_id IS NOT NULL AND direct_hash IS NULL) OR
(type='direct' AND guild_id IS NULL     AND direct_hash IS NOT NULL)
```

Notas útiles:

- *Un solo canal directo* por par de usuarios gracias a `direct_hash`.
- Al crear una guild se genera automáticamente su canal `guild`.
- `last_message_at` se actualiza cada vez que llega un mensaje.

---

## 3. Tabla `chat_participants`

| Columna       | Tipo                        | Detalles                   |
| ------------- | --------------------------- | -------------------------- |
| id            | uuid PK                     |                            |
| channel\_id   | uuid FK → chat\_channels.id |                            |
| user\_id      | uuid FK → users.id          |                            |
| character\_id | uuid FK → characters.id     | Máscara al unirse          |
| role          | `participant_role` ENUM     | `member` / `moderator`     |
| status        | `participant_status` ENUM   | `active` / `left`          |
| joined\_at    | timestamptz                 | `DEFAULT now()`            |
| left\_at      | timestamptz                 | NULL salvo `status='left'` |

Restricciones:

- **Única fila** por `(channel_id, user_id)` → índice `ux_cp_user_channel`.
- *Check* `left_at` coherente con `status`.

Notas de lógica:

- Cambiar personaje activo **no** altera `character_id`; solo afecta mensajes nuevos.
- En canales `guild`, los participantes se sincronizan con `guild_memberships` activos.
- Moderadores podrán borrar mensajes o silenciar usuarios (futuro).

---



## 4. Tabla `chat_messages`
Almacena los mensajes enviados en cada canal con soporte para markdown, adjuntos y operaciones de edición/borrado.

| Columna | Tipo | Detalles |
|---------|------|----------|
| id | uuid PK `gen_random_uuid()` | Identificador único de mensaje |
| channel_id | uuid FK → chat_channels.id | Canal al que pertenece |
| sender_user_id | uuid FK → users.id | Puede ser NULL si `type='system'` |
| sender_character_id | uuid FK → characters.id NULL | Máscara pública al momento de envío |
| type | `message_type` ENUM | `text` / `system` / `media` |
| content | text | Texto o payload serializado |
| reply_to_id | uuid FK → chat_messages.id NULL | Para citas / hilos simples |
| sent_at | timestamptz `DEFAULT now()` | Marca de tiempo principal |
| edited_at | timestamptz NULL | Última edición (si procede) |
| is_deleted | boolean `DEFAULT false` | Soft‑delete: conserva el orden |
| created_at | timestamptz | Fecha de inserción |
| updated_at | timestamptz | Última modificación |

**Restricciones & Índices**
* `ix_cm_channel_sent` – `(channel_id, sent_at DESC)` para paginado hacia atrás.
* `gin_cm_content` GIN full‑text sobre `content` (para buscador).
* `chk_cm_system_content` – un mensaje `system` no puede tener `sender_user_id`.

**Lógica de servicio**
* Al **enviar**: verificar participación activa → insert mensaje → update `last_message_at` en `chat_channels`.
* **Editar**: autor o moderator; set `edited_at` y re‑emitir evento WS.
* **Borrar**: set `is_deleted=true`; UI decide renderizar “mensaje eliminado”.
* **Búsqueda**: `to_tsvector('simple', content)` + `plainto_tsquery(keyword)`.

---

## 5. Tabla `chat_attachments`
Guarda metadatos de archivos vinculados a mensajes (`type='media'`). Se puede extender para miniaturas/redimensionados.

| Columna | Tipo | Detalles |
|---------|------|----------|
| id | uuid PK | |
| message_id | uuid FK → chat_messages.id | Borrado en cascada |
| file_url | text | URL firmada o pública en el Storage |
| file_name | varchar(140) | Nombre original para descarga |
| content_type | varchar(100) | MIME (`image/png`, `application/pdf`, …) |
| size_bytes | bigint | Tamaño en bytes |
| width_px | int NULL | Sólo imágenes/vídeos |
| height_px | int NULL | Sólo imágenes/vídeos |
| created_at | timestamptz | |

**Índices**
* `ix_ca_message` – por mensaje.
* `ix_ca_mime` – filtrar por tipo MIME.

**Lógica de servicio**
* Antes de insertar se sube el archivo al Storage (S3/Firebase) y se obtiene la URL.
* Política de tamaño y tipos válidos se valida fuera de la BD.
* Cron “orphan cleaner” elimina ficheros cuyo mensaje fue borrado.

---

## 6. Tabla `chat_message_reads`
Registra cuándo cada usuario ha leído un mensaje concreto. Clave compuesta `(message_id,user_id)` evita duplicados.

| Columna | Tipo | Detalles |
|---------|------|----------|
| message_id | uuid FK → chat_messages.id | Parte de la PK |
| user_id | uuid FK → users.id | Parte de la PK |
| read_at | timestamptz `DEFAULT now()` | Marca de lectura |

**Índices**
* `ix_cmr_user` – `(user_id, read_at DESC)` para mostrar últimos leídos.
* `ix_cmr_message` – agrupar lecturas por mensaje (contadores).

**Lógica de servicio**
* **Marcar leído**: `INSERT … ON CONFLICT DO NOTHING`.
* **Contador no leídos**: comparar `sent_at` vs. última lectura o usar sumatoria `chat_messages` – `chat_message_reads`.
* **Evento WS**: `read:ack` con payload `{channelId, messageId, userId}` para actualizar ticks azules en tiempo real.

---

### Diagrama de relaciones actualizado


> Con estas tablas la mensajería cubre creación de canales, membresía, mensajes con adjuntos, lectura y ordenación. Búsqueda full‑text y soft‑delete aseguran rendimiento y preservan historial.



# Diseño de Base de Datos — Eventos Globales y Noticias


## Tabla de contenidos
1. Visión general de tablas y relaciones
2. Tabla `event_categories`
3. Tabla `global_events`
4. Tabla `global_event_attendance`
5. Tabla `event_media`
6. Triggers y tareas programadas sugeridas

---

## 1. Visión general de tablas y relaciones

| Tabla | Propósito breve | Relación clave |
|-------|-----------------|----------------|
| **event_categories** | Catálogo editable de tipos (torneo, feria, noticia…). | FK desde `global_events.category_id` |
| **global_events** | Ficha pública del evento global. | 1‑N con `global_event_attendance` y `event_media` |
| **global_event_attendance** | Confirma o cancela la asistencia de un usuario (con máscara de personaje). | PK compuesta `(event_id,user_id)` |
| **event_media** | Galería de imágenes/vídeos/documentos vinculada al evento. | FK → `global_events.id` |

```
users ──< global_event_attendance >── global_events >── event_categories
characters ─┘                         │
                                       └──< event_media
```

---

## 2. Tabla `event_categories`

| Columna | Tipo | Detalles |
|---------|------|----------|
| id | uuid PK `gen_random_uuid()` | Identificador único |
| name | varchar(40) **UNIQUE NOT NULL** | “Torneo”, “Convivencia”… |
| slug | varchar(60) **UNIQUE** | Alias URL‑safe (`feria-medieval`) |
| color | varchar(7) | HEX (`#ff5722`) para badges |
| description | text NULL | Explicación breve |
| position | int **UNIQUE** | Orden en UI (0=primero) |
| created_at | timestamptz | Auto `now()` |
| updated_at | timestamptz | Auto `now()` |

**Índices y checks**
* `ux_ec_name`, `ux_ec_slug`, `ux_ec_pos` garantizan unicidad.
* Slug autogenerado con `slugify(name)`.

**Lógica**
* Solo administradores pueden crear/editar.
* Al crear sin `position`, se asigna `MAX(position)+1`.
* Al reordenar, el servicio actualiza los `position` adyacentes para mantener secuencia.

---

## 3. Tabla `global_events`

| Columna | Tipo | Detalles |
|---------|------|----------|
| id | uuid PK | |
| creator_user_id | uuid FK → users.id | `SET NULL` si la cuenta se borra |
| category_id | uuid FK → event_categories.id | Categoría del evento |
| title | varchar(120) | Nombre público |
| slug | varchar(140) **UNIQUE** | Alias (`torneo-primavera-2026`) |
| description | text | Markdown permitido |
| banner_url | text NULL | Imagen de cabecera |
| location_text | varchar(120) | Ciudad / recinto |
| latitude / longitude | numeric(9,6) NULL | Ambos NULL o ambos NOT NULL |
| start_at / end_at | timestamptz | `end_at` NULL o > `start_at` |
| capacity | int NULL | Aforo (`CHECK >0`) |
| attendee_count | int DEFAULT 0 | Denormalizado (trigger) |
| status | `event_status` ENUM | `scheduled/cancelled/completed` |
| featured | boolean DEFAULT false | Mostrar en home |
| created_at / updated_at | timestamptz | Auto |

**Índices**
* `ix_ge_cat_start` → listados por categoría y fecha.
* `ix_ge_status_date` → próximos/cancelados.
* `gin_ge_search` → búsqueda full‑text en `title + description`.
* `ix_ge_coords` → filtros geográficos (o GiST si PostGIS).

**Checks**
* Fechas (`end_at > start_at`).
* Coherencia coordenadas.
* Capacidad positiva.

**Lógica**
* Guard NestJS verifica permiso `isEventOrganizer` en `creator_user_id`.
* Trigger `AFTER INSERT/UPDATE` en `global_event_attendance` mantiene `attendee_count`.
* Cron diario actualiza `status='completed'` cuando `end_at` expiró.

---

## 4. Tabla `global_event_attendance`

| Columna | Tipo | Detalles |
|---------|------|----------|
| event_id | uuid PK‑part | FK → global_events.id |
| user_id | uuid PK‑part | FK → users.id |
| character_id | uuid NULL | FK → characters.id |
| status | `attendance_status` ENUM | `confirmed/cancelled/waitlisted` |
| changed_at | timestamptz | Auto `now()` |
| created_at | timestamptz | Auto |

**Restricciones**
* PK compuesta evita duplicados.
* `status` + `capacity` gestionan lista de espera.

**Índices**
* `ix_gea_event_status` → asistentes confirmados por evento.
* `ix_gea_user` → historial de un usuario.

**Lógica**
* Confirmar: si aforo lleno → `waitlisted`.
* Cancelar: reduce `attendee_count` y promueve un `waitlisted`.
* Trigger actualiza aforo después de cualquier INSERT/UPDATE/DELETE.

---

## 5. Tabla `event_media`

| Columna | Tipo | Detalles |
|---------|------|----------|
| id | uuid PK | |
| event_id | uuid FK → global_events.id | Galería del evento |
| uploader_user_id | uuid FK → users.id | NULL si usuario borrado |
| file_url | text | URL en Storage/CDN |
| thumbnail_url | text NULL | Miniatura (si imagen/vídeo) |
| file_name | varchar(140) | Nombre original |
| content_type | varchar(100) | MIME (`image/jpeg`, etc.) |
| size_bytes | bigint | Tamaño |
| width_px / height_px | int NULL | Solo multimedia visual |
| caption | varchar(200) NULL | Texto bajo la imagen |
| position | int DEFAULT 0 | Orden |
| created_at | timestamptz | |

**Índices**
* `ix_em_event_pos` → orden por posición.
* `ix_em_mime` → filtros por tipo.

**Lógica**
* Al subir: validar tamaño/MIME → generar `thumbnail_url` → `position = MAX+1`.
* Reordenar: servicio ajusta `position` para secuencia continua.
* Al eliminar: borrar archivo en Storage + fila; renumerar.

---

## 6. Triggers y cron sugeridos

| Nombre | Tipo | Descripción |
|--------|------|-------------|
| **tg_gea_count** | PL/pgSQL | `AFTER INSERT/UPDATE/DELETE` en `global_event_attendance` → recalcula `attendee_count` donde `status='confirmed'`. |
| **tg_ev_media_pos** | PL/pgSQL | `AFTER DELETE` en `event_media` → renumera `position` restantes. |
| **cron_complete_events** | Job diario | Marca `GLOBAL_EVENTS.status='completed'` cuando `end_at < now()`. |
| **cron_expire_waitlist** | Job diario | Envía correo a `waitlisted` si se libera aforo. |

Con estas tablas, restricciones e índices, el subsistema de eventos globales queda preparado para búsquedas rápidas, control de asistencia y gestión multimedia rica.






# Guía Definitiva de Configuración de Base de Datos

*PostgreSQL · NestJS 10 · TypeORM 0.3*

Este documento explica, paso a paso, cómo conectar la aplicación **Larping & Go** a PostgreSQL, generar y ejecutar migraciones, sembrar datos iniciales y verificar que las **40 + entidades y vistas** diseñadas se crean correctamente.

---

## 1 · Estructura de carpetas

```text
src/
├─ app.module.ts                 # módulo raíz—ahora minimal
├─ config/
│  ├─ configuration.ts           # carga y tipa variables .env
│  └─ validation.schema.ts       # validación Joi
├─ database/
│  ├─ data-source.ts             # instancia única de DataSource
│  ├─ database.module.ts         # @Global() + TypeOrmModule.forRoot
│  ├─ migrations/                # *.ts generadas por CLI
│  └─ seeds/seed.ts              # datos iniciales (categorías, roles)
└─ modules/                      # bounded‑contexts (auth, guilds, chat…)
```

---

## 2 · Variables de entorno (`.env`)

```ini
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
APP_PORT=
JWT_SECRET=
JWT_EXPIRES_IN=
```

`validation.schema.ts` aborta el arranque si faltan claves o el formato es incorrecto.

---

## 3 · `config/configuration.ts`

```ts
export default registerAs('config', () => ({
  db: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    ssl: process.env.NODE_ENV === 'production',
  },
  app:  { port: +process.env.APP_PORT || 3000 },
  jwt:  { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN },
}));
```

---

## 4 · `database/data-source.ts`

```ts
import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as path from 'path';
import config from '../config/configuration';

const cfg = config();
const entities = path.join(__dirname, '../modules/**/domain/**/*{.entity,.view}.{ts,js}');
const migrations = path.join(__dirname, './migrations/*.{ts,js}');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: cfg.db.host,
  port: cfg.db.port,
  username: cfg.db.user,
  password: cfg.db.pass,
  database: cfg.db.name,
  ssl: cfg.db.ssl,
  logging: false,
  synchronize: false,           // ¡Nunca en prod!
  entities: [entities],
  migrations: [migrations],
});
```

**Regla de oro:** este archivo debe exportar **solo una** instancia `DataSource`.

---

## 5 · `database/database.module.ts`

```ts
@Global()
@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
```

`app.module.ts` simplemente importa `DatabaseModule` y deja de llamar a `TypeOrmModule.forRoot`.

---

## 6 · Scripts de NPM

```json
"scripts": {
  "typeorm":            "ts-node -r tsconfig-paths/register node_modules/typeorm/cli",
  "migration:generate": "npm run typeorm -- migration:generate -d src/database/data-source.ts src/database/migrations/InitSchema",
  "migration:run":      "npm run typeorm -- migration:run      -d src/database/data-source.ts",
  "seed":               "ts-node src/database/seeds/seed.ts"
}
```

---

## 7 · Vista materializada `search_index`

Para evitar errores de alias en el CLI se **excluye del glob** y se crea en una migración manual:

```ts
await queryRunner.query(`
  CREATE MATERIALIZED VIEW search_index AS /* SELECT UNION ALL … */;
  CREATE INDEX gin_si_tsv ON search_index USING gin(tsv);
`);
```

Refrescada luego con `REFRESH MATERIALIZED VIEW CONCURRENTLY search_index;`.

---

## 8 · Migraciones y semillas

1. `npm run migration:generate` → genera todo el DDL (extensiones, enums, tablas, índices).
2. `npm run migration:run` → aplica en la base de datos.
3. `npm run seed` → inserta categorías de eventos y rol “Líder”.

---

## 9 · Verificación rápida

```bash
psql -d larping_and_go -c "\dt"                 # lista tablas
psql -d larping_and_go -c "SELECT * FROM event_categories;"
```

---

## 10 · Solución de problemas frecuentes

| Error                                                   | Motivo                                          | Solución                                    |
| ------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------- |
| **Given data source file must contain only one export** | `data-source.ts` exporta más de una cosa        | Deja solo `export const AppDataSource …`.   |
| **Cannot build query because main alias is not set**    | Vista con expresión vacía o sin `FROM`          | Excluir del glob y construir vía SQL.       |
| **un identificador entre comillas está inconcluso**     | `@Index` con comilla sobrante (`… 'confirmed"`) | Corrige la entidad y regenera la migración. |

---

## 11 · Arranque de la API

```bash
npm run start:dev   # Nest levanta y conecta usando AppDataSource
```

Los futuros cambios de esquema siguen el ciclo: **editar entidad → migration**\*\*:generate\*\*\*\* → PR → migration\*\*\*\*:run\*\*\*\* en staging/prod\*\*.

---

**Fin de la guía.**




# Autenticación – **Larping & Go Backend**

Este lienzo reúne **toda la información técnica** del módulo **Auth** tal y como se ha implementado, para que se comprenda, amplíe y pruebe el flujo completo de autenticación.

---

## 1 · Propósito del módulo

| Caso de uso            | Descripción                                                               |
| ---------------------- | ------------------------------------------------------------------------- |
| Registro               | Alta de usuario con correo, nombre de usuario y contraseña segura.        |
| Inicio de sesión       | Valida credenciales y emite *access* y *refresh* tokens.                  |
| Renovación de sesión   | Genera un nuevo *access token* usando un *refresh token* válido (7 días). |
| Restablecer contraseña | Flujo en dos pasos: solicitud (correo + enlace) y confirmación.           |
| Quién soy / Me         | Endpoint protegido que devuelve el `user.id` autenticado.                 |

---

## 2 · Estructura de carpetas

```text
modules/auth/
├─ application/
│  ├─ auth.service.ts        ← orquestador
│  ├─ commands/
│  ├─ ports/
│  └─ use-cases/
├─ domain/
│  ├─ dto/
│  ├─ entities/
│  └─ value-objects/
└─ infrastructure/
   ├─ adapters/
   ├─ controllers/
   ├─ guards/
   ├─ repositories/
   └─ strategies/
auth.module.ts
```

---

## 3 · Entidades clave

### `User` *(del módulo **************users**************)*

Campos principales: `id`, `email`, `passwordHash`, `username`, *flags* de estado y relaciones.

### `PasswordResetToken`

| Campo             | Tipo            | Comentario                               |
| ----------------- | --------------- | ---------------------------------------- |
| `tokenHash`       | SHA‑256         | Nunca se guarda el token plano.          |
| `expiresAt`       | Date            | Debe ser futura (`@BeforeInsert`).       |
| `used` / `usedAt` | boolean / Date? | Evita reutilización del enlace de reset. |

---

## 4 · DTO

| Archivo                         | Campos                                          |
| ------------------------------- | ----------------------------------------------- |
| `register.dto.ts`               | `email`, `password`, `username`, `displayName?` |
| `login.dto.ts`                  | `email`, `password`                             |
| `refresh-token.dto.ts`          | `refreshToken`                                  |
| `request-password-reset.dto.ts` | `email`                                         |
| `confirm-password-reset.dto.ts` | `token`, `newPassword`                          |

---

## 5 · Ports (interfaces)

| Port interface                 | Métodos principales                               |
| ------------------------------ | ------------------------------------------------- |
| **`IUserAuthRepository`**      | `existsByEmail`, `findByEmail`, `save`            |
| **`IPasswordTokenRepository`** | `create`, `findValid`, `markUsed`, `purgeExpired` |
| **`IHasherPort`**              | `hash`, `compare` (BCrypt)                        |
| **`IJwtPort`**                 | `sign`, `verify`                                  |
| **`IMailerPort`**              | `sendPasswordReset(to, link)`                     |

---

## 6 · Use‑cases

| Use‑case                 | Flujo resumido                                                     |
| ------------------------ | ------------------------------------------------------------------ |
| **RegisterUser**         | 1 Comprueba email → 2 Hashea contraseña → 3 Guarda usuario.        |
| **LoginUser**            | 1 Busca usuario → 2 Compara hash → 3 Emite tokens.                 |
| **RequestPasswordReset** | 1 Genera token SHA‑256 (+2 h) → 2 Envía correo con enlace.         |
| **ConfirmPasswordReset** | 1 Valida token → 2 Marca `used` → 3 Actualiza contraseña (BCrypt). |

---

## 7 · Adapters concretos

| Adaptador                 | Implementa                 | Detalle técnico                                       |
| ------------------------- | -------------------------- | ----------------------------------------------------- |
| `UserAuthRepository`      | `IUserAuthRepository`      | TypeORM sobre entidad `User`.                         |
| `PasswordTokenRepository` | `IPasswordTokenRepository` | TypeORM + filtros `MoreThan / LessThan`.              |
| `BcryptAdapter`           | `IHasherPort`              | Rondas = 12.                                          |
| `JwtAdapter`              | `IJwtPort`                 | Envoltorio de `@nestjs/jwt`.                          |
| `MailerAdapter`           | `IMailerPort`              | Transporte SMTP vía `nodemailer` (`SMTP_*` env vars). |

---

## 8 · Capa de seguridad

| Archivo                   | Responsabilidad                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `jwt-access.strategy.ts`  | Verifica *access token* (`Authorization: Bearer …`), firma con `config.jwt.secret`. |
| `jwt-refresh.strategy.ts` | Verifica *refresh token* (`body.refreshToken`), firma con `${secret}_refresh`.      |
| `JwtAuthGuard`            | Protege endpoints estándar (rol *access*).                                          |
| `JwtRefreshGuard`         | Protege `/auth/refresh` (rol *refresh*).                                            |

---

## 9 · `AuthService` (façade)

| Método público              | Caso de uso interno           | Devuelve                        |
| --------------------------- | ----------------------------- | ------------------------------- |
| `register(dto)`             | `RegisterUserUseCase`         | `{ accessToken, refreshToken }` |
| `login(dto)`                | `LoginUserUseCase`            | `{ accessToken, refreshToken }` |
| `refresh(dto, userId)`      | — (solo helper)               | nuevos tokens                   |
| `requestPasswordReset(dto)` | `RequestPasswordResetUseCase` | `void`                          |
| `confirmPasswordReset(dto)` | `ConfirmPasswordResetUseCase` | `void`                          |

Helper privado **`issueTokens()`** genera tokens mediante `IJwtPort`.

---

## 10 · Controladores REST

| Ruta                          | Guard             | Input DTO                 | Acción                             |
| ----------------------------- | ----------------- | ------------------------- | ---------------------------------- |
| `POST /auth/register`         | —                 | `RegisterDto`             | `authService.register`             |
| `POST /auth/login`            | —                 | `LoginDto`                | `authService.login`                |
| `POST /auth/refresh`          | `JwtRefreshGuard` | `RefreshTokenDto`         | `authService.refresh`              |
| `GET  /auth/me`               | `JwtAuthGuard`    | —                         | responde `{ id }`                  |
| `POST /auth/password/request` | —                 | `RequestPasswordResetDto` | `authService.requestPasswordReset` |
| `POST /auth/password/confirm` | —                 | `ConfirmPasswordResetDto` | `authService.confirmPasswordReset` |

Todos decorados con **`@ApiTags('auth')`** para Swagger.

---

## 11 · `auth.module.ts`

* **imports**: `TypeOrmModule.forFeature([User, PasswordResetToken])`, `JwtModule.registerAsync`, `PassportModule`, `ConfigModule`.
* **controllers**: `AuthController`, `PasswordResetController`.
* **providers**: adapters, strategies, guards, use‑cases, `AuthService`.
* **exports**: `AuthService`, `JwtAuthGuard`.



## 13 · Validación Joi

```ts
JWT_SECRET: Joi.string().min(12).required(),
JWT_EXPIRES_IN: Joi.string().default('3600s'),
SMTP_HOST: Joi.string().required(),
SMTP_PORT: Joi.number().default(587),
SMTP_USER: Joi.string().required(),
SMTP_PASS: Joi.string().required(),
```

---

## 14 · Flujo de restablecimiento de contraseña

1. **Solicitud**   `POST /auth/password/request`

   * Genera `rawToken` UUID.
   * Guarda `sha256(rawToken)` en `password_reset_tokens` con `expiresAt=+2 h`.
   * Envía correo a `FRONT_URL/reset?token=${rawToken}`.

2. **Confirmación**   `POST /auth/password/confirm`

   * Recibe `token` plano + `newPassword`.
   * Calcula `sha256(token)` y busca fila no usada y no expirada.
   * Marca el token como usado y actualiza `passwordHash` (BCrypt) del usuario.

---

## 14 bis · Flujos paso a paso (detalle completo)

### 14 bis‑1 · Registro

| Paso | Capa               | Acción                                                                                       | Detalles                             |
| ---- | ------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------ |
|  1   | **Controller**     | `POST /auth/register` recibe `RegisterDto`.                                                  | Nest ValidationPipe asegura formato. |
|  2   | **AuthService**    | Convierte DTO → `RegisterCommand`.                                                           |                                      |
|  3   | **RegisterUserUC** | a) `existsByEmail` (repo).b) `hash(password)` (BCrypt).c) crea entidad `User` y la `save()`. | 📄 INSERT en tabla `users`.          |
|  4   | **AuthService**    | Llama a `issueTokens(id)`.                                                                   | Usando `IJwtPort.sign`.              |
|  5   | **Controller**     | Devuelve `{accessToken, refreshToken}` (201).                                                |                                      |

### 14 bis‑2 · Login

| Paso                                                        | Descripción |
| ----------------------------------------------------------- | ----------- |
|  1 `POST /auth/login` → DTO                                 |             |
|  2 `LoginUserUC` busca usuario por email → `compare` BCrypt |             |
|  3 Genera tokens (mismo helper)                             |             |
|  4 Respuesta 200 con tokens                                 |             |

### 14 bis‑3 · Refresh

| Paso                                                          | Notas |
| ------------------------------------------------------------- | ----- |
|  1 `POST /auth/refresh` incluye `refreshToken` en body.       |       |
|  2 `JwtRefreshGuard` verifica firma, exp y secret `_refresh`. |       |
|  3 Si OK, añade `req.user.id`.                                |       |
|  4 `AuthService.refresh(_, id)` emite nuevos tokens.          |       |

### 14 bis‑4 · WhoAmI (`GET /auth/me`)

1. `JwtAuthGuard` valida *access token*.2. Devuelve `{ id }`.

### 14 bis‑5 · Solicitud de reset

| Nº | Acción                                                 | Resultado              |
| -- | ------------------------------------------------------ | ---------------------- |
| 1  | `POST /auth/password/request` con email                | Pipe valida email      |
| 2  | `RequestPasswordResetUC` genera `rawToken` UUID        |                        |
| 3  | Calcula `sha256` y guarda fila `password_reset_tokens` | `expiresAt = now()+2h` |
| 4  | `MailerAdapter.sendPasswordReset()` envía enlace       | Contiene `rawToken`    |
| 5  | Responde 202 Accepted                                  |                        |

### 14 bis‑6 · Confirmación de reset

| Paso                                                             | Acción |
| ---------------------------------------------------------------- | ------ |
| 1 `POST /auth/password/confirm` con `token`, `newPassword`       |        |
| 2 `ConfirmPasswordResetUC` → `sha256(token)` y busca fila válida |        |
| 3 Marca `used`, actualiza `user.passwordHash` (BCrypt)           |        |
| 4 Devuelve 204 No Content                                        |        |

---

## 15 · Migraciones y seeds · Migraciones y seeds

* La tabla `password_reset_tokens` y sus índices se crean en **InitSchema**.
* **Seed inicial**: categorías de evento + usuario *admin* (`email: admin@...`).

```bash
npm run migration:run
npm run seed
```

---

## 16 · Pruebas de humo

```bash
# Registro
curl -X POST http://localhost:3000/auth/register \
     -H 'Content-Type: application/json' \
     -d '{"email":"a@b.c","password":"qwerty12","username":"alfa"}'

# Login
curl -X POST http://localhost:3000/auth/login \
     -H 'Content-Type: application/json' \
     -d '{"email":"a@b.c","password":"qwerty12"}'

# Refresh
printf '%s' '{"refreshToken":"<RT>"}' | \
  curl -X POST http://localhost:3000/auth/refresh -H 'Content-Type: application/json' -d @-

# Solicitar reset
curl -X POST http://localhost:3000/auth/password/request -d '{"email":"a@b.c"}'
```

---

### Cosas futuras:

“Cerrar sesión” cuando se usan JWT

Los access tokens son stateless, así que “hacer logout” consiste en garantizar que el front deja de usarlos o que el backend los rechaza. Hay tres patrones válidos; puedes elegir uno o combinarlos.

Opción	¿Cómo funciona?	Cambios en el proyecto	Pros / Contras

1\. Sólo front (token-discard)	El cliente borra accessToken y refreshToken de memoria / localStorage y cierra el WebSocket.	• Añadir endpoint /auth/logout que devuelva 204.

• En el front, dispatch(logout) limpia storage y cookies.	✔ Sin carga en BD ni Redis.

✖ Si el token fue robado, sigue válido hasta expirar.

2\. Revocar refresh tokens (lista blanca)	Guardas un registro de sesión (session\_id, tokenHash, user\_id, expires\_at). “Logout” ⇒ marcas la sesión como revoked.	• Crear tabla user\_sessions.

• Modificar LoginUC para guardar hash SHA-256 del refresh.

• Estrategia JwtRefreshStrategy compara el hash con la fila no revocada.

• Endpoint POST /auth/logout → marca la sesión como revocada.	✔ Invalida refresh robado.

✔ Auditoría de dispositivos.

✖ Access token sigue vivo hasta 15 min (mitigable bajando su TTL).

3\. Blacklist global en Redis	Cada logout mete el jti del access token en SETEX blacklist 15m. Un guard comprueba jti ∉ blacklist.	• Añadir claim jti (UUID) al firmar tokens.

• Guard JwtAuthGuard consulta Redis.

• logout guarda jti con TTL = tiempo restante.	✔ Invalida inmediato incluso el access token.

✖ Requiere Redis y una llamada extra en cada request.

Recomendación práctica

Combina 1 + 2 (lista blanca de refresh tokens + limpieza front):


Fin del lienzo

Este documento refleja con precisión la implementación actual del módulo de autenticación — **carpetas, clases, contratos, flujos y configuración**.
Cuando se añadan funciones nuevas (por ejemplo, verificación de correo)&#x20;
secciona y actualiza este lienzo para mantener la fuente de verdad al día.



# Lienzo de Diseño – **Módulo Users**

*Este lienzo recoge todo el micro‑dominio «Users» tal y como se ha implementado: árbol de carpetas, contratos, flujos y detalles de negocio. Es la única fuente de verdad para mantenimiento y futuras ampliaciones.*

---

## 1 · Propósito

Representar a la **persona real** (cuenta privada) y exponer un **perfil público** basado en su `activeCharacter`.

---

## 2 · Árbol de carpetas

```
modules/users/
├─ application/
│  ├─ ports/                # IUserRepository, IStoragePort
│  ├─ use-cases/            # UpdateProfile, ChangeActiveCharacter, GetPublicProfile
│  └─ users.service.ts      # façade
├─ domain/
│  ├─ dto/                  # update-profile.dto.ts, change-active-character.dto.ts, public-user.dto.ts
│  ├─ value-objects/        # username.vo.ts (futuro)
│  └─ entities/             # user.entity.ts (definida en módulo users)
└─ infrastructure/
    ├─ controllers/         # users.controller.ts
    ├─ repositories/        # user.repository.ts
    ├─ adapters/            # local-storage.adapter.ts
    └─ ... (guards reutilizados)
users.module.ts
```

---

## 3 · Entidad `User`

* PK `id` (uuid)
* Credenciales (`email` único, `passwordHash` BCrypt).
* Flags `isEmailVerified`, `isAdmin`, `isActive`.
* Relaciones: `characters[]`, `activeCharacter`, `guildMemberships[]`, `guildsLed[]`, `eventAttendances[]`.
* Getter `avatarUrl` → `activeCharacter.avatarUrl`.

---

## 4 · DTO

| DTO                          | Campos                                                             | Uso                         |
| ---------------------------- | ------------------------------------------------------------------ | --------------------------- |
| **UpdateProfileDto**         | `displayName?`, `locale?`, `avatarUrl?`                            | PATCH del propietario       |
| **ChangeActiveCharacterDto** | `characterId` (uuid)                                               | Cambiar máscara pública     |
| **PublicUserDto**            | `id`, `username`, `displayName?`, `avatarUrl?`, `activeCharacter?` | Respuesta para `/users/:id` |

---

## 5 · Ports

| Port                  | Métodos clave                                                                  |
| --------------------- | ------------------------------------------------------------------------------ |
| **`IUserRepository`** | `findById`, `findByUsername`, `save`, `getPublicProfile`, `setActiveCharacter` |
| **`IStoragePort`**    | `uploadAvatar(userId, buffer, mime)` → URL                                     |

---

## 6 · Adapters (infra)

| Adaptador             | Implementa        | Detalles                                            |
| --------------------- | ----------------- | --------------------------------------------------- |
| `UserRepository`      | `IUserRepository` | TypeORM, transacción en `setActiveCharacter`        |
| `LocalStorageAdapter` | `IStoragePort`    | Guarda en `uploads/avatars/`, sirve via `/static/…` |

---

## 7 · Use‑cases (orquestration layer)

| Use‑case                  | Paso a paso                                                                                                                                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **UpdateProfile**         | ① `users.findById` → 404 si no.<br>② Parchea campos dto.<br>③ Si `file` → `storage.uploadAvatar` → copia URL a `activeCharacter.avatarUrl`.<br>④ `users.save` (cascada).<br>⑤ `users.getPublicProfile` out. |
| **ChangeActiveCharacter** | ① `users.setActiveCharacter(userId,charId)` *(TX)*.<br>② `users.getPublicProfile` out.                                                                                                                      |
| **GetPublicProfileQuery** | proxy a `userRepo.getPublicProfile`.                                                                                                                                                                        |

---

## 8 · UsersService (façade)

Reúne los casos de uso y consulta para ser consumido por el **UsersController** y otros módulos.

---

## 9 · HTTP API

| Método | Ruta                         | Guard          | Acción                          |
| ------ | ---------------------------- | -------------- | ------------------------------- |
| `GET`  | `/users/me`                  | `JwtAuthGuard` | perfil propio (público)         |
| `PUT`  | `/users/me` *(multipart)*    | `JwtAuthGuard` | `UpdateProfile` (acepta avatar) |
| `PUT`  | `/users/me/active-character` | `JwtAuthGuard` | `ChangeActiveCharacter`         |
| `GET`  | `/users/:id`                 | —              | Público, `GetPublicProfile`     |

*Subida avatar*: `multipart/form-data` campo `avatar` (JPEG/PNG ≤ 2 MB).

---

## 10 · Módulo

```ts
@Module({
  imports: [TypeOrmModule.forFeature([User, Character]), AuthModule],
  controllers: [UsersController],
  providers: [
    { provide: 'USER_REPO', useClass: UserRepository },
    { provide: 'STORAGE',   useClass: LocalStorageAdapter },
    UpdateProfileUseCase, ChangeActiveCharacterUseCase,
    GetPublicProfileQuery, UsersService,
  ],
  exports: [UsersService],
})
```

---

## 11 · Flujos detallados

### 11.1 Actualizar perfil *(PUT /users/me)*

1. **Guard JWT** valida y añade `req.user.id`.
2. `multer` procesa `avatar` → buffer.<br>2bis. Si peso o MIME inválidos → 400.
3. **Controller** llama `usersService.updateProfile(id,dto,file)`.
4. **Use‑case** `UpdateProfile` sigue los pasos de la tabla §7.
5. Se devuelve `PublicUserDto` con nuevo avatar y displayName.

### 11.2 Cambiar personaje activo *(PUT /users/me/active-character)*

1. Guard JWT; Controller pasa id + dto.<br>2. `ChangeActiveCharacterUC` → repositorio TX.<br>3. Devuelve public profile con nuevo `activeCharacter`.

### 11.3 Consultar perfil público *(GET /users/\:id)*

1. No guard: ruta pública.<br>2. Repo devuelve proyección pública, cacheable.

---

## 12 · Errores comunes

| Código | Motivo                                      | Mensaje                                |
| ------ | ------------------------------------------- | -------------------------------------- |
| `400`  | Avatar > 2 MB o MIME ≠ PNG/JPEG             | `Invalid file type/size`               |
| `403`  | Usuario intenta cambiar char que no es suyo | `Forbidden character`                  |
| `404`  | Usuario o char no existen                   | `User not found / Character not found` |

---

## 13 · Checklist de seguridad

* **Avatar validation** evita SVG / scripts.
* **Locale** limitado a 10 chars.
* Transacción en `setActiveCharacter` previene estado incoherente.
* `passwordHash` nunca serializado.

---

### Mantén este lienzo actualizado

Cada vez que cambies reglas (p.ej. permitir cambio de e‑mail), añade la sección correspondiente para que el equipo tenga siempre la referencia correcta.






# Lienzo Completo: Módulo **Characters**

Este lienzo recoge la definición exhaustiva del micro‑dominio **Characters** en el backend de Larping & Go.

---

## 1 · Propósito y Contexto

El micro‑dominio **Characters** gestiona la creación, consulta y edición de personajes LARP. Cada usuario puede tener múltiples personajes, con:

* Propiedades estructuradas (físicas, sociales, general, relaciones y personalizadas).
* Avatar subido.
* Estado de visibilidad y soft‑delete.

Se integra con **UsersModule** para autenticación y **IStoragePort** para subida de avatares.

---

## 2 · Estructura del Módulo

```
modules/characters/
├── application/
│   ├── characters.service.ts
│   ├── ports/
│   │   └── i-character.repository.ts
│   ├── use-cases/
│   │   ├── create-character.use-case.ts
│   │   ├── update-character.use-case.ts
│   │   ├── delete-character.use-case.ts
│   │   ├── list-characters.use-case.ts
│   │   ├── list-character-properties.use-case.ts
│   │   ├── upsert-property.use-case.ts
│   │   ├── remove-property.use-case.ts
│   │   ├── upload-avatar.use-case.ts
│   │   └── get-public-character.use-case.ts
│   └── dto/
│       ├── create-character.dto.ts
│       ├── update-character.dto.ts
│       ├── character-property.dto.ts
│       ├── public-character.dto.ts
│       └── change-avatar.dto.ts
├── domain/
│   ├── entities/
│   │   ├── character.entity.ts
│   │   └── character-property.entity.ts
│   └── value-objects/
│       └── slug.vo.ts
├── infrastructure/
│   ├── controllers/
│   │   └── characters.controller.ts
│   ├── repositories/
│   │   └── character.repository.ts
│   └── providers/
│       └── default-properties.provider.ts
└── characters.module.ts
```

---

## 3 · Modelo de Dominio

### `Character`

* **Campos**: `id`, `user` (dueño), `name`, `slug`, `avatarUrl`, `bio`, `backstory`, `visibility`, `isActive`, timestamps.
* **Relación**: 1‑N con `CharacterProperty`.
* **Hooks**: `@BeforeInsert()` genera `slug` por defecto.
* **Serialización**: Getter `publicProfile` con `@Expose()`.

### `CharacterProperty`

* **Campos**: `id`, FK `character_id`, `group` (physical|social|general|relation|custom), `key` (snake\_case), `value` (JSON nullable), `valueType` (text|number|boolean|list), `order`, timestamps.
* **Índice**: único `(character, key)`.

---

## 4 · DTOs

* **CreateCharacterDto**: `name`, `bio?`, `backstory?`, `visibility?`, `properties?[]`.
* **UpdateCharacterDto** = `PartialType(CreateCharacterDto)`.
* **CharacterPropertyDto**: `group`, `key`, `value`, `valueType`, `order?`.
* **PublicCharacterDto**: `id`, `name`, `slug`, `avatarUrl?`, `bio?`, `properties?[]`.
* **ChangeAvatarDto**: `avatarUrl`.

---

## 5 · Value Object: **Slug**

```ts
class Slug {
  static create(raw: string): Slug; // valida regex ^[a-z0-9-]{2,80}$
  toString(): string;
}
```

Garantiza identificador URL‑friendly.

---

## 6 · Puertos (Ports)

* **ICharacterRepository**:

  * Lectura: `listByUser`, `findById`, `findBySlug`, `existsNameForUser`.
  * Escritura: `create`, `save`, `softDelete`.
  * Propiedades: `upsertProperty`, `removeProperty`.
  * Proyección: `project`.

* **IStoragePort** (de UsersModule): `uploadAvatar(id, buffer, mime): Promise<string>`.

* **IDefaultCharacterPropertiesProvider**: `getDefaults(): CharacterPropertyDto[]`.

---

## 7 · Infraestructura

### CharacterRepository

* **Lectura**: `.find()` con `relations: { properties }`.
* **Transacción**: en `upsertProperty` usando `ds.transaction(async manager)`.
* **Soft‑delete**: marca `isActive = false`.
* **project()**: construye `PublicCharacterDto`.

### DefaultPropertiesProvider

Carga `DEFAULT_CHARACTER_PROPERTIES` con `value = null` y `order`.

---

## 8 · Casos de Uso (Use-Cases)

1. **CreateCharacterUseCase**
2. **UpdateCharacterUseCase**
3. **DeleteCharacterUseCase**
4. **ListCharactersUseCase**
5. **ListCharacterPropertiesUseCase**
6. **UpsertPropertyUseCase**
7. **RemovePropertyUseCase**
8. **UploadAvatarUseCase**
9. **GetPublicCharacterUseCase**

Cada uno inyecta repositorio y, si aplica, provider de defaults o storage.

---

## 9 · Facade: `CharactersService`

Métodos:

* `createCharacter(userId, dto)`
* `updateCharacter(id, dto)`
* `deleteCharacter(id)`
* `listMyCharacters(userId)`
* `listProperties(userId, charId)`
* `upsertProperty(id, dto)`
* `removeProperty(id, pid)`
* `uploadAvatar(id, buffer, mime)`
* `getPublicCharacter(slug)`

---

## 10 · Controlador HTTP

| Ruta                                     | Método | Guard        | Body / Params           |
| ---------------------------------------- | ------ | ------------ | ----------------------- |
| POST `/characters`                       | create | JwtAuthGuard | CreateCharacterDto      |
| GET  `/characters/me`                    | list   | JwtAuthGuard | —                       |
| GET  `/characters/:slug`                 | public | none         | slug                    |
| PUT  `/characters/:id`                   | update | JwtAuthGuard | UpdateCharacterDto      |
| DELETE `/characters/:id`                 | delete | JwtAuthGuard | id                      |
| GET  `/characters/:id/properties`        | props  | JwtAuthGuard | id                      |
| POST `/characters/:id/properties`        | upsert | JwtAuthGuard | CharacterPropertyDto    |
| DELETE `/characters/:id/properties/:pid` | remove | JwtAuthGuard | id, pid                 |
| PUT  `/characters/:id/avatar`            | upload | JwtAuthGuard | multipart `avatar` file |

---

## 11 · Flujos Paso a Paso

### Crear Personaje

1. **Controller** recibe JSON + JWT.
2. **Service** → `createUC.execute(userId, dto)`.
3. **Use-Case**:

   * Verifica user y unicidad.
   * Combina defaults + `dto.properties`.
   * Persiste con cascade.
4. **Repo** guarda `characters` + `character_properties`.
5. **Respuesta**: `PublicCharacterDto`.

### Listar Propiedades

1. **Controller** GET `/…/properties`.
2. **Service** → `listPropsUC.execute(userId, charId)`.
3. **Use-Case**: verifica dueño, devuelve `properties[]`.

*(Update, Delete y demás siguen patrón Controller → Service → UC → Repo)*

---

## 12 · Ejemplos cURL

```bash
# Crear con defaults + override
curl -X POST http://…/characters \
  -H "Authorization: Bearer $TK" \
  -H "Content-Type: application/json" \
  -d '{"name":"Legolas","properties":[{"group":"general","key":"gender","value":"Masculino","valueType":"text"}]}'

# Listar mis personajes
curl http://…/characters/me -H "Authorization: Bearer $TK"

# Listar propiedades
echo
curl http://…/characters/<CHAR_ID>/properties -H "Authorization: Bearer $TK"
```

---

## 13 · Datos Clave

* **Default Properties** inyectadas por `DEFAULT_PROPS`.
* **Formato de key**: snake\_case alfanumérico.
* **Sin campo attributes**: todo va en `character_properties`.
* **Avatares**: servidos desde `/static/avatars/<filename>`.

---

## 14 · Errores Comunes

* **404**: personaje no existe.
* **403**: acceso a personaje ajeno.
* **409**: nombre duplicado.
* **413**: avatar >2 MB.

---









# 📚 Lienzo Integral del Micro‑Dominio **Guilds (Hermandades)** · Larping & Go

> Documento vivo que centraliza **visión, reglas, entidades, flujos y API** del módulo *Guilds*. Se actualiza conforme avanzan las fases del desarrollo.

---

## 1 · Propósito

Crear una capa robusta para la **gestión de hermandades**, que permita:

* Estructurar la comunidad mediante **roles jerárquicos con permisos**.
* Gestionar **membresías** (invitaciones, solicitudes, códigos de acceso).
* Ofrecer herramientas sociales internas: **tablón** (anuncios / encuestas), **eventos** y, en un futuro, **chat en tiempo real**.

---

## 2 · Modelo de Entidades y Relaciones

| Entidad                                                      | Rol                                                                                                       | Relaciones clave                                                                                  |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Guild**                                                    | Agregado raíz. Datos públicos, reglas, privacidad y líder.                                                | 1 \:N `GuildRole`, 1 \:N `GuildMembership`, 1 \:N `GuildAnnouncement`, 1 \:N `GuildInternalEvent` |
| **GuildRole**                                                | Rol personalizado (`position`, `permissions`).                                                            | N : 1 `Guild`                                                                                     |
| **GuildMembership**                                          | Une **User** y **Guild** mediante un **GuildRole** + `status` (`pending` / `active` / `kicked` / `left`). | N : 1 `Guild`, N : 1 `User`, N : 1 `GuildRole`                                                    |
| **GuildInvite**                                              | Invitaciones / solicitudes de acceso.                                                                     | N : 1 `Guild`, N : 1 `User` (sender)                                                              |
| **GuildAnnouncement**                                        | Publicaciones de tablón (`general` / `poll`).                                                             | N : 1 `Guild`, 1 \:N `GuildPollOption`, 1 \:N `GuildVote`                                         |
| **GuildInternalEvent**                                       | Eventos internos (entrenos, reuniones).                                                                   | N : 1 `Guild`, 1 \:N `GuildEventAttendance`                                                       |
| **GuildPollOption**, **GuildVote**, **GuildEventAttendance** | Soporte para encuestas y asistencia.                                                                      | —                                                                                                 |

### 2.1 Diagrama lógico resumido

```
users ─╴< guild_memberships >╶─ guilds ─╶< guild_roles
                           ╰─< guild_announcements >─╶< guild_poll_options >╶─< guild_votes
                           ╰─< guild_internal_events >╶< guild_event_attendance
                           ╰─< guild_invites
```

---

## 3 · Sistema de Roles y Permisos

Bit‑mask (`int`, 0 – 6):

| Bit | Valor   | Permiso                | Descripción breve                |
| --- | ------- | ---------------------- | -------------------------------- |
|  0  |  1      | **EDIT\_INFO**         | Editar datos de la guild         |
|  1  |  2      | **MANAGE\_MEMBERS**    | Aceptar / expulsar miembros      |
|  2  |  4      | **MANAGE\_ROLES**      | Editar roles inferiores          |
|  3  |  8      | **POST\_ANNOUNCEMENT** | Publicar en el tablón            |
|  4  |  16     | **CREATE\_EVENTS**     | Crear eventos internos           |
|  5  |  32     | **CHAT**               | Enviar mensajes en chat (futuro) |
|  6  |  64     | **CREATE\_ROLES**      | Crear nuevos roles               |
|  —  | **127** | **ALL**                | Permisos completos (rol Líder)   |

---

## 4 · Arquitectura de Carpetas (DDD)

```
guilds
├─ domain
│   ├─ entities      (Guild, GuildRole, GuildMembership …)
│   └─ dto           (create-guild.dto, guild-details.dto …)
├─ application
│   ├─ ports         (i-guild.repository.ts)
│   ├─ use-cases     (CreateGuildUseCase, UpdateGuildUseCase …)
│   ├─ queries       (GetGuildPublicQuery, GetGuildInternalQuery …)
│   └─ guilds.service.ts ← façade
├─ infrastructure
│   ├─ repositories  (guild.repository.ts)
│   ├─ controllers   (guilds.controller.ts)
│   └─ guards & decorators (GuildMemberGuard, GuildPermissionsGuard …)
└─ guilds.module.ts
```

---

## 5 · Flujos implementados (Fases 0 – 2 ✅)

| Caso de uso              | Paso a paso                                                                                                                                                                                                             | Regla destacada                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **Crear guild**          | 1) Auth → `userId`. 2) `CreateGuildUC` valida unicidad `name`. 3) Construye `Guild` + rol **Líder** (`position 0`, perms = ALL). 4) Transacción: guarda guild → rol → membership líder (`memberCount = 1`).             | El rol Líder es único (`is_leader = true`) e inmutable. |
| **Listado público**      | `ListGuildsQuery` filtra `isActive = TRUE` & `privacy = PUBLIC`, orden `memberCount DESC`, búsqueda `ILIKE('%q%')`.                                                                                                     | Search simple; se añadirá full‑text index.              |
| **Perfil público**       | `GetGuildPublicQuery` → slug → DTO público.                                                                                                                                                                             | Sólo guilds activas y públicas.                         |
| **Actualizar guild**     | `PUT /guilds/:id` protegido. `UpdateGuildUC` requiere `EDIT_INFO` o ser Líder. Valida unicidad, gestiona `privacy` / `accessType` / `accessCode` (SHA‑256) y responde con **GuildDetailsDto** (sin filtrar privacidad). | `accessType = code` ⇒ `accessCode` obligatorio.         |
| **Soft‑delete guild**    | `DELETE /guilds/:id` — solo Líder. `DeleteGuildUC` marca `isActive = false`.                                                                                                                                            | La guild deja de aparecer en buscador público.          |
| **Transferir liderazgo** | `PATCH /guilds/:id/leader` — Líder designa `newLeaderUserId`. `TransferLeadershipUC` verifica membresía activa y transfiere `leader_user_id` + rol líder.                                                               | Siempre hay un único Líder (`position 0`).              |

---

## 6 · Endpoints REST actuales

| Método & ruta               | Autenticación                 | Descripción                                  |
| --------------------------- | ----------------------------- | -------------------------------------------- |
| `POST   /guilds`            | JWT                           | Crear hermandad                              |
| `GET    /guilds`            | —                             | Listar hermandades públicas (`?q=` opcional) |
| `GET    /guilds/:slug`      | —                             | Perfil público de una guild                  |
| `PUT    /guilds/:id`        | JWT + miembro con `EDIT_INFO` | Actualizar datos internos                    |
| `DELETE /guilds/:id`        | JWT + Líder                   | Desactivar (soft‑delete)                     |
| `PATCH  /guilds/:id/leader` | JWT + Líder                   | Transferir liderazgo                         |

---

## 7 · Roadmap (Próximas fases)

| Fase  | Tema                                                | Permisos requeridos             |
| ----- | --------------------------------------------------- | ------------------------------- |
| **3** | CRUD de roles & asignación                          | `MANAGE_ROLES` / `CREATE_ROLES` |
| **4** | Flujos de membresía (invites, kick, leave)          | `MANAGE_MEMBERS`                |
| **5** | Tablón (anuncios & polls)                           | `POST_ANNOUNCEMENT`             |
| **6** | Eventos internos & asistencia                       | `CREATE_EVENTS`                 |
| **7** | Cron para expiración de invitaciones + enlace‑token | —                               |

---

## 8 · Reglas de negocio clave

1. **Jerarquía de roles** — Un miembro sólo gestiona roles con `position` mayor (rango inferior).
2. **Rol Líder** — Único, inmutable; sólo el Líder puede transferir liderazgo.
3. **Contador `memberCount`** — Se actualizará vía trigger cuando cambie el número de miembros (pendiente Fase 4).
4. **Privacy & Access** — `privacy = PRIVATE` oculta la guild en búsquedas; `accessType` define el flujo de entrada (*public / invite / code*).
5. **Soft‑delete** — `isActive = false` desactiva la guild sin perder historial.

---

## 9 · Historial de actualizaciones

| Fecha       | Cambios                                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 27 may 2025 | **Fase 2 completada**: actualización, soft‑delete y transferencia de liderazgo; guards de permisos; Query interna sin filtro de privacidad. |
| 23 may 2025 | Fase 0‑1 (bootstrap + CRUD mínimo + listado & perfil público).                                                                              |

---

> **Estado actual:** Fases 0–2 terminadas y operativas. Siguiente objetivo → **Fase 3: sistema avanzado de roles personalizados.**






# 🗂️ Lienzo del Micro‑Dominio **Guilds** – Fase 3 📜

### Sistema de Roles Personalizados

> Versión 1.0 · 27 may 2025

---

## 1 · Alcance de la fase

Implementar un sistema completo de **roles jerárquicos** dentro de la guild:

* CRUD de roles (excepto el rol *Líder*, reservado).
* Desplazamiento automático de posiciones para mantener la jerarquía y la clave única `(guild_id, position)`.
* Asignación/cambio de rol a miembros activos.
* Validaciones de permisos (`CREATE_ROLES`, `MANAGE_ROLES`, `MANAGE_MEMBERS`).
* Actualización de guards y endpoints.

---

## 2 · Entidades afectadas

| Entidad             | Cambios / Notas                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **GuildRole**       | ▶ Nuevo algoritmo de re‑orden: posición *centinela* → shift → destino.<br>▶ Método de utilidad `hasPermission()` ya existente. |
| **GuildMembership** | ▶ `role` ahora puede cambiar vía `AssignRoleUseCase` manteniendo integridad.                                                   |

---

## 3 · Métodos añadidos al repositorio

| Firma                                                          | Descripción                                                      |
| -------------------------------------------------------------- | ---------------------------------------------------------------- |
| `listRoles(guildId)`                                           | Devuelve roles ordenados por `position`.                         |
| `createRole(role)` / `updateRole(role)` / `deleteRole(roleId)` | CRUD básico.                                                     |
| `shiftRolePositions(guildId, from, to, excludeId)`             | Desplaza un bloque de posiciones `±1` dentro de una transacción. |
| `updateRolePosition(roleId, newPos)`                           | Paso intermedio al mover un rol.                                 |
| `roleExistsByName / roleExistsByPosition`                      | Validaciones de unicidad.                                        |
| `findRoleById(roleId)`                                         | Recupera rol + relación `guild`.                                 |
| `roleHasMembers(roleId)`                                       | Bloquea la eliminación si el rol está asignado.                  |

---

## 4 · DTO y validaciones

* **CreateRoleDto** — nombre (2‑40), color HEX, posición ≥1, permisos 0‑127.
* **UpdateRoleDto** — `PartialType` del anterior.
* **AssignRoleDto** — `memberId`, `roleId` (UUID).

---

## 5 · Casos de Uso (resumen)

| UC               | Permiso          | Regla clave                                                                    |
| ---------------- | ---------------- | ------------------------------------------------------------------------------ |
| **CreateRoleUC** | `CREATE_ROLES`   | Solo bajo tu rango; nombre & posición únicas.                                  |
| **UpdateRoleUC** | `MANAGE_ROLES`   | Rol objetivo debe estar bajo tu rango; algoritmo de desplazamiento automático. |
| **DeleteRoleUC** | `MANAGE_ROLES`   | Prohíbe borrar líder o roles con miembros.                                     |
| **AssignRoleUC** | `MANAGE_MEMBERS` | No puedes asignar roles ≥ tu rango.                                            |

---

## 6 · Guards y decorador reutilizados

* `JwtAuthGuard`  → token válido.
* `GuildMemberGuard` → adjunta `req.guildMembership`.
* `GuildPermissionsGuard` + `@GuildPermissions(...)` → comprueba bits contra rol o líder.

---

## 7 · Endpoints REST añadidos

| Método & ruta                      | Permiso          | Descripción                              |
| ---------------------------------- | ---------------- | ---------------------------------------- |
| `POST   /guilds/:id/roles`         | `CREATE_ROLES`   | Crea un rol personalizado.               |
| `GET    /guilds/:id/roles`         | Miembro          | Lista roles ordenados.                   |
| `PUT    /guilds/:id/roles/:roleId` | `MANAGE_ROLES`   | Edita rol (nombre/color/perms/posición). |
| `DELETE /guilds/:id/roles/:roleId` | `MANAGE_ROLES`   | Elimina rol (si sin miembros).           |
| `PATCH  /guilds/:id/roles/assign`  | `MANAGE_MEMBERS` | Cambia el rol de un miembro activo.      |

---

## 8 · Flujo de re‑ordenamiento automático

```text
1. Cliente solicita mover Rol C de posición 4 → 2.
2. UC mueve Rol C a posición centinela (10 000) para liberar la clave.
3. `shiftRolePositions` incrementa (+1) posiciones 2‑3‑4 → 3‑4‑5.
4. Rol C se establece finalmente en posición 2.
```

> Así se evita la colisión con el índice único `ux_role_position`.

---

## 9 · Reglas de negocio añadidas

1. **Posición 0** está reservada al *rol Líder* (`isLeader=true`); es inmutable.
2. La **jerarquía** se define sólo por `position` (menor ⇒ mayor rango).
3. Cada operación comprueba que `role.position > currentMember.position`, salvo si
   el solicitante es líder (bypass completo).
4. No se permiten “agujeros” tras re‑ordenar; el shift mantiene la secuencia.

---

## 10 · Próximos pasos

| Fase  | Tema                                                    |
| ----- | ------------------------------------------------------- |
| **4** | Flujos de membresía (invites, solicitudes, kick, leave) |
| **5** | Tablón interno (anuncios, encuestas)                    |
| **6** | Eventos internos y asistencia                           |
| **7** | Cron expiración de invitaciones + enlace token          |

---

### Última actualización · 27 may 2025






# Larping & Go · Backend

## Micro‑dominio Guilds · **Fase 4 – Flujos de membresía**

Versión 2025‑05‑30

---

### 🎯 Propósito

Implementar el ciclo de vida completo de los **miembros de hermandad**:

* Solicitud de acceso, invitación directa, invitación por enlace.
* Aceptación / rechazo / cancelación.
* Unirse con token público.
* Expulsión (kick) y salida voluntaria (leave).
* Mantenimiento consistente de `memberCount` y jerarquía de roles.

---

### 1. Entidades y cambios

| Entidad                 | Cambios clave                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **`guild_invites`**     | Relaciones `senderUser`, `targetUser` ahora se cargan en queries.<br>Validaciones por tipo (`invite` / `request`). |
| **`guild_memberships`** | Nuevo método `findMembershipAny` para reactivar filas *kicked/left* y evitar violar `ux_gm_user_guild`.            |
| **`guild_roles`**       | Helper `findLowestRole` y creación on‑the‑fly de rol «Miembro» si sólo existe el líder.                            |

---

### 2. Repositorio (`GuildRepository`)

* **Invites** `createInvite`, `updateInvite`, `findInviteById`, `findInviteByHash`, `listPendingInvites` (con relaciones).
* **Memberships** `createMembership`, `updateMembership`, `findMembershipAny`, `listMembers`, `countActiveMembers`.
* **Roles** `findLowestRole`, `createRole` (uso interno al reactivar miembros).

---

### 3. Casos de uso

| UC                | Responsable  | Descripción                                                                                                 |
| ----------------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| `RequestJoinUC`   | Usuario      | Crea `guild_invite` tipo *request* si la guild lo permite.                                                  |
| `JoinByCodeUC`    | Usuario      | Comprueba `accessCodeHash`, reactiva o crea membership activa.                                              |
| `SendInviteUC`    | Moderador    | Envía invitación directa (`invite`) o por email. Sólo `MANAGE_MEMBERS`.                                     |
| `HandleInviteUC`  | Moderador    | Gestiona *request* (`accepted/rejected`) o cancela *invite*.<br>Reactiva/crea membership y ajusta contador. |
| `RespondInviteUC` | Destinatario | Acepta / rechaza *invite* directa. Reactiva/crea membership.                                                |
| `KickMemberUC`    | Moderador    | Cambia `status → kicked`, `leftAt`, contador −1.                                                            |
| `LeaveGuildUC`    | Miembro      | Cambia `status → left`, valida que no sea líder.                                                            |

---

### 4. Endpoints REST

```
POST   /guilds/:id/requests             (user)           # RequestJoinUC
POST   /guilds/:id/join/:token          (user)           # JoinByCodeUC
GET    /guilds/:id/invites              (moderator)      # listPendingInvites
POST   /guilds/:id/invites              (moderator)      # SendInviteUC
PATCH  /guilds/:id/invites/:invId       (moderator)      # HandleInviteUC
PATCH  /guilds/:id/invites/:invId/respond (target user)  # RespondInviteUC
GET    /guilds/:id/members              (member)         # listMembers
DELETE /guilds/:id/members              (moderator)      # KickMemberUC (body: memberId)
DELETE /guilds/:id/leave                (member)         # LeaveGuildUC
```

*Protección*: `JwtAuthGuard` global; `GuildMemberGuard` donde aplique;
`GuildPermissionsGuard` con bit `MANAGE_MEMBERS` para endpoints de gestión.

---

### 5. Reglas de negocio

* Índice único `(user_id, guild_id)` se respeta reactivando registros.
* El **líder** no puede ser expulsado ni abandonar sin transferir liderazgo.
* `memberCount ≥ 1`; incrementa/decrementa en UCs y se puede reforzar con trigger.
* Invitación **directa** sólo puede cancelarla el moderador, aceptarla el destinatario.
* Petición **request** sólo la gestiona el moderador (`accepted/rejected`).
* En guilds con sólo el rol líder se autogenera «Miembro» posición 1.

---

### 6. Cron de expiración

Tarea horaria marca `status = expired` cuando `now() > expires_at` y `pending`.

---

### 7. Pruebas esenciales

1. Kick → invitation → accept → **reactiva** membership y contador correcto.
2. Invitación directa aceptada por otro usuario ⇒ *Forbidden*.
3. Solicitud aceptada por moderador crea miembro y +1.
4. `memberCount` coincide con `SELECT COUNT(*) WHERE status='active'`.

---

### 8. Pendientes futuros

* Notificación por correo al enviar invitación `email`.
* Eventos WebSocket para avisos en tiempo real (invitaciones, kicks).
* Página de ajustes para desactivar solicitudes públicas.

---

*Fase 4 completada. Listo para integrar en README principal.*

### 🔬 Casos de prueba exhaustivos

| #  | Escenario                                        | Precondición                                                        | Pasos                                                                                                                              | Resultado esperado                                                  |
| -- | ------------------------------------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1  | **Solicitud → Aceptada**                         | User *A* no es miembro                                              | 1. A envía `POST /guilds/{id}/requests`<br>2. Moderador *M* (`MANAGE_MEMBERS`) `PATCH /invites/{reqId}` body `{status:'accepted'}` | Invite → `accepted` · Membership `active` para A · `memberCount` +1 |
| 2  | **Solicitud → Rechazada**                        | Igual a #1                                                          | 1. A envía request<br>2. M `PATCH` `{status:'rejected'}`                                                                           | Invite → `rejected` · Sin membership · `memberCount` sin cambios    |
| 3  | **Invitación directa → Aceptada**                | A no es miembro                                                     | 1. M `POST /invites` `{targetUserId:A}`<br>2. A `PATCH /invites/{id}/respond` `{accept:true}`                                      | Invite → `accepted` · Membership `active` para A · `memberCount` +1 |
| 4  | **Invitación directa → Rechazada**               | Igual a #3                                                          | 2. A responde `{accept:false}`                                                                                                     | Invite → `rejected` · `memberCount` sin cambios                     |
| 5  | **Invitación directa → Cancelada por moderador** | Invitación pendiente                                                | M `PATCH /invites/{id}` `{status:'cancelled'}`                                                                                     | Invite → `cancelled`                                                |
| 6  | **Link público (TOKEN) → Alta**                  | Guild accessType=`code` · A no es miembro                           | A `POST /join/{token}`                                                                                                             | Membership `active` · `memberCount` +1                              |
| 7  | **Kick**                                         | A es miembro (rol posición 3), M rol 1                              | M `DELETE /members` body `{memberId:A}`                                                                                            | Membership status `kicked` · `memberCount` -1                       |
| 8  | **Re‑invitar Kickeado**                          | A status `kicked`                                                   | M re‑invita (#3) → A acepta                                                                                                        | Membership reactivada (misma fila) · `memberCount` +1               |
| 9  | **Leave**                                        | A rol >0                                                            | A `DELETE /leave`                                                                                                                  | Membership `left` · `memberCount` -1                                |
| 10 | **Leader cannot leave**                          | L es líder                                                          | L `DELETE /leave`                                                                                                                  | 403 Forbidden                                                       |
| 11 | **Member cannot kick higher rank**               | B rol pos 2, A rol pos 1                                            | B intenta kick A                                                                                                                   | 403 Forbidden                                                       |
| 12 | **Moderator cannot accept own invite**           | M envía invite a C, intenta `PATCH accepted`                        | 403 Forbidden (`Sólo cancelar`)                                                                                                    |                                                                     |
| 13 | **Expired invite**                               | Invite con `expiresAt` < now                                        | Cron marca `expired`                                                                                                               | Token falla con 403                                                 |
| 14 | **Counter integrity**                            | Comparar `guild.memberCount` con `COUNT(*)` de memberships `active` | Siempre igual (trigger opcional)                                                                                                   |                                                                     |

> **Cobertura**: solicitudes, invitaciones directas, enlaces, re‑ingresos tras kick, privilegios jerárquicos, contador.





# Micro‑dominio **Guilds** · Fase 5 — Announcements & Polls

## 0. Visión

Permitir a cada hermandad publicar anuncios (texto libre) y encuestas (polls) en un tablón interno accesible sólo a sus miembros.

* **Announcements** (`type = general`) → simple entrada de texto.
* **Polls** (`type = poll`) → colección de opciones con recuento de votos.

La fase cubre:

1. CRUD completo de anuncios/encuestas.
2. Votación con reglas (multi‑select, maxChoices).
3. Paginación real del tablón.
4. Cierre automático de encuestas mediante cron.
5. Endpoint de detalle (incluye resultados y votos propios).
6. Hooks opcionales vía WebSockets.

---

## 1. Modelo de datos

### 1.1 `guild_announcements`

| Campo                     | Tipo                                        | Notas |
| ------------------------- | ------------------------------------------- | ----- |
| id                        | uuid PK                                     |       |
| guild\_id                 | FK → guilds.id                              |       |
| author\_user\_id          | FK → users.id ( NULL SET )                  |       |
| author\_character\_id     | FK → characters.id ( NULL )                 |       |
| title                     | varchar(120)                                |       |
| content                   | text                                        |       |
| **type**                  | enum `general \| poll`                      |       |
| close\_at                 | timestamptz NULL (solo poll)                |       |
| show\_results             | boolean default true                        |       |
| multi\_select             | boolean default false                       |       |
| max\_choices              | int NULL (≥2)                               |       |
| **is\_closed**            | boolean default false *(añadido en Fase 5)* |       |
| created\_at / updated\_at |                                             |       |

#### Restricciones

* CHECK: `(type='poll' AND close_at IS NOT NULL) OR (type='general' AND close_at IS NULL)`
* Índices: `ix_ga_type`, `ix_ga_guild_created`, `ix_ga_closed`.

### 1.2 `guild_poll_options`

| Campo            | Tipo                                 | Detalle |
| ---------------- | ------------------------------------ | ------- |
| id               | uuid PK                              |         |
| announcement\_id | FK → guild\_announcements.id         |         |
| option\_text     | varchar(120)                         |         |
| position         | int (0,1,2…)                         |         |
| votes\_count     | int DEFAULT 0 *(trigger o servicio)* |         |

### 1.3 `guild_votes`

Sin cambios (ya definido). Índice único `(poll_option_id,user_id)`.

---

## 2. API REST

| Método     | Ruta                               | Guardias                                                  | Descripción                                                                                               |
| ---------- | ---------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **POST**   | `/guilds/:id/board`                | `Jwt`,`GuildMember`,`GuildPermissions(POST_ANNOUNCEMENT)` | Crea anuncio/poll.                                                                                        |
| **GET**    | `/guilds/:id/board?page=N`         | `Jwt`,`GuildMember`                                       | Listado paginado (20 por pág., devuelve meta `{page,perPage,total,totalPages}`)                           |
| **GET**    | `/guilds/:id/board/:annId`         | `Jwt`,`GuildMember`                                       | Detalle anuncio. Incluye resultados/votos propios según reglas.                                           |
| **PUT**    | `/guilds/:id/board/:annId`         | `Jwt`,`GuildMember`                                       | Autor **o** permiso `POST_ANNOUNCEMENT`. Permite convertir `general⇄poll`, editar reglas si no hay votos. |
| **DELETE** | idem                               |                                                           | Borra anuncio/poll.                                                                                       |
| **POST**   | `/guilds/:id/board/:annId/votes`   | `Jwt`,`GuildMember`                                       | Emite voto(s) respetando reglas (`multiSelect`, `maxChoices`, `is_closed`).                               |
| **GET**    | `/guilds/:id/board/:annId/results` | `Jwt`,`GuildMember`                                       | Resultado encuesta (‐→ `GetPollResultsUseCase`).                                                          |

---

## 3. Casos de uso principales

| UC                           | Fichero                                           | Resumen                                                                                               |
| ---------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `CreateAnnouncementUseCase`  | `use-cases/board/create-announcement.use-case.ts` | Valida campos, crea anuncio. En polls exige ≥2 opciones y `closeAt` futura.                           |
| `ListAnnouncementsQuery`     | `queries/board/list-announcements.query.ts`       | Devuelve paginación real (SQL `LIMIT/OFFSET`, `COUNT(*)`).                                            |
| `GetAnnouncementDetailQuery` | `queries/board/get-announcement-detail.query.ts`  | Proyección completa + votos propios.                                                                  |
| `UpdateAnnouncementUseCase`  | `use-cases/board/update-announcement.use-case.ts` | Autor/moderador puede convertir tipo, cambiar reglas u opciones (solo si no hay votos).               |
| `DeleteAnnouncementUseCase`  | …                                                 |                                                                                                       |
| `VotePollUseCase`            | `use-cases/board/vote.use-case.ts`                | Bloquea si `isClosed` o `closeAt ≤ now`. Controla `multiSelect` y `maxChoices`. Actualiza contadores. |
| `GetPollResultsUseCase`      | `use-cases/board/get-poll-results.use-case.ts`    | Aplica reglas de visibilidad (`showResults` o `isClosed` o permisos).                                 |
| `CloseExpiredPollsJob`       | `jobs/close-expired-polls.job.ts`                 | Cron (30 min) ‑→ `findExpiredOpenPolls(now)` → `closePoll(id)` → (opcional) notifica vía gateway.     |

---

## 4. Repositorio (`GuildRepository`)

* **Nuevos métodos**

  * `findAnnouncementWithOptions`, `findExpiredOpenPolls`, `closePoll`, `countVotesByOption`, `deletePollOptions`, `deleteVotesByAnnouncement`, `findVotesByUser`.
* Se añaden `@InjectRepository(GuildVote)` y utilidades `LessThan`.

---

## 5. Permisos & reglas

* Crear / editar / borrar requiere `POST_ANNOUNCEMENT` **o** ser autor original.
* Votar: miembro activo, encuesta no cerrada.
* Ver resultados

  * `showResults = true` **o** `isClosed = true` **o** rol con `POST_ANNOUNCEMENT`.
* Conversión `poll→general` sólo si `countVotesByOption = 0`.

---

## 6. Cron‑flow (encuestas caducadas)

1. Job corre cada 30 min.
2. Selecciona polls con `isClosed=false AND closeAt < now`.
3. Marca `isClosed=true`, deja `showResults` intacto.
4. Envía evento `poll.closed` (si gateway activo).

---

## 7. WebSockets (opcional)

* **Channel**: `guild:{guildId}`.
* Eventos: `announcement.created/updated/deleted`, `poll.voted`, `poll.closed`.
* Gateway (`GuildBoardGateway`) usa `@WebSocketGateway({ namespace:'/guilds' })`.

---

## 8. Migraciones SQL

```sql
-- F5‑01 add is_closed
ALTER TABLE guild_announcements
ADD COLUMN is_closed boolean NOT NULL DEFAULT false;
CREATE INDEX ix_ga_closed ON guild_announcements (is_closed);
```

(Opcional gatillo para actualizar `votes_count` en `guild_poll_options` al INSERT/DELETE en `guild_votes`).

---

## 9. Casos de prueba principales

1. **Crear general**, listar pag‑1, pag‑2 → correcta paginación.
2. **Convertir** general⇄poll (sin votos) → OK.
3. **Intentar convertir** poll→general con votos → 403.
4. **Votar** más de `maxChoices` → 400.
5. **Resultados ocultos** antes de cierre (`showResults=false`) → votos=0.
6. Job marca `isClosed=true`; resultados accesibles.

---

## 10. Tareas pendientes

* Implementar gateway tiempo‑real (si se desea).
* Notificación email/WebPush tras cierre de encuesta.
* Paginación configurable (`perPage` query‑param).

---

Fase 5 queda **cerrada**: el micro‑dominio cuenta con flujo completo de anuncios y encuestas, reglas de permisos exhaustivas, paginación, cron de cierre y DTOs consistentes para el front‑end.

---

## 11. Plan de pruebas y ejemplos Postman

A continuación se integran los casos de prueba manuales y automatizados elaborados durante la fase 5. Incluyen comandos *curl* / colecciones Postman para verificar permisos, reglas de negocio y respuesta de cada endpoint.

### 11.1 Matriz de casos

| ID   | Endpoint                | Escenario                        | Auth        | Resultado esperado     |
| ---- | ----------------------- | -------------------------------- | ----------- | ---------------------- |
| T‑1  | **POST** `/board`       | Crear anuncio *general*          | `TK_MOD`    | **201** – JSON anuncio |
| T‑2  | ↓                       | Crear anuncio sin permiso        | `TK_MEMBER` | **403**                |
| T‑3  | ↓                       | Crear *poll* falta `closeAt`     | `TK_MOD`    | **400**                |
| T‑4  | **PUT** `/board/:annId` | Cambiar `content` (autor)        | `TK_MEMBER` | **200**                |
| T‑5  | ↓                       | Cambiar `options` con votos      | `TK_MOD`    | **400**                |
| T‑6  | ↓                       | Intentar `type`→`poll`           | `TK_MOD`    | **400**                |
| T‑7  | **POST** `/votes`       | Voto simple                      | `TK_MEMBER` | **201**                |
| T‑8  | ↓                       | Duplicar voto                    | `TK_MEMBER` | **409**                |
| T‑9  | ↓                       | Votar encuesta cerrada           | `TK_MEMBER` | **400**                |
| T‑10 | **GET** `/results`      | Poll abierta `showResults=false` | `TK_MEMBER` | **403**                |
| T‑11 | ↓                       | Poll cerrada – ver resultados    | `TK_MEMBER` | **200** – porcentajes  |
| T‑12 | **GET** `/board?page=2` | Paginación                       | `TK_MEMBER` | **200** – 0‑20 ítems   |

> Los IDs T‑1 → T‑12 se automatizan bajo Jest e2e (carpeta `test/e2e/announcements.spec.ts`).

### 11.2 Ejemplos Postman (punto 4)

```http
PUT {{base}}/guilds/{{guildId}}/board/{{annId}}
Authorization: Bearer {{TK_MOD}}
Content-Type: application/json

{
  "title": "Reunión actualizada",
  "content": "Nueva fecha: miércoles 20 h"
}
```

*Ver todos los ejemplos en la colección «Guild Board» adjunta al proyecto.*

### 11.3 Cron / Cierre automático (test manual)

1. Crear poll con `closeAt = now()+1min`.
2. Esperar job `CloseExpiredPollsJob` (≤ 30 min) o forzar `await job.handle()` en test.
3. Consultar `/results` → debería devolver votos aunque `showResults=false`.

### 11.4 Cobertura

* CRUD anuncios y encuestas.
* Reglas `multiSelect`, `maxChoices`.
* Permisos `POST_ANNOUNCEMENT` vs autor.
* Flag `isClosed` + cron.
* Paginación OFFSET/LIMIT.

> Con esto se considera **Fase 5 completamente verificada**.



