# 📅 Documentación de Eventos Globales y Noticias

La sección de **Eventos Globales y Noticias** constituye un subsistema de comunicación oficial de la plataforma **Larping & Go**, centrado en la difusión de contenido institucional, actualizaciones importantes, y eventos transversales dirigidos a toda la comunidad. A diferencia de los eventos internos de hermandades o el sistema de mensajería, esta funcionalidad está reservada para los usuarios con permisos elevados (administradores globales) y su acceso es de solo lectura para los demás usuarios.

---

## 📑 Índice

1. [Estado actual](#-estado-actual)
2. [Objetivos del módulo](#-objetivos-del-módulo)
3. [Entidades y Modelo Relacional](#-entidades-y-modelo-relacional)
4. [Relaciones entre entidades](#-relaciones-entre-entidades)
5. [Triggers y procesos automáticos](#-triggers-y-procesos-automáticos)
6. [Flujos de negocio](#-flujos-de-negocio)

---

## ✨ Estado actual

Este módulo **aún no ha sido implementado** a nivel de endpoints, controladores ni servicios, pero su diseño está totalmente definido a nivel de **entidades**, **modelo relacional** y **flujos de negocio**. El objetivo es dejar sentadas las bases para su desarrollo e integración futura sin modificar el esquema general.

---

## ⛏️ Objetivos del módulo

* **Difusión oficial** de contenido institucional.
* Publicación de **eventos transversales** como crónicas, tramas globales, o actividades de la organización.
* Creación y programación de publicaciones destacadas.
* Posibilidad de incluir **noticias tipo markdown**, banners, enlaces y menciones.
* Gestión de asistencia por personaje y galería multimedia vinculada a cada evento.

---

## ♻️ Entidades y Modelo Relacional

### 📁 `event_categories`

Catálogo editable de tipos de evento.

| Columna     | Tipo               | Detalles                              |
| ----------- | ------------------ | ------------------------------------- |
| id          | uuid PK            | Identificador único                   |
| name        | varchar(40) UNIQUE | Nombre visible ("Torneo", "Feria"...) |
| slug        | varchar(60) UNIQUE | Alias URL-safe (`feria-medieval`)     |
| color       | varchar(7)         | Código HEX (`#ff5722`) para UI        |
| description | text NULL          | Descripción opcional                  |
| position    | int UNIQUE         | Orden para listados                   |
| created\_at | timestamptz        | Fecha de creación                     |
| updated\_at | timestamptz        | Última edición                        |

**Notas:** Slug autogenerado, orden editable. Solo administradores pueden modificar.

---

### 📁 `global_events`

Ficha pública del evento global.

| Columna           | Tipo                           | Detalles                              |
| ----------------- | ------------------------------ | ------------------------------------- |
| id                | uuid PK                        |                                       |
| creator\_user\_id | uuid FK → users.id             | `SET NULL` si el usuario se elimina   |
| category\_id      | uuid FK → event\_categories.id | Categoría asignada                    |
| title             | varchar(120)                   | Título visible                        |
| slug              | varchar(140) UNIQUE            | Alias público                         |
| description       | text                           | Markdown permitido                    |
| banner\_url       | text NULL                      | Imagen de cabecera                    |
| location\_text    | varchar(120)                   | Ciudad / recinto                      |
| latitude          | numeric(9,6) NULL              | Coordenadas GPS opcionales            |
| longitude         | numeric(9,6) NULL              |                                       |
| start\_at         | timestamptz                    | Fecha de inicio                       |
| end\_at           | timestamptz                    | Fecha de fin (opcional)               |
| capacity          | int NULL                       | Aforo máximo (`CHECK >0`)             |
| attendee\_count   | int DEFAULT 0                  | Se actualiza por trigger              |
| status            | ENUM                           | `scheduled`, `cancelled`, `completed` |
| featured          | boolean DEFAULT false          | Aparece destacado en la home          |
| created\_at       | timestamptz                    | Fecha de creación                     |
| updated\_at       | timestamptz                    | Última actualización                  |

**Índices sugeridos:** búsqueda full‑text, geofiltros, por fecha y categoría.

---

### 📁 `global_event_attendance`

Control de asistencia por personaje y estado.

| Columna       | Tipo         | Detalles                               |
| ------------- | ------------ | -------------------------------------- |
| event\_id     | uuid PK‑part | FK → global\_events.id                 |
| user\_id      | uuid PK‑part | FK → users.id                          |
| character\_id | uuid NULL    | FK → characters.id                     |
| status        | ENUM         | `confirmed`, `cancelled`, `waitlisted` |
| changed\_at   | timestamptz  | Fecha de cambio                        |
| created\_at   | timestamptz  |                                        |

**Notas:** PK compuesta. Si se libera aforo, se promueve un `waitlisted` a `confirmed`.

---

### 📁 `event_media`

Galería multimedia del evento.

| Columna            | Tipo                        | Detalles                                         |
| ------------------ | --------------------------- | ------------------------------------------------ |
| id                 | uuid PK                     |                                                  |
| event\_id          | uuid FK → global\_events.id | Vinculado al evento                              |
| uploader\_user\_id | uuid FK → users.id          | NULL si el usuario fue eliminado                 |
| file\_url          | text                        | URL en CDN o Storage                             |
| thumbnail\_url     | text NULL                   | Imagen miniatura                                 |
| file\_name         | varchar(140)                | Nombre original del archivo                      |
| content\_type      | varchar(100)                | MIME type (`image/jpeg`, `application/pdf`, ...) |
| size\_bytes        | bigint                      | Tamaño                                           |
| width\_px          | int NULL                    | Solo multimedia visual                           |
| height\_px         | int NULL                    |                                                  |
| caption            | varchar(200) NULL           | Pie de foto o descripción opcional               |
| position           | int DEFAULT 0               | Orden relativo                                   |
| created\_at        | timestamptz                 |                                                  |

---

## 🔗 Relaciones entre entidades

```text
users ──< global_event_attendance >── global_events >── event_categories
characters ─┘                         │
                                       └──< event_media
```

---

## ⚙️ Triggers y procesos automáticos

| Nombre                 | Tipo    | Descripción                                                               |
| ---------------------- | ------- | ------------------------------------------------------------------------- |
| tg\_gea\_count         | Trigger | Actualiza `attendee_count` al modificar asistencia confirmada.            |
| tg\_ev\_media\_pos     | Trigger | Reordena la columna `position` tras eliminar un archivo.                  |
| cron\_complete\_events | Cron    | Marca eventos como `completed` si `end_at < now()`.                       |
| cron\_expire\_waitlist | Cron    | Envía notificación a usuarios `waitlisted` cuando hay plazas disponibles. |

---

## 🤖 Flujos de negocio

### ✏️ Publicar noticia

1. Usuario con rol administrador accede al panel de administración.
2. Crea una nueva noticia con título, contenido markdown y (opcionalmente) imagen.
3. Al guardarse, la noticia queda publicada para todos los usuarios.

### 📌 Crear evento global

1. Administrador abre el formulario para nuevo evento.
2. Rellena información básica, ubicación y fechas.
3. Puede programar el evento con `start_at` y `status=scheduled`.
4. Una vez llega la fecha, se marca como `completed` automáticamente o manualmente.

### 📸 Subir media

1. El usuario administrador o editor accede al evento.
2. Sube uno o varios archivos válidos (imagen, PDF…).
3. El sistema guarda la metadata y genera miniatura (si aplica).
4. Los archivos se ordenan por `position`.

### ✅ Confirmar o cancelar asistencia

1. Usuario autenticado selecciona un personaje y confirma asistencia.
2. Si hay aforo, se marca como `confirmed`; si no, `waitlisted`.
3. Puede cancelar libremente, lo que libera plaza y actualiza contadores.

---

Este módulo servirá de canal oficial entre la organización del mundo LARP y los jugadores, centralizando los mensajes importantes y facilitando la programación de eventos masivos. Su evolución futura podrá incluir encuestas, confirmación de asistencia, y comentarios moderados.
