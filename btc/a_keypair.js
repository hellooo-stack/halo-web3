const {ECPairFactory} = require("ecpair");
const ecc = require('tiny-secp256k1');
const bitcoin = require("bitcoinjs-lib");

const ECPair = ECPairFactory(ecc);

// 1. restore private key from wif
function ecPairFromWIF(wif, network) {
    return ECPair.fromWIF(wif, network);
}

// 2. restore private key from hex
function ecPairFromPrivateKey(privateKey, network) {
    return ECPair.fromPrivateKey(privateKey, {network: network});
}

// 3. generating private key randomly
function ecPairFromRandom(network) {
    return ECPair.makeRandom({network: network});
}

// 4. generating public key from private key
function publicKeyFromPrivateKey(privateKey, compressed = true) {
    return ECPair.fromPrivateKey(privateKey, {compressed: compressed}).publicKey;
}

module.exports = {
    ecPairFromWIF,
    ecPairFromPrivateKey,
    ecPairFromRandom,
    publicKeyFromPrivateKey
}


const isTestnet = true;
function main() {
    const network = isTestnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;
    const wifEcPair = ecPairFromWIF('cUYZqgWKGhn7MA8ph4CHLEzvpyhmCcqE9HrmRuiXVAvquPdqLqbm', network);
    console.log(wifEcPair.privateKey.toString('hex'));

    const randomEcPair = ecPairFromRandom(network);
    console.log(randomEcPair.privateKey.toString('hex'));

    const publicKey = publicKeyFromPrivateKey(wifEcPair.privateKey);
    console.log(wifEcPair.publicKey.toString('hex'));
    console.log(publicKey.toString('hex'));
}

// main();
