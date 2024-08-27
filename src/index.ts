import { ChannelType, Client, Events, GatewayIntentBits } from "discord.js";
import { setup as setupScheduler } from "./scheduler";
import { setupReactEmbed, setupRoles, updateTerrorZones } from "./terror-zones";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  const channel = readyClient.channels.cache.find(
    (channel) => channel.type !== ChannelType.DM && channel.name === "testing"
  );

  if (!channel) {
    throw new Error("Channel not found");
  }

  if (channel.type !== ChannelType.GuildText) {
    throw new Error("Channel is not text");
  }

  await setupReactEmbed(channel);
  await setupRoles(channel.guild);

  await updateTerrorZones(channel);

  setupScheduler(async () => {
    await channel.bulkDelete(100, true);
    await updateTerrorZones(channel);
  });
});

client.on(Events.MessageReactionAdd, (reaction, user) => {
  console.log("Reaction added");
  console.log(reaction.emoji.name);
});

client.login(process.env.DISCORD_TOKEN);
