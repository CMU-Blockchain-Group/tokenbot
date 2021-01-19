import { Client as DiscordClient, Collection } from "discord.js";
import { connect, WalletConnection, KeyPair, keyStores } from "near-api-js";
import { InMemoryKeyStore } from "near-api-js/lib/key_stores";
import "reflect-metadata";
import { Service } from "typedi";
import { Command } from "./Command";
import { settings as configuration } from "./config/config";
import getConfig from "./getConfig";
import { ActionManager } from "./managers/ActionManager";
import { BotClient, BotSettings, NearProvider } from "./types";

@Service()
export class Client extends DiscordClient implements BotClient {
  public settings: BotSettings;
  private nearProvider: NearProvider | null;
  private readonly nearConfig: any;

  constructor(private readonly actionManager: ActionManager) {
    super(configuration.clientOptions ?? {});
    this.settings = configuration;
    this.nearProvider = null;
    this.nearConfig = getConfig(process.env.NODE_ENV ?? "development");
    this.initialize();
  }

  public async getNearProvider(): Promise<NearProvider> {
    //if (this.nearProvider === null) {
      //some very questionable code for conencting
      const networkId = "testnet";
      const sender = "another.testnet";
      // sets up an empty keyStore object in memory using near-api-js
      const keyStore = new keyStores.InMemoryKeyStore();
      console.log(keyStore);
      // creates a keyPair from the private key provided in your .env file
      console.log(process.env.SENDER_PRIVATE_KEY);
      const keyPair = KeyPair.fromString(
        process.env.SENDER_PRIVATE_KEY ?? "NOPE"
      );
      // adds the key you just created to your keyStore which can hold multiple keys
      await keyStore.setKey(networkId, sender, keyPair);
      console.log(keyStore);
      // configuration used to connect to NEAR
      const config = {
        networkId,
        keyStore,
        nodeUrl: `https://rpc.${networkId}.near.org`,
        walletUrl: `https://wallet.${networkId}.near.org`,
        helperUrl: `https://helper.${networkId}.near.org`,
        explorerUrl: `https://explorer.${networkId}.near.org`,
      };
      //configure near connection
      const near = await connect(config);
      /*
      //configure wallet
      var wallet = null;
      try {
        wallet = new WalletConnection(near, "another.testnet");
      } catch (e) {
        wallet = null;
      }
      */
      this.nearProvider = {
        near: near,
        wallet: null,
        config: config
      };
    //}
    return this.nearProvider;
  }

  private initialize(): void {
    try {
      this.actionManager.initializeCommands(this);
      this.actionManager.initializeEvents(this);
    } catch (e) {
      console.error(`Could not initialize bot: ${e as string}`);
    }
  }

  public get commands(): Collection<string, Command> {
    return this.actionManager.commands;
  }
}
