const {ECPairFactory} = require("ecpair");
const ecc = require('tiny-secp256k1');
const bitcoin = require("bitcoinjs-lib");

const ECPair = ECPairFactory(ecc);

const network = bitcoin.networks.testnet;
const keyPair = ECPair.fromWIF('cUYZqgWKGhn7MA8ph4CHLEzvpyhmCcqE9HrmRuiXVAvquPdqLqbm', network);

const oriAddr = 'mp3pY9u653PW6d21pDXcjup8uxHzP3g3xs';
const destAddr = 'myGqmkcCpEreM9Bevjr1z3dPzQXnutRK4Y';

const inputData = {
    hash: '041a2be11c35f47619417786ce0b6c8bb45c6a43e4be77984f4c886863fb1478',
    index: 0,
    nonWitnessUtxo: Buffer.from('02000000000101e78d6eb648472dd758b0e035ab9a59d43306e1602e98fd01d7abe660d3b5f8e10100000000ffffffff0210270000000000001976a9145d976d0b8e01b3aae21d844f962953f15fbc8c7688acf9931c000000000016001492883416825d612021722af95ab75530335df8a302483045022100b1232f7ed5738a343efa2cfca31ad665be30eca1463c082329f4574eb1e8fd2302200a7620d5539bb710a4a202e53c705739592ee73f675035d706a31adf093488bd012102577d146c56926fbd0a5eac4a0f69cda68d9a91e2f1501a4a6960454e13e82c0900000000', 'hex'),
};
const outputData = {
    address: destAddr,
    value: 1000
};
const changeData = {
    address: oriAddr,
    value: 8500
}
const tx = new bitcoin.Psbt({network: network})
    .addInput(inputData) // alice1 unspent
    .addOutputs([outputData, changeData])
    .signInput(0, keyPair)
    .finalizeAllInputs()
    .extractTransaction();

const txHex = tx.toHex();
console.log(txHex);

// txHash: 57d0b3913c405d9a555d22fe7712e8ee6e5c16594c1436a0bda7bbb1c2f29682
