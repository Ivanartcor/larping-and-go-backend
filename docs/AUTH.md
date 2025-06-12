# 🔐 Documentación del módulo `auth`

*JWT · Passport · TypeORM · Clean Architecture*

Este módulo gestiona la autenticación y recuperación de contraseñas de los usuarios dentro de **Larping & Go**. Está estructurado siguiendo principios de arquitectura limpia y separa las responsabilidades en capas claramente definidas.

---

## 📑 Índice

* [📦 Estructura del módulo](#-estructura-del-módulo)
* [📋 Entidades clave](#-entidades-clave)
* [📜 DTOs](#-dtos)
* [🔌 Ports (interfaces)](#-ports-interfaces)
* [🧩 Casos de uso](#-casos-de-uso)
* [🧱 Adaptadores](#-adaptadores)
* [🛡️ Seguridad (Guards y estrategias)](#-seguridad-guards-y-estrategias)
* [📬 Controladores REST](#-controladores-rest)
* [🧠 AuthService (façade)](#-authservice-façade)
* [🛠️ Módulo y configuración](#-módulo-y-configuración)
* [✅ Validación Joi](#-validación-joi)
* [🔁 Flujos detallados](#-flujos-detallados)
* [🧪 Pruebas de humo](#-pruebas-de-humo)
* [🚪 Logout y gestión de tokens](#-logout-y-gestión-de-tokens)

---

### 📦 Estructura del módulo

```ts
modules/auth/
├── application/
│   ├── auth.service.ts
│   ├── use-cases/
│   │   ├── login-user.use-case.ts
│   │   ├── register-user.use-case.ts
│   │   ├── request-reset-password.use-case.ts
│   │   └── confirm-reset-password.use-case.ts
│   └── ports/
│       ├── i-user-auth.repository.ts
│       ├── i-password-token.repository.ts
│       ├── i-hasher.port.ts
│       ├── i-jwt.port.ts
│       └── i-mailer.port.ts
├── domain/
│   ├── entities/
│   │   └── password-reset-token.entity.ts
│   ├── dto/
│   │   ├── login.dto.ts
│   │   ├── register.dto.ts
│   │   ├── refresh-token.dto.ts
│   │   ├── request-password-reset.dto.ts
│   │   └── confirm-password-reset.dto.ts
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
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── jwt-refresh.guard.ts
│   ├── repositories/
│   │   ├── user-auth.repository.ts
│   │   └── password-token.repository.ts
│   └── strategies/
│       ├── jwt-access.strategy.ts
│       └── jwt-refresh.strategy.ts
└── auth.module.ts
```

---

### 📋 Entidades clave

#### `User` (módulo `users`)

* `id`, `email`, `passwordHash`, `username`, `displayName`, `createdAt`, `updatedAt`...

#### `PasswordResetToken`

| Campo            | Tipo            | Comentario                                 |
| ---------------- | --------------- | ------------------------------------------ |
| `tokenHash`      | SHA‑256         | Nunca se guarda el token plano.            |
| `expiresAt`      | Date            | Valida automáticamente en `@BeforeInsert`. |
| `used`, `usedAt` | boolean / Date? | Evita reutilización de token.              |

---

### 📜 DTOs

| DTO                       | Campos                                          |
| ------------------------- | ----------------------------------------------- |
| `RegisterDto`             | `email`, `password`, `username`, `displayName?` |
| `LoginDto`                | `email`, `password`                             |
| `RefreshTokenDto`         | `refreshToken`                                  |
| `RequestPasswordResetDto` | `email`                                         |
| `ConfirmPasswordResetDto` | `token`, `newPassword`                          |

---

### 🔌 Ports (interfaces)

| Interfaz                   | Métodos clave                                     |
| -------------------------- | ------------------------------------------------- |
| `IUserAuthRepository`      | `existsByEmail`, `findByEmail`, `save`            |
| `IPasswordTokenRepository` | `create`, `findValid`, `markUsed`, `purgeExpired` |
| `IHasherPort`              | `hash`, `compare`                                 |
| `IJwtPort`                 | `sign`, `verify`                                  |
| `IMailerPort`              | `sendPasswordReset(to, link)`                     |

---

### 🧩 Casos de uso

| Use‑case               | Flujo resumido                                         |
| ---------------------- | ------------------------------------------------------ |
| `RegisterUserUseCase`  | Verifica email → hashea → crea usuario                 |
| `LoginUserUseCase`     | Busca usuario → compara hash → emite tokens            |
| `RequestPasswordReset` | Genera UUID → guarda SHA‑256 → envía email con enlace  |
| `ConfirmPasswordReset` | Valida token → marca como usado → actualiza contraseña |

---

### 🧱 Adaptadores

| Archivo                   | Implementa                 | Detalles técnicos                         |
| ------------------------- | -------------------------- | ----------------------------------------- |
| `UserAuthRepository`      | `IUserAuthRepository`      | TypeORM sobre entidad `User`.             |
| `PasswordTokenRepository` | `IPasswordTokenRepository` | TypeORM con filtros por expiración.       |
| `BcryptAdapter`           | `IHasherPort`              | Usa bcrypt con 12 rondas.                 |
| `JwtAdapter`              | `IJwtPort`                 | Envoltorio de `@nestjs/jwt`.              |
| `MailerAdapter`           | `IMailerPort`              | Usa `nodemailer`, configurado vía `.env`. |

---

### 🛡️ Seguridad (Guards y estrategias)

| Componente           | Descripción                                                        |
| -------------------- | ------------------------------------------------------------------ |
| `JwtAccessStrategy`  | Verifica access token (Authorization: Bearer …)                    |
| `JwtRefreshStrategy` | Verifica refresh token (body.refreshToken, firmado con `_refresh`) |
| `JwtAuthGuard`       | Usa `JwtAccessStrategy`                                            |
| `JwtRefreshGuard`    | Usa `JwtRefreshStrategy`                                           |

---

### 📬 Controladores REST

| Ruta                          | Guard             | Input DTO                 | Acción                       |
| ----------------------------- | ----------------- | ------------------------- | ---------------------------- |
| `POST /auth/register`         | —                 | `RegisterDto`             | `authService.register()`     |
| `POST /auth/login`            | —                 | `LoginDto`                | `authService.login()`        |
| `POST /auth/refresh`          | `JwtRefreshGuard` | `RefreshTokenDto`         | `authService.refresh()`      |
| `GET /auth/me`                | `JwtAuthGuard`    | —                         | devuelve `{ id }`            |
| `POST /auth/password/request` | —                 | `RequestPasswordResetDto` | `authService.requestReset()` |
| `POST /auth/password/confirm` | —                 | `ConfirmPasswordResetDto` | `authService.confirmReset()` |

---

### 🧠 AuthService (façade)

| Método público              | Usa                           | Devuelve                        |
| --------------------------- | ----------------------------- | ------------------------------- |
| `register(dto)`             | `RegisterUserUseCase`         | `{ accessToken, refreshToken }` |
| `login(dto)`                | `LoginUserUseCase`            | `{ accessToken, refreshToken }` |
| `refresh(dto, userId)`      | —                             | nuevos tokens                   |
| `requestPasswordReset(dto)` | `RequestPasswordResetUseCase` | void                            |
| `confirmPasswordReset(dto)` | `ConfirmPasswordResetUseCase` | void                            |

Método privado `issueTokens(userId)` genera tokens vía `IJwtPort`.

---

### 🛠️ Módulo y configuración

* **imports**: `TypeOrmModule.forFeature([User, PasswordResetToken])`, `JwtModule.registerAsync`, `PassportModule`, `ConfigModule`
* **controllers**: `AuthController`, `PasswordResetController`
* **providers**: Use cases, adaptadores, guards, estrategias, `AuthService`
* **exports**: `AuthService`, `JwtAuthGuard`

---

### ✅ Validación Joi

```ts
JWT_SECRET: Joi.string().min(12).required(),
JWT_EXPIRES_IN: Joi.string().default('3600s'),
SMTP_HOST: Joi.string().required(),
SMTP_PORT: Joi.number().default(587),
SMTP_USER: Joi.string().required(),
SMTP_PASS: Joi.string().required(),
```

---

### 🔁 Flujos detallados

#### Flujos paso a paso por capa

Incluyen todos los pasos internos por capa: Controller → Service → Use-Case → Persistencia / Adaptadores.

#### 🧾 Registro

| Paso | Capa               | Acción                                                                                   | Detalles                             |   |                             |
| ---- | ------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------ | - | --------------------------- |
|  1   | **Controller**     | `POST /auth/register` recibe `RegisterDto`.                                              | Nest ValidationPipe asegura formato. |   |                             |
|  2   | **AuthService**    | Convierte DTO en un `RegisterCommand`.                                                   | Encapsula los datos de entrada.      |   |                             |
|  3   | **RegisterUserUC** | a) Verifica con `existsByEmail`. b) Hashea password. c) Crea entidad `User` y la guarda. | 📄 INSERT en tabla `users`.          |   | 📄 INSERT en tabla `users`. |
|  4   | **AuthService**    | Llama a `issueTokens(user.id)`.                                                          | Usando `IJwtPort.sign`.              |   |                             |
|  5   | **Controller**     | Devuelve `{accessToken, refreshToken}` con 201 Created.                                  |                                      |   |                             |

#### 🔓 Login

| Paso | Capa            | Acción                                                   | Detalles             |
| ---- | --------------- | -------------------------------------------------------- | -------------------- |
|  1   | **Controller**  | `POST /auth/login` recibe `LoginDto`.                    | Validación vía pipe. |
|  2   | **AuthService** | Convierte DTO → `LoginCommand`.                          |                      |
|  3   | **LoginUserUC** | a) Busca usuario → b) `compareHash(password)` con bcrypt |                      |
|  4   | **AuthService** | Llama a `issueTokens(user.id)`                           | Usa `IJwtPort.sign`. |
|  5   | **Controller**  | Devuelve `{accessToken, refreshToken}` con 200 OK.       |                      |

#### 🔁 Refresh token

| Paso | Capa                | Acción                                                   | Detalles              |
| ---- | ------------------- | -------------------------------------------------------- | --------------------- |
|  1   | **Controller**      | `POST /auth/refresh` con `refreshToken` en el body.      |                       |
|  2   | **JwtRefreshGuard** | Valida firma y secret `${JWT_SECRET}_refresh`.           | Agrega `req.user.id`. |
|  3   | **AuthService**     | Llama a `issueTokens(userId)` para emitir nuevos tokens. |                       |
|  4   | **Controller**      | Devuelve `{accessToken, refreshToken}` con 200 OK.       |                       |

#### 🙋 WhoAmI (`GET /auth/me`)

| Paso | Capa             | Acción                | Detalles                   |
| ---- | ---------------- | --------------------- | -------------------------- |
|  1   | **JwtAuthGuard** | Valida `accessToken`. | Token va en Authorization. |
|  2   | **Controller**   | Devuelve `{ id }`.    |                            |

#### 🔑 Solicitud de reset

| Paso | Capa              | Acción                                              | Detalles                       |
| ---- | ----------------- | --------------------------------------------------- | ------------------------------ |
| 1    | **Controller**    | Recibe `RequestPasswordResetDto` con el email.      | Pipe valida formato del email. |
| 2    | **AuthService**   | Llama al use case `RequestPasswordResetUseCase`.    |                                |
| 3    | **UseCase**       | Genera token UUID → hashea (SHA‑256) → guarda fila. | `expiresAt = now() + 2h`.      |
| 4    | **MailerAdapter** | Envía email con enlace que contiene el `rawToken`.  | Usa nodemailer SMTP.           |
| 5    | **Controller**    | Devuelve `202 Accepted`.                            |                                |

#### 🛠️ Confirmación de reset

| Paso | Capa            | Acción                                                               | Detalles                               |
| ---- | --------------- | -------------------------------------------------------------------- | -------------------------------------- |
| 1    | **Controller**  | Recibe `ConfirmPasswordResetDto` con token plano y nueva contraseña. | Pipe valida formato DTO.               |
| 2    | **AuthService** | Llama al use case `ConfirmPasswordResetUseCase`.                     |                                        |
| 3    | **UseCase**     | Hashea token → busca `PasswordResetToken` válido.                    | Verifica expiración y si ya fue usado. |
| 4    | **UseCase**     | Marca `used = true`, actualiza `user.passwordHash`.                  | Usando `BcryptAdapter`.                |
| 5    | **Controller**  | Devuelve `204 No Content`.                                           |                                        |

---

### 🧪 Pruebas de humo

```bash
curl -X POST http://localhost:3000/auth/register -H 'Content-Type: application/json' -d '{"email":"a@b.c","password":"qwerty12","username":"tonto"}'

curl -X POST http://localhost:3000/auth/login -H 'Content-Type: application/json' -d '{"email":"a@b.c","password":"qwerty12"}'

curl -X POST http://localhost:3000/auth/refresh -H 'Content-Type: application/json' -d '{"refreshToken":"<TOKEN>"}'

curl -X POST http://localhost:3000/auth/password/request -d '{"email":"a@b.c"}'
```

---

### 🚪 Logout y gestión de tokens

**JWT es stateless**, por lo tanto hay 3 formas comunes de implementar logout:

1. **Sólo frontend:** borra tokens y cierra socket. Simple pero poco seguro.
2. **Lista blanca de refresh tokens:** se guarda hash SHA‑256 del refresh y se marca como revocado.
3. **Blacklist Redis:** se guarda jti de access token con TTL. Requiere Redis.

**Recomendado:** combinar opciones 1 + 2 para seguridad + trazabilidad (en un futuro).


---

© 2025 – Larping & Go. Todos los derechos reservados.
