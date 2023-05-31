const { ECPairFactory, networks } = require('ecpair');
const bitcoinMessage = require('bitcoinjs-message');

// You need to provide the ECC library. The ECC library must implement
// all the methods of the `TinySecp256k1Interface` interface.
const tinysecp = require('tiny-secp256k1');
// const network = require('')
const ECPair = ECPairFactory(tinysecp);

// const keyPair1 = ECPair.fromWIF('cQYcfMtZmtMFnTbEyucoDqaM9uSv2R2z1SCg4aJqQTL8JsMU7RnL', networks.testnet);
const keyPair = ECPair.fromWIF('L4rK1yDtCWekvXuE6oXD9jCYfFNV2cWRpVuPLBcCU2z8TrisoyY1');

const privateKey = keyPair.privateKey;
const message = 'This is an example of a signed message.'

const signature = bitcoinMessage.sign(message, privateKey, keyPair.compressed)
console.log(signature.toString('base64'))

const bitcoin = require('bitcoinjs-lib');
const {address} = bitcoin.payments.p2pkh({pubkey: keyPair.publicKey});
console.log('public: ' + keyPair.publicKey.toString('hex'));
console.log('address: ' + address);


function signMessageFromWIF(wif, message) {

}
