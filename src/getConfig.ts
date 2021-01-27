// TODO: eventually add a contract?
// const CONTRACT_NAME = process.env.CONTRACT_NAME ?? 'default'

export default function getConfig(env: string): any {
  const keyPath = process.env.KEY_PATH ?? ".";
  switch (env) {
    // when running on server, use a
    case "development":
    case "production":
    case "testnet":
      const masterAccount = process.env.ROOT_ACCOUNT_ID;
      if (!masterAccount) {
        throw Error("ROOT_ACCOUNT_ID environment variable not set!");
      }
      return {
        networkId: "local",
        nodeUrl: "https://rpc.testnet.near.org",
        // nodeUrl: "localhost:3030",
        keyPath: keyPath,
        masterAccount: masterAccount,
        // contractName: CONTRACT_NAME
      };
    default:
      throw Error(
        `Unconfigured environment '${env}'. Can be configured in .env`
      );
  }
}
