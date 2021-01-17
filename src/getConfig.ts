// TODO: eventually add a contract?
// const CONTRACT_NAME = process.env.CONTRACT_NAME ?? 'default'

export default function getConfig(env: string): any {
  switch (env) {
    // when running on server, use a
    case 'development':
    case 'production':
    case 'testnet':
      if (process.env.KEY_PATH === undefined) {
        throw new Error('HOME env variable not set!')
      }
      return {
        networkId: 'local',
        nodeUrl: 'http://localhost:3030',
        keyPath: process.env.KEY_PATH
        // contractName: CONTRACT_NAME
      }
    default:
      throw Error(
        `Unconfigured environment '${env}'. Can be configured in .env`
      )
  }
}
