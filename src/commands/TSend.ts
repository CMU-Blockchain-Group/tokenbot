import { Message } from "discord.js";
import { Command } from "../Command";
import { BotClient, NearProvider } from "../types";
import {utils} from "near-api-js";
import BN from "bn.js";

export default class TSend extends Command {

  private readonly getNearProvider: () => Promise<NearProvider>;

  constructor(client: BotClient) {
    super(client, {
      name: "tsend",
      description: "Sends NEAR to a designated account",
      category: "Information",
      usage: client.settings.prefix.concat("tsend"),
      cooldown: 2000,
      requiredPermissions: ["SEND_MESSAGES"],
    });
    this.getNearProvider = client.getNearProvider;
  }

  public async run(message: Message): Promise<void> {

    //extract args from message
    const args = message.content.slice(1).trim().split(/ +/);

    //Get NEAR provider and extract near connection
    const near_provider = await this.getNearProvider();
    const near_thing = near_provider.near;

    //Check validity of arguments
    if(args=== undefined || args[0] === undefined || args[1] == undefined || args[2] === undefined) {
      await super.respond(message.channel,"One or more arguments is invalid.Please try again");
      return;
    }

    //Set receiver
    const receiver : string = args[1];
    let senderAccount = await near_thing.account("another.testnet");

    var amount: string | null = "0";
    var amount_in_BN: BN = new BN("0",10);

    //Set amount
    try{
     amount = utils.format.parseNearAmount(args[2]);
     amount_in_BN = new BN(args[2], 10);
    }
    catch(e){
      await super.respond(message.channel,'Argument error. More details below. Please try again');
      await super.respond(message.channel, e);
      return;
    }
    try {
      //Give User some feedback
      await super.respond(
        message.channel,
        `Sending ${utils.format.formatNearAmount(amount ?? "10")}Ⓝ to ${receiver}`
      );
      await super.respond(
        message.channel,
        "Please be patient while your transaction is being processed"
      );

      //Send the money using user data
      const result = await senderAccount.sendMoney(receiver, amount_in_BN);

      //Dead code, but may be useful later for more features
      //const processed_transaction = JSON.stringify(result.transaction);

      //Respond with feedback
      await super.respond(
        message.channel,
        `-------------------------------------------------------------------------------------------- \n OPEN LINK BELOW to see transaction in NEAR Explorer! \n ${near_thing.config.explorerUrl}/transactions/${result.transaction.hash} \n --------------------------------------------------------------------------------------------`
      );

      await super.respond(message.channel, `Transaction Results: SUCCESS`);

    } catch (error) {
      // return an error if unsuccessful
      await super.respond(message.channel, `Transaction Results: Failure`);
      await super.respond(message.channel,error.message);

      return;
    }
  }
}
