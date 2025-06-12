# 🧰 Guía completa para la instalación y ejecución local del backend de Larping & Go

Esta guía detalla todos los pasos necesarios para instalar, configurar y ejecutar el backend del proyecto **Larping & Go** en un entorno local. Es ideal tanto para desarrolladores que deseen contribuir como para quienes quieran probar la aplicación.

---

### 📋 Requisitos previos

Asegúrate de tener instalado lo siguiente en tu sistema:

* [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
* [Nest](https://nestjs.com/) (versión 10 o superior recomendada)
* [npm](https://www.npmjs.com/) o [pnpm](https://pnpm.io/)
* [PostgreSQL](https://www.postgresql.org/) (motor de base de datos relacional utilizado por el proyecto)
* [Git](https://git-scm.com/) (para clonar el repositorio)

---

### 📦 Clonar el repositorio

```bash
git clone https://github.com/<TU_USUARIO>/larping-and-go-backend.git
cd larping-and-go-backend
```

---

### 📥 Instalación de dependencias

Ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm install
```

Esto instalará todas las dependencias necesarias declaradas en el archivo `package.json`.

---

### ⚙️ Configuración de variables de entorno

Copia el archivo de ejemplo `.env.example` y crea tu propio archivo `.env`:

```bash
cp .env.example .env
```

Luego, edita el archivo `.env` con los valores correspondientes. A continuación se listan las variables utilizadas:

```ini
DB_HOST=           # Dirección del host de la base de datos
DB_PORT=           # Puerto de conexión (por defecto 5432)
DB_USERNAME=       # Usuario de PostgreSQL
DB_PASSWORD=       # Contraseña de PostgreSQL
DB_NAME=           # Nombre de la base de datos
APP_PORT=          # Puerto en el que se ejecutará la API
JWT_SECRET=        # Clave secreta para generación de tokens
JWT_EXPIRES_IN=    # Tiempo de expiración del token JWT
```

> El archivo `validation.schema.ts` valida estas variables en el arranque. Si alguna falta o tiene formato incorrecto, la aplicación no iniciará.

---

### 🚀 Levantar el servidor

Puedes ejecutar la aplicación en distintos modos:

* **Modo desarrollo** (con recarga automática):

```bash
npm run start:dev
```

* **Modo producción**:

```bash
npm run start:prod
```

* **Modo estándar**:

```bash
npm run start
```

---

### 🧪 Ejecutar pruebas

El backend incluye pruebas unitarias y end-to-end. Puedes ejecutarlas con los siguientes comandos:

```bash
# Pruebas unitarias
npm run test

# Pruebas end-to-end (e2e)
npm run test:e2e

# Reporte de cobertura
npm run test:cov
```

---

### ☁️ Despliegue

Para entornos de producción, consulta la documentación oficial:
👉 [https://docs.nestjs.com/deployment](https://docs.nestjs.com/deployment)

También puedes usar la plataforma oficial **Mau** para desplegar rápidamente en AWS:

```bash
npm install -g mau
mau deploy
```

---

### 📚 Recursos adicionales

* 📘 Documentación oficial de NestJS: [https://docs.nestjs.com](https://docs.nestjs.com)
* 💬 Canal de Discord: [https://discord.gg/G7Qnnhy](https://discord.gg/G7Qnnhy)
* 🎓 Cursos en vídeo: [https://courses.nestjs.com](https://courses.nestjs.com)
* 🛠 Herramienta DevTools: [https://devtools.nestjs.com](https://devtools.nestjs.com)
