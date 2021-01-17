# Typescript Token Bot Boilerplate

Get started with a new Discord bot using `discord.js` fast, modified for stronger typing by [CMU Blockchain Group](https://github.com/CMU-Blockchain-Group)

## Usage

This section contains information about where to define new functionality for your Discord bot. For more information about discordjs and making bots in general, check out the [discordjs guide](https://discordjs.guide/)

### Events

Events are kind of like "triggers" that you can set up to run code when certain kinds of things happen (e.g. sending a message, someone joining a server, etc). To set up a new event, define a class that extends the [`BotEvent` type](https://github.com/CMU-Blockchain-Group/tokenbot/blob/a51249e8da0bbab8eb3b78c5f791d7d840bf8338/src/types/bot/Bot.ts#L30), where the `name` method returns the **event name** to listen to as defined in the event section of the [documentation](https://discord.js.org/#/docs/main/stable/class/Client). The event's `run` method is where you write the code to run when the event is triggered. Then you need to add it it to the exported array in `events/index.ts`.

\*Example of Event: **Ready\***

_Ready.ts_

```typescript
// events/Ready.ts
import { Client } from "../Client";
import { Logger } from "../utils/Logger";
import { BotEvent } from "../types";

export default class Ready implements BotEvent {
  public client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async run(): Promise<void> {
    Logger.info("Execute an action when the Ready event is triggered");
  }
}

// events/index.ts
// ... other imports
import { Ready } from "./Ready.ts";
export default [
  ...otherEvents,
  Ready, // add to array here
];
```

### Commands

Commands you've probably seen before. Bots are given commands in the form of messages, prefixed with a `prefix` constant defined by the bot which comes before all commands to let the bot know that the message you are sending it is a command. The command itself, including any arguments or options comes after the prefix. For example, the `Ping` example command below would be invoked by sending `"$ping"` in a message, assuming `prefix` is set to `$`. New commands are defined by defining a class for that command and adding it to the exported array in `commands/index.ts`.

\*Example of Command: **Ping\***

```typescript
// commands/Ping.ts
import { Message } from "discord.js";
import { Command } from "../Command";
import { BotClient } from "../types";

export default class Ping extends Command {
  constructor(client: BotClient) {
    super(client, {
      name: "ping",
      description: "Pings the bot.",
      category: "Information",
      usage: client.settings.prefix.concat("ping"),
      cooldown: 1000,
      requiredPermissions: ["SEND_MESSAGES"],
    });
  }

  public async run(message: Message): Promise<void> {
    await super.respond(message.channel, "Pong!");
  }
}

// commands/index.ts
// ... other imports
import { Ping } from "./Ping.ts";
export default [
  ...otherCommands,
  Ping, // add to array here
];
```

## Running

To run the bot, first create an application on the Discord developer portal. Then copy the `.env.example` and rename it into `.env`. A proper `.env` file should look like this:

_.env_

```
BOT_TOKEN=RANDOMTOKENYOURECEIVEDFROMTHEDEVELOPERPORTAL
```

After everything is configured, you can run the bot locally by executing the `npm start` command.

## Documentation

During development, refer to the documentation served by [discord.js](https://discord.js.org/#/docs/main/stable/general/welcome).

## License

[MIT](LICENSE)
