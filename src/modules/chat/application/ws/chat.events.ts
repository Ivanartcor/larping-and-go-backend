export const WS_NS = '/chat';

/* Listados */
export const E_CHANNELS_LIST    = 'channels:list';
export const E_MESSAGES_LIST    = 'messages:list';

/* Mensajes */
export const E_MESSAGE_SEND     = 'message:send';        // c → s
export const E_MESSAGE_NEW      = 'message:new';         // s → c (room)
export const E_MESSAGE_EDIT    = 'message:edit';     // c → s
export const E_MESSAGE_DELETE  = 'message:delete';   // c → s
export const E_MESSAGE_EDITED  = 'message:edited';   // s → room
export const E_MESSAGE_DELETED = 'message:deleted';  // s → room


/* Lectura */
export const E_MESSAGE_READ     = 'message:read';        // c → s
export const E_MESSAGE_READACK  = 'message:read:ack';    // s → c

/* Salas */
export const E_CHANNEL_JOIN     = 'channel:join';        // c → s
export const E_CHANNEL_JOIN_ACK = 'channel:join:ack';    // s → emisor
export const E_CHANNEL_JOINED   = 'channel:joined';      // s → room
export const E_CHANNEL_LEAVE    = 'channel:leave';       // c → s
export const E_CHANNEL_LEFT     = 'channel:left';        // s → room

/* Badges / contadores */
export const E_CHANNEL_UPDATE   = 'channel:update';      // s → u:<id>
export const E_CHANNEL_UNREAD   = 'channel:unread';      // c ↔ s (petición / respuesta)

export const E_PRESENCE_ONLINE  = 'presence:online';
export const E_PRESENCE_OFFLINE = 'presence:offline';
export const E_TYPING_START     = 'typing:start';
export const E_TYPING_STOP      = 'typing:stop';