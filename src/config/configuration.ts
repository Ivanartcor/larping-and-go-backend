import { registerAs } from '@nestjs/config';

export interface AppConfig {
  db: {
    host: string;
    port: number;
    user: string;
    pass: string;
    name: string;
    ssl: boolean;
  };
  app: {
    port: number;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export default registerAs('config', (): AppConfig => ({
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USERNAME ?? 'postgres',
    pass: process.env.DB_PASSWORD ?? '',
    name: process.env.DB_NAME ?? 'larping_and_go',
    ssl: process.env.NODE_ENV === 'production',
  },
  app: {
    port: Number(process.env.APP_PORT ?? 3000),
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'change‑me',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '3600s',
  },
}));
