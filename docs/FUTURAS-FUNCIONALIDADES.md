# 🛠️ Funcionalidades Futuras y Pendientes de Implementación tras el MVP

Este documento recoge todas las funcionalidades planificadas, ideas en desarrollo y aspectos pendientes de implementación en el ecosistema **Larping & Go**, según la documentación técnica del proyecto. Todas estas funcionalidades están previstas para después del lanzamiento inicial de la plataforma, una vez completada la primera versión funcional (MVP).

---

## 📑 Índice


1. [Estado general](#🔄-estado-general)
2. [Funcionalidades futuras](#🔮-funcionalidades-futuras)
3. [Aspectos técnicos y soporte](#🚧-aspectos-técnicos-y-soporte-aún-no-abordados)
4. [Consideraciones finales](#📌-consideraciones-finales)

---

## 🔄 Estado general

* Algunas funcionalidades ya cuentan con modelo de datos y diseño aprobado.
* Otras han sido esbozadas como mejoras futuras o complementos a módulos existentes.
* Muchas están planificadas para fases posteriores según prioridades y necesidades reales de la comunidad.

---

## 🔮 Funcionalidades Futuras

   * Reacciones en chat
   * Notificaciones y alertas
   * Búsqueda y exploración
   * Perfil público
   * Funcionalidades sociales
   * Métricas y estadísticas
   * Comentarios moderados
   * Reputación y validación
   * Biblioteca compartida
   * Integración con calendarios externos
   * Moderación y seguridad
   * Gamificación y mejoras


### 🧩 Sistema de Reacciones en Chat (`chat_reactions`)

* **Objetivo**: permitir a los usuarios reaccionar con emojis a mensajes en canales de chat.
* **Estado actual**: tabla prevista (`chat_reactions`) sin implementación.
* **Relación**: `chat_messages` 1─N `chat_reactions`.
* **Campos previstos**:

  * `message_id` (FK)
  * `user_id` (FK)
  * `emoji_code` (unicode o alias tipo `:thumbsup:`)
  * `created_at`
* **Lógica esperada**:

  * Un usuario puede reaccionar una vez con un mismo emoji.
  * WS `reaction:add`, `reaction:remove`, `reaction:update`.

### 📥 Notificaciones y sistema de alertas

* **Tipos previstos**:

  * Nuevos eventos globales.
  * Cambios de estado en eventos donde se confirmó asistencia.
  * Menciones en anuncios, encuestas o mensajes.
* **Canales**:

  * WebPush
  * Email
  * Badge/contador in-app
* **Estado**: lógica conceptual, no implementada.

### 🔍 Búsqueda y exploración

* Búsquedas contextuales por sección (mensajes, hermandades, eventos...).
* Buscador global con filtros por tipo (eventos, hermandades, personajes, normativas).
* Explorador de personajes activos (galería).
* Vista de hermandades abiertas y próximos eventos.
* **Estado**: planificado. Requiere integración con índice `GIN` y endpoints unificados.

### 🧑‍🌾 Perfil público del usuario

* Basado en personaje activo (nombre, imagen, descripción).
* Hermandad actual visible (si se permite).
* Eventos próximos confirmados (opcional).
* Lista de personajes alternativos (según configuración de privacidad).
* Botón para enviar mensaje privado.

### 🤝 Funcionalidades sociales

* Muro público/tablero personal: publicaciones asociadas al personaje activo.
* Seguimiento de usuarios: ver actividad pública de otros jugadores.
* Menciones/etiquetas: vincular personajes en publicaciones, eventos o crónicas.
* **Futuro**: comentarios, reacciones, compartir publicaciones y crónicas.

### 📊 Métricas y Estadísticas

* **Para administradores**:

  * Número de eventos creados por mes.
  * Participación media por evento.
  * Asistencia efectiva vs. registrada.
* **Para usuarios**:

  * Historial de eventos asistidos.
  * Resumen de interacciones.
* **Estado**: idea en fase de diseño.

### 📝 Comentarios Moderados (en eventos y anuncios)

* Objetivo: permitir interacciones breves bajo control de moderadores o administradores.
* Estado: pendiente de definir entidad y lógica.

### 👥 Sistema de reputación / validación

* Posibilidad de marcar asistencia real, aportar feedback o votos positivos a otros jugadores.
* Complemento opcional al sistema de asistencia.
* Estado: no definido todavía.

### 📚 Biblioteca compartida

* Compartición de reglas, documentos de ambientación o recursos entre hermandades.
* Asociación con permisos personalizados por rol o canal.
* Estado: fase exploratoria.

### 🌐 Integración con calendarios externos (Google Calendar, iCal)

* Exportación de eventos globales y personales a formatos compatibles.
* Posibilidad de notificación con recordatorios.
* Estado: idea a validar.

### 🚨 Moderación y seguridad

* Reporte de usuarios, eventos, mensajes.
* Sistema de permisos para publicar eventos globales (solicitud, aprobación, revocación).
* Moderadores y administradores con roles especiales.
* Panel de control de contenido (futuro).

### 🧐 Gamificación y futuras mejoras

* Insignias por participación o logros.
* Crónicas de eventos o diarios personales.
* Escaneo de códigos QR en eventos físicos.
* Clasificaciones de hermandades.
* Sistema de reputación y votación comunitaria.
* Niveles de organizador de eventos y recomendaciones automáticas.

---

## 🚧 Aspectos técnicos y soporte aún no abordados

### 🎯 Internacionalización avanzada (i18n)

* Traducción de contenido dinámico: anuncios, eventos, encuestas.
* Selección de idioma por usuario.
* Estado: solo base técnica en `i18n.module.ts`.

### 💾 Copias de seguridad y restauración

* Backup periódico de eventos, chat, usuarios y contenido multimedia.
* Restauración por administrador.
* Estado: no iniciado.

### 🧪 Testing e2e ampliado

* Casos de uso complejos aún no automatizados:

  * Subida/borrado de media
  * Conversión de tipos de anuncio (poll/general)
  * Flujos de moderación complejos

---

## 📌 Consideraciones finales

Este documento será actualizado conforme se avancen en fases de desarrollo, despliegue y evaluación de nuevas necesidades dentro de la comunidad. Muchas de estas funcionalidades dependen del feedback de los usuarios y la estabilidad de los módulos base ya implementados.
