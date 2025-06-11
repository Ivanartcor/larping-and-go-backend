import { join } from 'path';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {

  /* ─────────────────────────────────────────────── */
  /* 1 · Crear App con CORS REST                    */
  /* ─────────────────────────────────────────────── */
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      cors: /*{
        origin: [                             // dominios que podrán llamar a la API REST
          /localhost:\d+$/,                   //   http://localhost:xxxx
          /\.midominio\.com$/                 //   cualquier sub-dominio
        ],
        credentials: true,
      },
      */
     true
    },
  );

  /* ─────────────────────────────────────────────── */
  /* 2 · Archivos estáticos (avatars, emblems, …)   */
  /* ─────────────────────────────────────────────── */
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/static/',                       // http://host/static/avatars/xyz.jpg
  });

  /* ─────────────────────────────────────────────── */
  /* 3 · Socket.IO – CORS idéntico a REST           */
  /* ─────────────────────────────────────────────── */

  const adapter = new IoAdapter(app);
  /*
  adapter.createIOServer = (port: number, opts?: any) => {
    return new Server(port, {
      cors: {
        origin: [
          /localhost:\d+$/,
          /\.midominio\.com$/,
        ],
        credentials: true,
      },
      ...opts,
    });
  };
  */
  app.useWebSocketAdapter(adapter);



   app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  /* ─────────────────────────────────────────────── */
  /* 4 · Arrancar servidor                          */
  /* ─────────────────────────────────────────────── */
  const port = process.env.APP_PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀  HTTP & WS corriendo en http://localhost:${port}`);
}


bootstrap();
