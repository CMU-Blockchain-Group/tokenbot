import { Client as DiscordClient, Collection } from 'discord.js'
import { connect, WalletConnection } from 'near-api-js'
import { InMemoryKeyStore } from 'near-api-js/lib/key_stores'
import { Service } from 'typedi'
import { Command } from './Command'
import { settings as configuration } from './config/config'
import getConfig from './getConfig'
import { ActionManager } from './managers/ActionManager'
import { BotClient, BotSettings, NearProvider } from './types'

@Service()
export class Client extends DiscordClient implements BotClient {
  public settings: BotSettings
  private nearProvider: NearProvider | null
  private readonly nearConfig: any

  constructor(private readonly actionManager: ActionManager) {
    super(configuration.clientOptions ?? {})
    this.settings = configuration
    this.nearProvider = null
    this.nearConfig = getConfig(process.env.NODE_ENV ?? 'development')
    this.initialize()
  }

  public async getNearProvider(): Promise<NearProvider> {
    if (this.nearProvider === null) {
      const near = await connect({
        deps: {
          keyStore: new InMemoryKeyStore()
        },
        ...this.nearConfig
      })
      const wallet = new WalletConnection(near, 'tokenbot')
      this.nearProvider = {
        near: near,
        wallet: wallet
      }
    }
    return this.nearProvider
  }

  private initialize(): void {
    try {
      this.actionManager.initializeCommands(this)
      this.actionManager.initializeEvents(this)
    } catch (e) {
      console.error(`Could not initialize bot: ${e as string}`)
    }
  }

  public get commands(): Collection<string, Command> {
    return this.actionManager.commands
  }
}
