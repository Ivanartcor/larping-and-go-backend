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
| **chat\_messages**       | Mensajes enviados (texto, adjuntos, metadata). *(Diseño pendiente)*                        |
| **chat\_message\_reads** | Marca de lectura por usuario con timestamp. *(Diseño pendiente)*                           |
| **chat\_attachments**    | Archivos vinculados a un mensaje (imágenes, documentos). *(Opcional)*                      |
| **chat\_reactions**      | Reacciones emoji a un mensaje. *(Futuro)*                                                  |

Relaciones clave:

```
chat_channels 1─N chat_participants N─1 users
chat_channels 1─N chat_messages     N─1 users
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




