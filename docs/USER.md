# 👤 Documentación detallada del módulo `users`

*Manejo de perfil de usuario, avatar, personaje activo y perfil público en Larping & Go*

Este módulo representa a la **persona real** dentro del sistema (cuenta privada) y permite exponer su **perfil público** vinculado al personaje activo. Aporta funcionalidades para editar el perfil, gestionar el avatar, seleccionar el personaje activo y consultar información pública o privada del usuario autenticado.

---

## 📑 Índice

1. [Propósito](#1--propósito)
2. [Árbol de carpetas](#2--árbol-de-carpetas)
3. [Entidad `User`](#3--entidad-user)
4. [DTO](#4--dto)
5. [Ports](#5--ports)
6. [Adapters (infra)](#6--adapters-infra)
7. [Use-cases (orchestration layer)](#7--usecases-orchestration-layer)
8. [UsersService (façade)](#8--usersservice-façade)
9. [HTTP API](#9--http-api)
10. [Módulo](#10--módulo)
11. [Flujos detallados](#11--flujos-detallados)
12. [Errores comunes](#12--errores-comunes)
13. [Checklist de seguridad](#13--checklist-de-seguridad)
14. [Detalles de implementación de almacenamiento (Storage)](#14--detalles-de-implementación-de-almacenamiento-storage)

---

## 1 · Propósito

Representar a la **persona real** (cuenta privada) y exponer un **perfil público** vinculado a su `activeCharacter`. Es la base de identidad del sistema, conectada con múltiples dominios.

---

## 2 · Árbol de carpetas

```
modules/users/
├─ application/
│  ├─ ports/                # IUserRepository, IStoragePort
│  ├─ use-cases/            # UpdateProfile, ChangeActiveCharacter, GetPublicProfile
│  └─ users.service.ts      # façade
├─ domain/
│  ├─ dto/                  # update-profile.dto.ts, public-user.dto.ts,...
│  ├─ value-objects/        # username.vo.ts (futuro)
│  └─ entities/             # user.entity.ts
└─ infrastructure/
    ├─ controllers/         # users.controller.ts
    ├─ repositories/        # user.repository.ts
    ├─ adapters/            # local-storage.adapter.ts
    └─ ... (guards reutilizados)
users.module.ts
```

---

## 3 · Entidad `User`

* PK: `id` (uuid)
* Campos: `email` (único), `passwordHash`, `username`, `displayName`, `locale`, `avatarUrl`, `activeCharacterId`, timestamps.
* Flags: `isEmailVerified`, `isAdmin`, `isActive`
* Relaciones: `characters[]`, `activeCharacter`, `guildMemberships[]`, `guildsLed[]`, `eventAttendances[]`
* Getter derivado: `avatarUrl` → delega en `activeCharacter.avatarUrl`

---

## 4 · DTO

| DTO                        | Campos                                                             | Uso                      |
| -------------------------- | ------------------------------------------------------------------ | ------------------------ |
| `UpdateProfileDto`         | `displayName?`, `locale?`, `avatarUrl?`                            | Actualizar perfil        |
| `ChangeActiveCharacterDto` | `characterId` (uuid)                                               | Cambiar personaje activo |
| `PublicUserDto`            | `id`, `username`, `displayName?`, `avatarUrl?`, `activeCharacter?` | Visualización pública    |

---

## 5 · Ports

| Port              | Métodos principales                                                            |
| ----------------- | ------------------------------------------------------------------------------ |
| `IUserRepository` | `findById`, `findByUsername`, `save`, `getPublicProfile`, `setActiveCharacter` |
| `IStoragePort`    | `uploadAvatar`, `uploadGuildAsset`, `uploadChatAttachment`, `remove`           |

---

## 6 · Adapters (infra)

| Adaptador             | Implementa        | Detalles                                                    |
| --------------------- | ----------------- | ----------------------------------------------------------- |
| `UserRepository`      | `IUserRepository` | Usa TypeORM; operaciones con transacciones donde aplica     |
| `LocalStorageAdapter` | `IStoragePort`    | Guarda en `/uploads`, accesible vía `/static` en desarrollo |

---

## 7 · Use-cases (orchestration layer)

| Use-case                | Flujo                                                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `UpdateProfile`         | 1. Validación y búsqueda.<br>2. Parcheo de campos.<br>3. Upload avatar si aplica.<br>4. Save.<br>5. Devolver `PublicUserDto`. |
| `ChangeActiveCharacter` | 1. Transacción: validar propiedad y actualizar.<br>2. Proyección de `PublicUserDto`.                                          |
| `GetPublicProfileQuery` | Proxy directo a método de repositorio.                                                                                        |

---

## 8 · UsersService (façade)

Orquesta los casos de uso expuestos, sirve como capa pública para controladores y posibles otros módulos que consuman información de usuarios.

---

## 9 · HTTP API

| Método | Ruta                         | Guard          | Acción                      |
| ------ | ---------------------------- | -------------- | --------------------------- |
| `GET`  | `/users/me`                  | `JwtAuthGuard` | Obtener perfil propio       |
| `PUT`  | `/users/me` (multipart)      | `JwtAuthGuard` | Actualizar datos y/o avatar |
| `PUT`  | `/users/me/active-character` | `JwtAuthGuard` | Cambiar personaje activo    |
| `GET`  | `/users/:id`                 | —              | Ver perfil público          |

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

1. Guard JWT inyecta el `userId`
2. `multer` procesa `avatar` si está presente
3. Validación del archivo (`<2MB`, MIME PNG/JPEG)
4. `UsersService.updateProfile` → aplica lógica y subida si es necesario
5. Devuelve `PublicUserDto`

### 11.2 Cambiar personaje activo *(PUT /users/me/active-character)*

1. Guard JWT añade usuario
2. Se ejecuta `ChangeActiveCharacterUseCase`
3. Se devuelve perfil público actualizado

### 11.3 Consultar perfil público *(GET /users/\:id)*

1. Llamada directa sin guard
2. Se devuelve proyección de `PublicUserDto` (sin correo ni sensible)

---

## 12 · Errores comunes

| Código | Motivo                                    | Mensaje                                |
| ------ | ----------------------------------------- | -------------------------------------- |
| 400    | Archivo avatar inválido                   | `Invalid file type/size`               |
| 403    | No puede modificar personaje que no posee | `Forbidden character`                  |
| 404    | Usuario o personaje no encontrado         | `User not found / Character not found` |

---

## 13 · Checklist de seguridad

* Validación estricta de archivos (tipo y tamaño)
* Evita carga de SVG para prevenir XSS
* Campos de texto validados (length, pattern)
* Transacciones en operaciones críticas (e.g. personaje activo)
* `passwordHash` jamás expuesto en DTO

---

## 14 · Detalles de implementación de almacenamiento (Storage)

La implementación por defecto es `LocalStorageAdapter`, que guarda archivos en disco y construye rutas públicas accesibles mediante `/static/…` en desarrollo.

### Carpetas y destinos

| Tipo                  | Carpeta interna          | URL pública                        |
| --------------------- | ------------------------ | ---------------------------------- |
| Avatar usuario        | `uploads/avatars/`       | `/static/avatars/<filename>`       |
| Recursos de hermandad | `uploads/guilds/`        | `/static/guilds/<filename>`        |
| Archivos de chat      | `uploads/chat/<userId>/` | `/static/chat/<userId>/<filename>` |

### Métodos implementados

```ts
uploadAvatar(userId, buffer, mime): Promise<string>
uploadGuildAsset(guildId, kind, buffer, mime): Promise<string>
uploadChatAttachment(userId, buffer, mime, original): Promise<{ id, url, size }>
remove(url): Promise<void>
```

Los métodos generan nombres seguros, garantizan la existencia de carpetas, y manejan errores del sistema de archivos de forma segura. `remove` ignora si el archivo no existe (`ENOENT`).
