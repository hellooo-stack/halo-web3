const {ECPairFactory, networks} = require('ecpair');
const bitcoinMessage = require('bitcoinjs-message');
const tinysecp = require('tiny-secp256k1');
const bitcoin = require("bitcoinjs-lib");

function signMessageFromWIF(wif, message) {
    const ECPair = ECPairFactory(tinysecp);

    const keyPair = ECPair.fromWIF(wif);
    const privateKey = keyPair.privateKey;
    const signature = bitcoinMessage.sign(message, privateKey, keyPair.compressed)

    const {address} = bitcoin.payments.p2pkh({pubkey: keyPair.publicKey});

    console.log('address: ' + address);
    console.log('public key: ' + keyPair.publicKey.toString('hex'));
    console.log('signature: ' + signature.toString('base64'));

    return signature.toString('base64');
}

// https://github.com/bitcoinjs/bitcoinjs-message
signMessageFromWIF('L4rK1yDtCWekvXuE6oXD9jCYfFNV2cWRpVuPLBcCU2z8TrisoyY1', 'This is an example of a signed message.');
// signMessageFromWIF('cQYcfMtZmtMFnTbEyucoDqaM9uSv2R2z1SCg4aJqQTL8JsMU7RnL', 'This is an example of a signed message.');
