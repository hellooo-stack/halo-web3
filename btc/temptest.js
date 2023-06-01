const {ECPairFactory} = require("ecpair");
const tinysecp = require("tiny-secp256k1");
const bitcoin = require("bitcoinjs-lib");

function addressFromWIF(wif) {
    const ECPair = ECPairFactory(tinysecp);
    const keyPair = ECPair.fromWIF(wif);
    // todo: identify different type of wif, and use different method to parse address
    // bit p2tr
    // const {address} = bitcoin.payments.p2wpkh({pubkey: keyPair.publicKey.slice(1, 33)});
    const {address} = bitcoin.payments.p2tr({pubkey: keyPair.publicKey.slice(1, 33)});

    return address;
}

console.log(addressFromWIF('L4dkwu8AbcNG85QeDRPRJndjPavG6aNPC1SvHuzh1mSA3VF7SKQD'));