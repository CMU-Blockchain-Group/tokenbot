import { Message } from "discord.js";
import { Command } from "../Command";
import { BotClient } from "../types";
import BN from "bn.js";

export default class SendMoney extends Command {

  constructor(protected client: BotClient) {
    super(client, {
      name: "sendMoney",
      description: "sends money on NEAR testnet",
      category: "Utility",
      usage: `${client.settings.prefix}sendMoney recipient amount`,
      cooldown: 1000,
      requiredPermissions: [],
    });
  }

  public async run(message: Message): Promise<void> {
    const { account } = await this.client.getNearProvider();

    const content = message.content;
    if (!content) {
      throw Error("message content is empty!");
    }

    const params = content.split(" ");
    if (params.length !== 3) {
      await super.respond(
        message.channel,
        `expected 2 parameters, got ${params.length - 1}.\n usage: ${
          super.conf.usage
        }`
      );
      return;
    }

    const [, recipient, amount] = params;
    try {
      const bn = new BN(amount, 10);
      const res = await account.sendMoney(recipient, bn);
      console.log(res);
    } catch (err) {
      console.error(err);
      await super.respond(message.channel, "invalid amount");
      return;
    }
  }
}
