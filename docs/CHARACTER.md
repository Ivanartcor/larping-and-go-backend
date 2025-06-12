# 🧝 Documentación del módulo `characters`

*Gestión de personajes, propiedades, avatar y proyección pública*

Este módulo permite a los usuarios crear, editar, eliminar y configurar personajes vinculados a su cuenta. Un personaje puede tener múltiples propiedades (atributos), un avatar personalizado y es posible marcar uno como personaje activo. Se sigue una estructura basada en DDD (Domain-Driven Design) y separa claramente la lógica de dominio, aplicación e infraestructura.

---

## 📑 Índice

1. [Propósito y Contexto](#1--propósito-y-contexto)
2. [Estructura del Módulo](#2--estructura-del-módulo)
3. [Modelo de Dominio](#3--modelo-de-dominio)
4. [DTOs](#4--dtos)
5. [Value Object: Slug](#5--value-object-slug)
6. [Puertos (Ports)](#6--puertos-ports)
7. [Infraestructura](#7--infraestructura)
8. [Casos de Uso (Use-Cases)](#8--casos-de-uso-use-cases)
9. [Fachada: CharactersService](#9--fachada-charactersservice)
10. [Controlador HTTP](#10--controlador-http)
11. [Flujos Paso a Paso](#11--flujos-paso-a-paso)
12. [Ejemplos cURL](#12--ejemplos-curl)
13. [Datos Clave](#13--datos-clave)
14. [Errores Comunes](#14--errores-comunes)
15. [Checklist de Seguridad](#15--checklist-de-seguridad)

---

## 1 · Propósito y Contexto

El micro‑dominio **Characters** gestiona la creación, consulta y edición de personajes LARP. Cada usuario puede tener múltiples personajes, con:

* Propiedades estructuradas (físicas, sociales, generales, relacionales y personalizadas).
* Avatar subido.
* Estado de visibilidad y soft‑delete.

Se integra con **UsersModule** para autenticación y **IStoragePort** para subida de avatares.

---

## 2 · Estructura del Módulo

```
modules/characters/
│   characters.module.ts
│   
├───application/
│   │   characters.service.ts
│   │   
│   ├───ports/
│   │       i-character.repository.ts
│   │       i-default-properties.provider.ts
│   │
│   ├───queries/
│   │       get-public-character.query.ts
│   │
│   └───use-cases/
│           create-character.use-case.ts
│           delete-character.use-case.ts
│           list-character-properties.use-case.ts
│           list-characters.use-case.ts
│           remove-property.use-case.ts
│           update-character.use-case.ts
│           upload-avatar.use-case.ts
│           upsert-property.use-case.ts
│
├───domain/
│   ├───dto/
│   │       change-avatar.dto.ts
│   │       character-property.dto.ts
│   │       create-character.dto.ts
│   │       public-character.dto.ts
│   │       update-character.dto.ts
│   │
│   ├───entities/
│   │       character-property.entity.ts
│   │       character.entity.ts
│   │
│   └───value-objects/
│           slug.vo.ts
│
└───infrastructure/
    ├───controllers/
    │       characters.controller.ts
    │
    ├───providers/
    │       default-properties.provider.ts
    │
    └───repositories/
            character.repository.ts
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

## 5 · Value Object: Slug

```ts
class Slug {
  static create(raw: string): Slug; // valida regex ^[a-z0-9-]{2,80}$
  toString(): string;
}
```

Garantiza un identificador válido y amigable para URLs.

---

## 6 · Puertos (Ports)

* **ICharacterRepository**:

  * Lectura: `listByUser`, `findById`, `findBySlug`, `existsNameForUser`
  * Escritura: `create`, `save`, `softDelete`
  * Propiedades: `upsertProperty`, `removeProperty`
  * Proyección: `project`

* **IStoragePort** (desde UsersModule): `uploadAvatar(id, buffer, mime): Promise<string>`

* **IDefaultCharacterPropertiesProvider**: `getDefaults(): CharacterPropertyDto[]`

---

## 7 · Infraestructura

### CharacterRepository

* `.find()` con `relations: { properties }`
* `upsertProperty` usa transacción
* `softDelete` marca `isActive = false`
* `project()` transforma a DTO público

### DefaultPropertiesProvider

Carga propiedades iniciales comunes para todos los personajes

---

## 8 · Casos de Uso (Use-Cases)

1. `CreateCharacterUseCase`
2. `UpdateCharacterUseCase`
3. `DeleteCharacterUseCase`
4. `ListCharactersUseCase`
5. `ListCharacterPropertiesUseCase`
6. `UpsertPropertyUseCase`
7. `RemovePropertyUseCase`
8. `UploadAvatarUseCase`
9. `GetPublicCharacterUseCase`

---

## 9 · Fachada: CharactersService

Reúne todos los casos de uso y ofrece una interfaz centralizada:

```ts
createCharacter(userId, dto);
updateCharacter(id, dto);
deleteCharacter(id);
listMyCharacters(userId);
listProperties(userId, charId);
upsertProperty(id, dto);
removeProperty(id, pid);
uploadAvatar(id, buffer, mime);
getPublicCharacter(slug);
```

---

## 10 · Controlador HTTP

| Ruta                                    | Método | Guard        | Body / Params            |
| --------------------------------------- | ------ | ------------ | ------------------------ |
| POST  `/characters`                     | POST   | JwtAuthGuard | CreateCharacterDto       |
| GET   `/characters/me`                  | GET    | JwtAuthGuard | —                        |
| GET   `/characters/:slug`               | GET    | —            | slug                     |
| PUT   `/characters/:id`                 | PUT    | JwtAuthGuard | UpdateCharacterDto       |
| DELETE`/characters/:id`                 | DELETE | JwtAuthGuard | id                       |
| GET   `/characters/:id/properties`      | GET    | JwtAuthGuard | id                       |
| POST  `/characters/:id/properties`      | POST   | JwtAuthGuard | CharacterPropertyDto     |
| DELETE`/characters/:id/properties/:pid` | DELETE | JwtAuthGuard | id, pid                  |
| PUT   `/characters/:id/avatar`          | PUT    | JwtAuthGuard | multipart: avatar (file) |

---

## 11 · Flujos Paso a Paso

### Crear Personaje

1. `Controller` recibe JSON + JWT.
2. `CharactersService.createCharacter(userId, dto)`
3. `CreateCharacterUseCase`: valida, fusiona propiedades, guarda.
4. `Repo`: inserta en `characters` y `character_properties`
5. Devuelve `PublicCharacterDto`

### Listar Propiedades

1. GET `/characters/:id/properties`
2. Verifica usuario y existencia del personaje
3. Devuelve `CharacterPropertyDto[]`

---

## 12 · Ejemplos cURL

```bash
# Crear personaje
curl -X POST http://localhost:3000/characters \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Thalion","properties":[{"group":"general","key":"clan","value":"Bosque","valueType":"text"}]}'

# Obtener personajes propios
curl http://localhost:3000/characters/me -H "Authorization: Bearer $TOKEN"

# Obtener propiedades de personaje
curl http://localhost:3000/characters/<ID>/properties -H "Authorization: Bearer $TOKEN"
```

---

## 13 · Datos Clave

* Keys en snake\_case, únicos por personaje.
* Cada propiedad tiene tipo (text, number, list, etc.)
* Eliminar un personaje no borra datos: marca `isActive = false`.
* Los avatares se sirven por `/static/avatars/<filename>`

---

## 14 · Errores Comunes

| Código | Motivo                                  | Mensaje                          |
| ------ | --------------------------------------- | -------------------------------- |
| 400    | Avatar inválido o propiedad mal formada | `Invalid avatar` / `Invalid key` |
| 403    | Acceso a personaje ajeno                | `Forbidden character`            |
| 404    | Personaje o propiedad no encontrado     | `Character not found`            |
| 409    | Nombre duplicado                        | `Character name already exists`  |
| 413    | Avatar supera tamaño permitido (>5MB)   | `Payload too large`              |

---

## 15 · Checklist de Seguridad

* Validación estricta de tipos y formato de propiedad.
* Verificación de ownership para todas las rutas.
* Sanitización de avatar y nombre (sin scripts).
* Slugs únicos, URL-safe y no editables luego de creados.
* Todos los métodos usan DTOs con validación `class-validator`.
