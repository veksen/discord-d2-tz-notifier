import { Guild, Role, TextChannel } from "discord.js";

export async function findMessageByEmbedContent(
  channel: TextChannel,
  embedContent: string
) {
  return channel.messages.fetch().then((messages) => {
    return messages.find((message) => {
      return message.embeds.some((embed) => {
        return embed.title === embedContent;
      });
    });
  });
}

export function getRoleByName(guild: Guild, roleName: string) {
  return guild.roles.cache.find((role) => role.name === roleName);
}

export function uniqueRoles(roles: Role[]) {
  const roleNames = roles.map((role) => role.name);
  return roles.filter((role, index) => {
    return roleNames.indexOf(role.name) === index;
  });
}
