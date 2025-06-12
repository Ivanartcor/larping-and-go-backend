# 🧱 Documentación de Roles en Hermandades (`GuildRoles`)

Este documento detalla el funcionamiento completo del sistema de **roles personalizados** dentro de las hermandades (guilds) en *Larping & Go*.

Los roles definen la jerarquía interna, los permisos de acción y la organización social de cada hermandad. Se gestionan desde el módulo `guilds`, pero poseen una estructura y reglas bien definidas por separado.

---

## 📑 Índice

1. [Diseño de la Tabla](#1--diseño-de-la-tabla-guild_roles)
2. [Permisos Bitmask](#2--permisos-bitmask)
3. [Jerarquía y Posiciones](#3--jerarquía-y-posiciones)
4. [Creación y Edición](#4--creación-y-edición)
5. [Reglas de Integridad](#5--reglas-de-integridad)
6. [Métodos del Repositorio](#6--métodos-del-repositorio)
7. [DTO y Validaciones](#7--dto-y-validaciones)
8. [Casos de Uso](#8--casos-de-uso)
9. [Guards y Decoradores](#9--guards-y-decoradores)
10. [Endpoints REST](#10--endpoints-rest)
11. [Flujo de Reordenamiento](#11--flujo-de-reordenamiento)
12. [Buenas Prácticas y Seguridad](#12--buenas-prácticas-y-seguridad)

---

## 1 · Diseño de la Tabla `guild_roles`

Define los roles personalizados, su jerarquía y permisos dentro de una hermandad.

| Columna       | Tipo          | Detalles                                         |
| ------------- | ------------- | ------------------------------------------------ |
| `id`          | `uuid`        | PK `gen_random_uuid()`                           |
| `guild_id`    | `uuid`        | FK → `guilds.id`                                 |
| `name`        | `varchar(40)` | Nombre único dentro de la guild                  |
| `color`       | `varchar(7)`  | HEX `#RRGGBB` para UI                            |
| `icon`        | `varchar(50)` | Nombre de icono (FontAwesome, Lucide…)           |
| `position`    | `int`         | Jerarquía: 0 = líder; mayor número = menor rango |
| `permissions` | `int`         | Máscara de bits (ver tabla de valores)           |
| `is_leader`   | `boolean`     | Flag único para el rol de líder                  |
| `created_at`  | `timestamptz` | Fecha de creación                                |
| `updated_at`  | `timestamptz` | Última modificación                              |

**Restricciones clave**

```sql
CREATE UNIQUE INDEX ux_role_name       ON guild_roles (guild_id, lower(name));
CREATE UNIQUE INDEX ux_role_position   ON guild_roles (guild_id, position);
CREATE UNIQUE INDEX ux_role_one_leader ON guild_roles (guild_id) WHERE is_leader = TRUE;
```

---

## 2 · Permisos Bitmask

Cada rol posee un entero que representa una combinación de permisos utilizando una máscara de bits:

| Bit | Valor | Constante           | Descripción breve                 |
| --- | ----- | ------------------- | --------------------------------- |
| 0   | 1     | `EDIT_INFO`         | Editar información general        |
| 1   | 2     | `MANAGE_MEMBERS`    | Aceptar / expulsar miembros       |
| 2   | 4     | `MANAGE_ROLES`      | Editar roles inferiores           |
| 3   | 8     | `POST_ANNOUNCEMENT` | Publicar en el tablón             |
| 4   | 16    | `CREATE_EVENTS`     | Crear eventos internos            |
| 5   | 32    | `CHAT`              | Escribir en el chat grupal        |
| 6   | 64    | `CREATE_ROLES`      | Crear nuevos roles                |
| —   | 127   | `ALL`               | Todos los permisos (rol de Líder) |

### Ejemplo práctico

Un rol con permisos para editar la información de la guild, aceptar miembros y publicar en el tablón tendría:

* `EDIT_INFO` → 1
* `MANAGE_MEMBERS` → 2
* `POST_ANNOUNCEMENT` → 8

**Total:** `1 + 2 + 8 = 11`

Al almacenar este rol en la base de datos, el campo `permissions` tendrá el valor `11`. Luego, en el código, se puede validar si un rol posee cierto permiso con:

```
if (role.permissions & GuildPermission.POST_ANNOUNCEMENT) {
  // Puede publicar anuncios
}
```

Este sistema permite múltiples combinaciones en un solo número, facilitando validaciones eficientes y rápidas.

---

## 3 · Jerarquía y Posiciones

* `position = 0` está reservado exclusivamente para el **rol de Líder** (`is_leader = true`).
* La jerarquía se basa únicamente en `position`: menor número = mayor rango.
* Solo puedes gestionar roles con `position` mayor a la tuya, salvo que seas líder.

---

## 4 · Creación y Edición

* Requiere el permiso `CREATE_ROLES`.
* Nombre único por guild.
* Color HEX válido (`#RRGGBB`).
* El rol líder es único y no editable por otros miembros.

---

## 5 · Reglas de Integridad

1. El rol de líder (`position = 0`) es único e inmutable.
2. No se puede eliminar un rol con miembros asignados.
3. Las posiciones deben ser únicas dentro de la guild.
4. Toda operación debe respetar la jerarquía de posiciones.

---

## 6 · Métodos del Repositorio

| Método                          | Descripción                                 |
| ------------------------------- | ------------------------------------------- |
| `listRoles(guildId)`            | Devuelve los roles ordenados por `position` |
| `createRole(role)`              | Inserta un nuevo rol                        |
| `updateRole(role)`              | Actualiza nombre, permisos o apariencia     |
| `deleteRole(roleId)`            | Elimina si no tiene miembros                |
| `shiftRolePositions(...)`       | Reorganiza automáticamente la jerarquía     |
| `updateRolePosition(...)`       | Apoyo a `shiftRolePositions`                |
| `roleExistsByName / ByPosition` | Validaciones de unicidad                    |
| `findRoleById`                  | Carga con relación `guild`                  |
| `roleHasMembers(roleId)`        | Verifica si hay usuarios usando ese rol     |

---

## 7 · DTO y Validaciones

* **CreateRoleDto**: `name`, `color`, `position ≥ 1`, `permissions`.
* **UpdateRoleDto**: `PartialType(CreateRoleDto)`.
* **AssignRoleDto**: `memberId`, `roleId` (UUID).

---

## 8 · Casos de Uso

| UC             | Permiso          | Regla clave                                                             |
| -------------- | ---------------- | ----------------------------------------------------------------------- |
| `CreateRoleUC` | `CREATE_ROLES`   | Solo bajo tu rango; nombre y posición únicas                            |
| `UpdateRoleUC` | `MANAGE_ROLES`   | Rol objetivo bajo tu rango; aplica `shiftRolePositions` automáticamente |
| `DeleteRoleUC` | `MANAGE_ROLES`   | No puede ser el Líder ni tener miembros                                 |
| `AssignRoleUC` | `MANAGE_MEMBERS` | No puedes asignar roles igual o superior a tu posición                  |

---

## 9 · Guards y Decoradores

* `JwtAuthGuard`
* `GuildMemberGuard`
* `GuildPermissionsGuard` + `@GuildPermissions(...)`

---

## 10 · Endpoints REST

| Método & Ruta                      | Permiso           | Descripción                           |
| ---------------------------------- | ----------------- | ------------------------------------- |
| `POST   /guilds/:id/roles`         | `CREATE_ROLES`    | Crear rol personalizado               |
| `GET    /guilds/:id/roles`         | cualquier miembro | Listar roles ordenados                |
| `PUT    /guilds/:id/roles/:roleId` | `MANAGE_ROLES`    | Editar nombre/color/permisos/posición |
| `DELETE /guilds/:id/roles/:roleId` | `MANAGE_ROLES`    | Eliminar (si sin miembros)            |
| `PATCH  /guilds/:id/roles/assign`  | `MANAGE_MEMBERS`  | Asignar rol a miembro activo          |

---

## 11 · Flujo de Reordenamiento

```text
1. El cliente solicita mover el Rol C de posición 4 → 2.
2. Se mueve a posición 10 000 para liberar clave.
3. `shiftRolePositions` incrementa 2-3-4 → 3-4-5.
4. Se asigna Rol C a posición 2.
```

Evita conflicto con índice `ux_role_position`.

---

## 12 · Buenas Prácticas y Seguridad

* Mostrar permisos visualmente en el frontend.
* Validar jerarquía antes de cualquier modificación.
* Proteger el rol `position = 0` contra cambios.
* Usar tooltips para facilitar la configuración a nuevos líderes.

---

---

✅ Este sistema permite una **gestión descentralizada, flexible y jerárquica** de las hermandades, adaptándose al estilo de juego de cada comunidad.
