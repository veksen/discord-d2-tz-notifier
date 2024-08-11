import { Guild, Role, TextChannel } from "discord.js";
import { data, emojiMapping } from "./data";
import { scrape } from "./scrape";
import { findMessageByEmbedContent, getRoleByName, uniqueRoles } from "./utils";

export async function setupReactEmbed(channel: TextChannel) {
  const embed = {
    title: "React to be notified about upcoming Terror Zones",
    description: "Pick by tier level",
    fields: [
      {
        name: "S-Tier XP",
        value: data
          .filter((d) => d.xp === "S")
          .map((d) => d.name)
          .join("\n"),
      },
      {
        name: "A-Tier XP",
        value: data
          .filter((d) => d.xp === "A")
          .map((d) => d.name)
          .join("\n"),
      },
      {
        name: "B-Tier XP",
        value: data
          .filter((d) => d.xp === "B")
          .map((d) => d.name)
          .join("\n"),
      },
      {
        name: "C-Tier XP",
        value: data
          .filter((d) => d.xp === "C")
          .map((d) => d.name)
          .join("\n"),
      },
      {
        name: "D-Tier XP",
        value: data
          .filter((d) => d.xp === "D")
          .map((d) => d.name)
          .join("\n"),
      },
      {
        name: "F-Tier XP",
        value: data
          .filter((d) => d.xp === "F")
          .map((d) => d.name)
          .join("\n"),
      },
      {
        name: "S-Tier MF",
        value: data
          .filter((d) => d.mf === "S")
          .map((d) => d.name)
          .join("\n"),
      },
      {
        name: "A-Tier MF",
        value: data
          .filter((d) => d.mf === "A")
          .map((d) => d.name)
          .join("\n"),
      },
      {
        name: "B-Tier MF",
        value: data
          .filter((d) => d.mf === "B")
          .map((d) => d.name)
          .join("\n"),
      },
      {
        name: "C-Tier MF",
        value: data
          .filter((d) => d.mf === "C")
          .map((d) => d.name)
          .join("\n"),
      },
      {
        name: "D-Tier MF",
        value: data
          .filter((d) => d.mf === "D")
          .map((d) => d.name)
          .join("\n"),
      },
      {
        name: "F-Tier MF",
        value: data
          .filter((d) => d.mf === "F")
          .map((d) => d.name)
          .join("\n"),
      },
    ],
  };

  let reactMessage = await channel.messages.fetch().then((messages) => {
    return messages.find((message) => {
      return message.embeds.some((embed) => {
        return (
          embed.title === "React to be notified about upcoming Terror Zones"
        );
      });
    });
  });

  if (reactMessage) {
    console.log("found react message, no need to create a new one");
  }

  if (!reactMessage) {
    console.log("no react message found, creating a new one");
    reactMessage = await channel.send({ embeds: [embed] });
    await reactMessage.react(emojiMapping.xp.S);
    await reactMessage.react(emojiMapping.xp.A);
    await reactMessage.react(emojiMapping.xp.B);
    await reactMessage.react(emojiMapping.xp.C);
    await reactMessage.react(emojiMapping.xp.D);
    await reactMessage.react(emojiMapping.xp.F);
    await reactMessage.react(emojiMapping.mf.S);
    await reactMessage.react(emojiMapping.mf.A);
    await reactMessage.react(emojiMapping.mf.B);
    await reactMessage.react(emojiMapping.mf.C);
    await reactMessage.react(emojiMapping.mf.D);
    await reactMessage.react(emojiMapping.mf.F);

    await reactMessage.pin();
  }

  const collector = reactMessage.createReactionCollector({
    filter: (reaction, user) => {
      console.log(reaction.emoji.name);
      if (user.bot) return false;
      return true;
    },
  });

  collector.on("collect", (reaction, user) => {
    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
  });
}

export async function setupRoles(guild: Guild) {
  const rolesMap = [
    { name: "TZ S-Tier XP", color: "#FC6A6A" },
    { name: "TZ A-Tier XP", color: "#1956F3" },
    { name: "TZ B-Tier XP" },
    { name: "TZ C-Tier XP" },
    { name: "TZ D-Tier XP" },
    { name: "TZ F-Tier XP" },
    { name: "TZ S-Tier MF", color: "#FC6A6A" },
    { name: "TZ A-Tier MF", color: "#1956F3" },
    { name: "TZ B-Tier MF" },
    { name: "TZ C-Tier MF" },
    { name: "TZ D-Tier MF" },
    { name: "TZ F-Tier MF" },
  ] as const;

  rolesMap.forEach(async (role) => {
    const guildRole = guild.roles.cache.find((r) => r.name === role.name);
    if (!guildRole) {
      await guild.roles.create({
        name: role.name,
        color: "color" in role ? role.color : undefined,
        mentionable: true,
      });
      console.log(`Created role ${role.name}`);
    }
  });
}

export async function updateTerrorZones(channel: TextChannel) {
  const { current, next } = await scrape();

  const tzMessage = await findMessageByEmbedContent(
    channel,
    "Current Terror Zone"
  );

  if (tzMessage) {
    await tzMessage.delete();
  }

  const currentTzEmbed = {
    title: "Current Terror Zone",
    description: current.name,
    fields: [
      {
        name: "XP",
        value: emojiMapping.tier[current.xp],
      },
      {
        name: "MF",
        value: emojiMapping.tier[current.mf],
      },
    ],
  };

  const nextTzEmbed = {
    title: "Next Terror Zone",
    description: next.name,
    fields: [
      {
        name: "XP",
        value: emojiMapping.tier[next.xp],
      },
      {
        name: "MF",
        value: emojiMapping.tier[next.mf],
      },
      {
        name: "Changes in",
        value: `<t:${next.timeUtc}:R>`,
      },
    ],
  };

  await channel.send({
    embeds: [currentTzEmbed, nextTzEmbed],
  });

  const rolesToMention = [
    getRoleByName(channel.guild, `TZ ${current.xp}-Tier XP`),
    getRoleByName(channel.guild, `TZ ${current.mf}-Tier MF`),
    getRoleByName(channel.guild, `TZ ${next.xp}-Tier XP`),
    getRoleByName(channel.guild, `TZ ${next.mf}-Tier MF`),
  ];

  if (rolesToMention.length === 0) {
    throw new Error("Roles not found");
  }

  const uniqueRolesToMention = uniqueRoles(
    rolesToMention.filter((r): r is Role => Boolean(r))
  );

  await channel.send(uniqueRolesToMention.map((r) => `<@&${r.id}>`).join(" "));
  // await channel.send(`<@&${xpRole.id}> <@&${mfRole.id}-Tier MF>`);
}
