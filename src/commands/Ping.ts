import { Message } from "discord.js";
import { Command } from "../Command";
import { BotClient, NearProvider } from "../types";

export default class Ping extends Command {
  // * Ping prolly doesn't need NearProvider, but this is how you'd get access to it from within an event
  private readonly getNearProvider: () => Promise<NearProvider>;

  constructor(client: BotClient) {
    super(client, {
      name: "ping",
      description: "Pings the bot.",
      category: "Information",
      usage: client.settings.prefix.concat("ping"),
      cooldown: 1000,
      requiredPermissions: ["SEND_MESSAGES"],
    });
    this.getNearProvider = client.getNearProvider;
  }

  public async run(message: Message): Promise<void> {
    await super.respond(message.channel, "Pong!");
  }
}
