import { IChatRepository } from "src/modules/chat/application/ports/i-chat.repository";

// src/modules/guilds/application/helpers/join-guild-chat.ts
export async function joinGuildChat(
  guildId: string,
  userId: string,
  charId: string,
  chats: IChatRepository,
) {
  const channel = await chats.findGuildChannel(guildId);
  if (channel) {
    await chats.upsertParticipant(channel.id, userId, charId);
  }
}
