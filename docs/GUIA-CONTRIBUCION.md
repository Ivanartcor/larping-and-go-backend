# 🤝 Guía de Contribución y Buenas Prácticas - Larping & Go

Este documento tiene como objetivo establecer las pautas para colaborar en el desarrollo de **Larping & Go**, garantizando un entorno de trabajo colaborativo, mantenible y profesional.

---

## ✍️ 1. Requisitos previos

Antes de enviar cualquier contribución, asegúrate de:

* Haber clonado el repositorio correctamente.
* Haber leído la [Licencia de Uso](./LICENCIA.md).
* Tener conocimientos sobre **NestJS**, **Angular**, **PostgreSQL** y arquitectura **modular**.
* Seguir el estándar de codificación (ver sección 3).

---

## 📊 2. Tipos de contribuciones aceptadas

* Corrección de errores (bugs)
* Mejoras de rendimiento
* Refactorizaciones legibles y justificadas
* Nuevas funcionalidades compatibles con el roadmap
* Mejora de la documentación o internacionalización

*Las funcionalidades deben alinearse con la filosofía y objetivos del proyecto.*

---

## 🤗 3. Buenas prácticas generales

* Escribe código **limpio, legible y documentado**.
* Usa nombres significativos para variables, funciones y clases.
* Mantén la coherencia con la arquitectura DDD + Clean Architecture del proyecto.
* No añadas lógica duplicada o acoplada entre módulos.
* Las validaciones deben estar claramente separadas de la lógica de negocio.
* Las pruebas deben acompañar las nuevas funcionalidades.

---

## 🚫 4. Prácticas a evitar

* No modificar entidades compartidas sin justificación o sin comunicación previa.
* No subir archivos generados (como `dist/`, `.env.local`, etc.).
* No mezclar varios cambios grandes en un solo commit o PR.

---

## 📂 5. Estructura de commits

Utiliza el siguiente formato:

```
[type] breve descripción

Ejemplos:
[fix] corrige error en el flujo de autenticación
[feat] agrega sistema de insignias
[refactor] mejora la estructura del repositorio guild
[docs] actualiza documentación de endpoints
```

---

## 📖 6. Documentación de cambios

Cualquier cambio que afecte a la API, base de datos o funcionalidades debe ir acompañado de:

* Comentario en el PR describiendo el cambio.
* Actualización en el README correspondiente.
* Notas de migración si es necesario.

---

## ✉️ 7. Proceso para contribuir

1. Haz un fork del repositorio.
2. Crea una rama con un nombre descriptivo (`feat/chat-typing`, `fix/auth-flow`, etc.).
3. Realiza los cambios siguiendo esta guía.
4. Abre un pull request hacia la rama principal.
5. Espera revisión y responde a los comentarios.

---

## 🚀 8. Agradecimientos

Gracias por tu interés en mejorar **Larping & Go**. Este proyecto está impulsado por la pasión por el LARP y la tecnología colaborativa. Cada aporte suma y fortalece la comunidad.

---

Para dudas, sugerencias o revisiones importantes, puedes contactar al mantenedor principal: **Iván Arteaga Cordero** - [ivanartcor@gmail.com](mailto:ivanartcor@gmail.com)
