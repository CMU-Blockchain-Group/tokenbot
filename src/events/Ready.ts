import { BotClient, BotEvent } from '../types'

export default class Ready implements BotEvent {
  constructor (private readonly client: BotClient) { }

  name (): string { return 'Ready' }

  public async run (): Promise<void> {
    if (this.client.user !== null) {
      console.log(`${this.client.user.username} is running.`)
      await this.client.user.setPresence(this.client.settings.presence)
    }
  }
}
