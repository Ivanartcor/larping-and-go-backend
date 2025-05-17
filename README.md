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
