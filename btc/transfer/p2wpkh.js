const {ECPairFactory} = require("ecpair");
const ecc = require('tiny-secp256k1');
const bitcoin = require("bitcoinjs-lib");

const ECPair = ECPairFactory(ecc);

const network = bitcoin.networks.testnet;
const keyPair = ECPair.fromWIF('cNHwZuLZVo531CMarT4tGUcWAfZxh19AZJRr8ZvcNTMDWaCWArLQ', network);

const oriAddr = 'tb1qznq0ysk7naka8ztjs0pyx0gwhj907j8shyhtal';
const destAddr = 'tb1qj2yrg95zt4sjqgtj9tu44d64xqe4m79rm89ne3';
const inputData = {
    hash: 'e1f8b5d360e6abd701fd982e60e10633d4599aab35e0b058d72d4748b66e8de7',
    index: 0,
    witnessUtxo: {
        script: Buffer.from('001414c0f242de9f6dd3897283c2433d0ebc8aff48f0', 'hex'),
        value: 40000
    }
};
const outputData = {
    address: destAddr,
    value: 1000
};
const changeData = {
    address: oriAddr,
    value: 38500
}

const tx = new bitcoin.Psbt({network: network})
    .addInput(inputData)
    .addOutputs([outputData, changeData])
    .signInput(0, keyPair)
    .finalizeAllInputs()
    .extractTransaction();

const txHex = tx.toHex();
console.log(txHex);

// https://github.com/bitcoinjs/bitcoinjs-lib/issues/1543
// https://medium.com/@bitcoindeezy/bitcoin-basics-programming-with-bitcoinjs-lib-4a69218c0431
// https://blockstream.info/testnet/tx/push

// txHash: 70db29d9ef9da6531acc8b3de4018daf2a205e44b58b735dce73e710b88cbe5a