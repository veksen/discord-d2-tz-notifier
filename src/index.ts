import { ChannelType, Client, Events, GatewayIntentBits } from "discord.js";
import { setup as setupScheduler } from "./scheduler";
import { setupReactEmbed, setupRoles, updateTerrorZones } from "./terror-zones";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  const tzChannel = readyClient.channels.cache.find(
    (channel) => channel.type !== ChannelType.DM && channel.name === "tz"
  );
  const rolesChannel = readyClient.channels.cache.find(
    (channel) => channel.type !== ChannelType.DM && channel.name === "tz-roles"
  );

  if (!tzChannel || !rolesChannel) {
    throw new Error("Channel not found");
  }

  if (
    tzChannel.type !== ChannelType.GuildText ||
    rolesChannel.type !== ChannelType.GuildText
  ) {
    throw new Error("Channel is not text");
  }

  await setupReactEmbed(rolesChannel);
  await setupRoles(rolesChannel.guild);

  await updateTerrorZones(tzChannel);

  setupScheduler(async () => {
    await updateTerrorZones(tzChannel);
  });
});

client.on(Events.MessageReactionAdd, (reaction, user) => {
  console.log("Reaction added");
  console.log(reaction.emoji.name);
});

client.login(process.env.DISCORD_TOKEN);
