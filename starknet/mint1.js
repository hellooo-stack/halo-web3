// initialize provider
const provider = new Provider({ sequencer: { baseUrl:"http://127.0.0.1:5050"  } });
// initialize existing pre-deployed account 0 of Devnet
const privateKey = "0xe3e70682c2094cac629f6fbed82c07cd";
const starkKeyPair = ec.getKeyPair(privateKey);
const accountAddress = "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a";

const account0 = new Account(provider, accountAddress, starkKeyPair);