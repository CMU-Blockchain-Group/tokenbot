import BN from "bn.js";
import { Message } from "discord.js";
import { Command } from "../Command";
import { BotClient, NearProvider } from "../types";

export default class SendMoney extends Command {
  private readonly getNearProvider: () => Promise<NearProvider>;

  constructor(client: BotClient) {
    super(client, {
      name: "send$",
      description: "Pings the bot.",
      category: "Information",
      usage: client.settings.prefix.concat("send$"),
      cooldown: 1000,
      requiredPermissions: ["SEND_MESSAGES"],
    });
    this.getNearProvider = client.getNearProvider;
    this.client = client;
  }

  public async run(message: Message): Promise<void> {
    const { account } = await this.client.getNearProvider();
    const contentSplit = message.content.split(" ");
    const accountRx = contentSplit[1];
    if (contentSplit.length !== 3) {
      await super.respond(
        message.channel,
        "Please enter the receiver's account address as the first argument and how many coins you would like to send as the second argument"
      );
      return;
    }
    let amount: number;
    try {
      amount = parseInt(contentSplit[2]);
    } catch (e) {
      await super.respond(message.channel, "Coin argument must be an integer");
      return;
    }

    await account.sendMoney(accountRx, new BN(amount));
    await super.respond(message.channel, "Money Sent!");
  }
}
