import 'dotenv/config';              // carga .env fuera de Nest
import * as path from 'path';
import { DataSource } from 'typeorm';
import config from '../config/configuration';   // función registerAs → llamar como config()

const cfg = config();                // leer el objeto AppConfig

// Glob para encontrar cualquier *.entity.ts o *.view.ts dentro de modules
const entitiesPath = path.join(__dirname, '../modules/**/domain/entities/*{.entity,.view}.{ts,js}').replace(/\\/g, '/');;
//const viewsPath = path.join(__dirname, '..modules/**/domain/view-entities/*.view.{ts,js}').replace(/\\/g, '/'); //Mejor las vistas las añado manualmente a la base de datos para evitar problemas
const migrationsPath = path.join(__dirname, './migrations/*.{ts,js}');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: cfg.db.host,
  port: cfg.db.port,
  username: cfg.db.user,
  password: cfg.db.pass,
  database: cfg.db.name,
  ssl: cfg.db.ssl,                   // true en producción si usas TLS
  logging: cfg.app.port === 3000,    // verbose sólo en dev
  synchronize: false,                // siempre false: usamos migraciones ➜ ¡nunca true en producción!
  entities: [entitiesPath],
  migrations: [migrationsPath],
});

//export default AppDataSource;

