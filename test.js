const nearAPI = require("near-api-js");
const { connect, KeyPair, keyStores, utils, WalletConnection } = nearAPI;
const { deprecate } = require("util");
require("dotenv").config();

console.log(process.env.SENDER_PRIVATE_KEY + "\n\n");

async function testConnect() {
  const networkId = process.env.NETWORK_ID;
  const sender = process.env.SENDER;
  // sets up an empty keyStore object in memory using near-api-js
  const keyStore = new keyStores.InMemoryKeyStore();
  console.log(keyStore);
  // creates a keyPair from the private key provided in your .env file
  console.log(process.env.SENDER_PRIVATE_KEY);
  const keyPair = KeyPair.fromString(process.env.SENDER_PRIVATE_KEY);
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
  const x = await connect(config);
  return x;
}
y = testConnect().then((x) => {
  try {
    const wallet = new WalletConnection(x, "another.testnet");
    console.log(wallet);
  } catch (e) {
    console.log(e);
  }
  console.log(x);
});
/*
const nearAPI  = require('near-api-js');
const { connect, KeyPair, keyStores, utils } = nearAPI;

//this is required if using a local .env file for private key
require('dotenv').config();

// configure accounts, network, and amount of NEAR to send
// converts NEAR amount into yoctoNEAR (10^-24) using a near-api-js utility
const sender = 'another.testnet';
const receiver = 'pepega.testnet';
const networkId = 'testnet';
const amount = utils.format.parseNearAmount('1.5');

async function main() {
  console.log(process.env.SENDER_PRIVATE_KEY + "\n\n");
  // sets up an empty keyStore object in memory using near-api-js
  const keyStore = new keyStores.InMemoryKeyStore();
  console.log(keyStore);
  // creates a keyPair from the private key provided in your .env file
  const keyPair = KeyPair.fromString(process.env.SENDER_PRIVATE_KEY);
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
    explorerUrl: `https://explorer.${networkId}.near.org`
  };

  // connect to NEAR! :) 
  const near = await connect(config);
  // create a NEAR account object
  const senderAccount = await near.account(sender);

  try {
    // here we are using near-api-js utils to convert yoctoNEAR back into a floating point
    console.log(`Sending ${utils.format.formatNearAmount(amount)}Ⓝ from ${sender} to ${receiver}...`);
    // send those tokens! :)
    const result = await senderAccount.sendMoney(receiver, amount);
    // console results
    console.log('Transaction Results: ', result.transaction);
    console.log('--------------------------------------------------------------------------------------------');
    console.log('OPEN LINK BELOW to see transaction in NEAR Explorer!');
    console.log(`${config.explorerUrl}/transactions/${result.transaction.hash}`);
    console.log('--------------------------------------------------------------------------------------------');
  } catch(error) {
    // return an error if unsuccessful
    console.log(error);
  }
}

// run the function
main();

*/
