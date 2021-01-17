import { BotClient, BotEvent } from '../types'

export default class Ready implements BotEvent {
  private readonly client: BotClient
  constructor(client: BotClient) {
    this.client = client
  }

  name(): string { return 'Ready' }

  public async run(): Promise<void> {
    if (this.client.user !== null) {
      console.log(`${this.client.user.username} is running.`)
      await this.client.user.setPresence(this.client.settings.presence)
    }
  }
}
