const { ECPairFactory, networks } = require('ecpair');
const tinysecp = require("tiny-secp256k1");
const bitcoin = require('bitcoinjs-lib');

let isTestNet = true;
let network = isTestNet ? networks.testnet : networks.bitcoin;
function signFromWif(message, wif) {
    const ECPair = ECPairFactory(tinysecp);
    const keyPair = ECPair.fromWIF(wif, network);

    const messageBuffer = Buffer.from(message);
    console.log('message: ' + messageBuffer.toString('hex'));
    const messageHash = bitcoin.crypto.hash256(messageBuffer);
    const signature = keyPair.sign(messageHash);

    console.log(keyPair.privateKey.toString('hex'));
    console.log(signature.toLocaleString());
}

signFromWif('hello world', 'cQYcfMtZmtMFnTbEyucoDqaM9uSv2R2z1SCg4aJqQTL8JsMU7RnL');
