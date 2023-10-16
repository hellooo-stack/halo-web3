const ecc = require('tiny-secp256k1');
const bitcoin = require("bitcoinjs-lib");
bitcoin.initEccLib(ecc);

// 1. generating public key from private key, and generating different types of addresses from public key
function p2pkhAddressFromPublicKey(publicKey, network) {
    const {address: p2pkhAddress} = bitcoin.payments.p2pkh({pubkey: publicKey, network: network});
    return p2pkhAddress;
}

function p2wpkhAddressFromPublicKey(publicKey, network) {
    const {address: p2wpkhAddress} = bitcoin.payments.p2wpkh({pubkey: publicKey, network: network});
    return p2wpkhAddress;
}

function p2trAddressFromPublicKey(publicKey, network) {
    const {address: p2trAddress} = bitcoin.payments.p2tr({internalPubkey: publicKey.slice(1, 33), network: network});
    return p2trAddress;
}


module.exports = {
    p2pkhAddressFromPublicKey,
    p2wpkhAddressFromPublicKey,
    p2trAddressFromPublicKey
}


const isTestnet = true;
function main() {
    const network = isTestnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;
    const wifEcPair = require('./a_keypair').ecPairFromWIF('cST3QENiN5AM2eQ2njNiGbXs1PJ82CKtDrzCkUayycKpfpprhfpS', network);
    console.log('privateKey: ', wifEcPair.privateKey.toString('hex'));

    const p2pkhAddress = p2pkhAddressFromPublicKey(wifEcPair.publicKey, network);
    const p2wpkhAddress = p2wpkhAddressFromPublicKey(wifEcPair.publicKey, network);
    const p2trAddress = p2trAddressFromPublicKey(wifEcPair.publicKey, network);
    console.log('p2pkhAddress: ', p2pkhAddress);
    console.log('p2wpkhAddress: ', p2wpkhAddress);
    console.log('p2trAddress: ', p2trAddress);
}

// main();
