import {
  Client,
  ClientOptions,
  Collection,
  DMChannel,
  Guild,
  MessageEmbed,
  NewsChannel,
  PermissionString,
  PresenceData,
  TextChannel,
  User,
} from "discord.js";
import { Near, Account } from "near-api-js";
import { Command } from "./Command";

export interface NearProvider {
  account: Account;
  near: Near;
}
export interface BotClient extends Client {
  settings: BotSettings;
  commands: Collection<string, Command>;
  getNearProvider: () => Promise<NearProvider>;
}

export interface CommandOptions {
  name: string;
  description?: string;
  usage?: string;
  category?: string;
  cooldown: number;
  requiredPermissions: PermissionString[];
}

export interface BotSettings {
  presence: PresenceData;
  clientOptions?: ClientOptions;
  prefix: string;
}

export interface BotEvent {
  name: () => string;
  run: EventFn | EventFnNoArgs;
}

export type EventFn = (args?: any[]) => Promise<void>;
export type EventFnNoArgs = () => Promise<void>;

export interface UserCooldown {
  user: User;
  guild: Guild;
}

export type AnyChannel = TextChannel | DMChannel | NewsChannel;
export type EmbedOrMessage = MessageEmbed | string;
