# 🗄️ Guía Definitiva de Configuración de Base de Datos en Larping & Go

*PostgreSQL · NestJS 10 · TypeORM 0.3*

Este documento explica, paso a paso, cómo conectar la aplicación **Larping & Go** a PostgreSQL, generar y ejecutar migraciones, sembrar datos iniciales y verificar que las **40 + entidades y vistas** diseñadas se crean correctamente.

---

## 📑 Índice

* [📦 Estructura del módulo de base de datos](#-estructura-del-módulo-de-base-de-datos)
* [🌐 Variables de entorno y validación](#-variables-de-entorno-y-validación)
* [🧩 Configuración centralizada (`configuration.ts`)](#-configuración-centralizada-configurationts)
* [⚙️ Configuración del ORM (`data-source.ts`)](#-configuración-del-orm-data-sourcets)
* [📦 Módulo de base de datos (`database.module.ts`)](#📦-módulo-de-base-de-datos-databasemodulets)
* [🧪 Migraciones y Seeds](#-migraciones-y-seeds)
* [🗃️ Vista materializada `search_index`](#-vista-materializada-search_index)
* [🔎 Verificación rápida](#-verificación-rápida)
* [🛠️ Solución de problemas frecuentes](#-solución-de-problemas-frecuentes)
* [🔄 Ciclo de cambios futuros en el esquema](#-ciclo-de-cambios-futuros-en-el-esquema)

---

### 📦 Estructura del módulo de base de datos

```
src/
├─ config/
│  ├─ configuration.ts           # carga y tipa variables .env
│  └─ validation.schema.ts       # validación Joi
├─ database/
│  ├─ data-source.ts             # instancia única de DataSource
│  ├─ database.module.ts         # @Global() + TypeOrmModule.forRoot
│  ├─ migrations/                # *.ts generadas por CLI
│  └─ seeds/seed.ts              # datos iniciales (categorías, roles)
```

Este módulo **no contiene lógica de negocio**. Solo orquesta la conexión, migraciones y exportación del contexto de base de datos al resto de la aplicación.

---

### 🌐 Variables de entorno y validación

`.env`:

```ini
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=larpingdb
APP_PORT=3000
JWT_SECRET=secret
JWT_EXPIRES_IN=3600
```

Estas variables son validadas en `validation.schema.ts`, que aborta el arranque si faltan claves o el formato es incorrecto. Pon las que vayas a utilizar, esas son de ejemplo.

---

### 🧩 Configuración centralizada (`configuration.ts`)

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

### ⚙️ Configuración del ORM (`data-source.ts`)

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

### 📦 Módulo de base de datos (`database.module.ts`)

```ts
@Global()
@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
```

El `app.module.ts` simplemente importa este `DatabaseModule` y delega completamente la configuración.

---

### 🧪 Migraciones y Seeds

Scripts:

```json
"scripts": {
  "typeorm":            "ts-node -r tsconfig-paths/register node_modules/typeorm/cli",
  "migration:generate": "npm run typeorm -- migration:generate -d src/database/data-source.ts src/database/migrations/InitSchema",
  "migration:run":      "npm run typeorm -- migration:run      -d src/database/data-source.ts",
  "seed":               "ts-node src/database/seeds/seed.ts"
}
```

Pasos:

1. `npm run migration:generate` → genera todo el DDL (extensiones, enums, tablas, índices).
2. `npm run migration:run` → aplica en la base de datos.
3. `npm run seed` → inserta categorías de eventos y rol “Líder”.

---

### 🗃️ Vista materializada `search_index`

Se crea vía SQL en una migración manual (por problemas con alias en CLI):

```ts
await queryRunner.query(`
  CREATE MATERIALIZED VIEW search_index AS /* SELECT UNION ALL … */;
  CREATE INDEX gin_si_tsv ON search_index USING gin(tsv);
`);
```

Se refresca con:

```sql
REFRESH MATERIALIZED VIEW CONCURRENTLY search_index;
```

---

### 🔎 Verificación rápida

```bash
psql -d larping_and_go -c "\dt"                 # lista tablas
psql -d larping_and_go -c "SELECT * FROM event_categories;"
```

---

### 🛠️ Solución de problemas frecuentes

| Error                                                   | Motivo                                          | Solución                                    |
| ------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------- |
| **Given data source file must contain only one export** | `data-source.ts` exporta más de una cosa        | Deja solo `export const AppDataSource …`.   |
| **Cannot build query because main alias is not set**    | Vista con expresión vacía o sin `FROM`          | Excluir del glob y construir vía SQL.       |
| **un identificador entre comillas está inconcluso**     | `@Index` con comilla sobrante (`… 'confirmed"`) | Corrige la entidad y regenera la migración. |

---

### 🔄 Ciclo de cambios futuros en el esquema

Los futuros cambios de esquema siguen el ciclo recomendado:

> **Editar entidad → **`** → Pull Request → **`** en staging/prod**

Este flujo garantiza trazabilidad, control de versiones y evita errores inesperados en entornos reales.

---

Este enfoque garantiza una base de datos robusta, validada, fácilmente versionable y totalmente desacoplada de la lógica de negocio.


---

© 2025 – Larping & Go. Todos los derechos reservados.
