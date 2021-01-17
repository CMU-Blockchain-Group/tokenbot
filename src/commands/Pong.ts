import { Message, MessageEmbed } from "discord.js";
import { Command } from "../Command";
import { BotClient, EmbedOrMessage, NearProvider } from "../types";

export default class Pong extends Command {
  // * Ping prolly doesn't need NearProvider, but this is how you'd get access to it from within an event
  private readonly getNearProvider: () => Promise<NearProvider>;

  constructor(client: BotClient) {
    super(client, {
      name: "pong",
      description: "Pongs the bot.",
      category: "Information",
      usage: client.settings.prefix.concat("pong"),
      cooldown: 1000,
      requiredPermissions: ["SEND_MESSAGES"],
    });
    this.getNearProvider = client.getNearProvider;
  }

  public async run(message: Message): Promise<void> {
    const messageCust: MessageEmbed = new MessageEmbed({
      title: "custom command!",
      description: "some desc here",
      color: "PURPLE",
      thumbnail: {
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FvH69OyJ-0hQ%2Fhqdefault.jpg&f=1&nofb=1",
        height: 300,
        width: 200
      },
      image: {
        url: "http://gif-free.com/uploads/posts/2020-12/1607944467_2.gif",
        height: 200,
        width: 300
      }
    });
    await super.respond(message.channel, messageCust as EmbedOrMessage);
  }
}
