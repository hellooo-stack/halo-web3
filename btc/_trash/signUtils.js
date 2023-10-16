const { ECPairFactory, networks } = require('ecpair');
const tinysecp = require("tiny-secp256k1");
const bitcoin = require('bitcoinjs-lib');

let isTestNet = false;
let network = isTestNet ? networks.testnet : networks.bitcoin;
function signFromWif(message, wif) {
    const ECPair = ECPairFactory(tinysecp);
    const keyPair = ECPair.fromWIF(wif, network);
    console.log('public key: ', keyPair.publicKey.toString('hex'));

    const messageBuffer = Buffer.from(message);
    console.log('message: ' + messageBuffer.toString('hex'));
    const messageHash = bitcoin.crypto.hash256(messageBuffer);
    const signature = keyPair.sign(messageHash, true).toString('base64');

    console.log(keyPair.privateKey.toString('base64'));
    console.log(signature);
}

// signFromWif('hello world', 'L4dkwu8AbcNG85QeDRPRJndjPavG6aNPC1SvHuzh1mSA3VF7SKQD');


// wif: L4dkwu8AbcNG85QeDRPRJndjPavG6aNPC1SvHuzh1mSA3VF7SKQD
// public key: 038f37b7e8667aba08c7cb0e94b9fe6db7ce40bda266ac5cb4550a15dcc044e709
const ECPair = ECPairFactory(tinysecp);
const keyPair = ECPair.fromWIF('L4dkwu8AbcNG85QeDRPRJndjPavG6aNPC1SvHuzh1mSA3VF7SKQD', network);
const internalPubkey = keyPair.publicKey.slice(1, 33);
const { address, output } = bitcoin.payments.p2tr({
    internalPubkey,
});

console.log('address: ', address);


// const keyPair = ECPair.fromPublicKey(Buffer.from('038f37b7e8667aba08c7cb0e94b9fe6db7ce40bda266ac5cb4550a15dcc044e709', 'hex'));
// let result = keyPair.verify(Buffer.from('hello world~'), Buffer.from('G0ppViJxIOYZZlHcOLzi6WwbNIbaVdPLnijNSpaEC4jncb4Px9dU8a2ks7TNUF+FKrZl7RAhSzOmgMx/zTsyLb4=', 'base64'))
// console.log(result)

