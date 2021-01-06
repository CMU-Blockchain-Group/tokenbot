import * as dotenv from 'dotenv'
import 'reflect-metadata'
import { container } from 'tsyringe'
import { Client } from './Client'

dotenv.config()

// Initialize the Client using the IoC.
const client = container.resolve(Client)

client.login(process.env.token).then(() => console.log('tokenbot happily hodling along')).catch(e => console.error(e))
