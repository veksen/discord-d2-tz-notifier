import { ChannelType, Client, Events, GatewayIntentBits } from "discord.js";
import { setup as setupScheduler } from "./scheduler";
import { setupReactEmbed, setupRoles, updateTerrorZones } from "./terror-zones";
import dotenv from "dotenv";

dotenv.config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
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

  await channel.bulkDelete(100, true);

  await setupReactEmbed(channel);
  await setupRoles(channel.guild);

  await updateTerrorZones(channel);

  setupScheduler(async () => {
    updateTerrorZones(channel);
  });
});

client.on(Events.MessageReactionAdd, (reaction, user) => {
  console.log("Reaction added");
  console.log(reaction.emoji.name);
});

client.login(process.env.DISCORD_TOKEN);
