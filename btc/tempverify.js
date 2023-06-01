const bitcoinMessage = require("bitcoinjs-message");
const {ECPairFactory} = require("ecpair");
const tinysecp = require("tiny-secp256k1");

// wif: L4dkwu8AbcNG85QeDRPRJndjPavG6aNPC1SvHuzh1mSA3VF7SKQD
// address: bc1p8y2vtya493kyuzpewgv0qt429t3z7y3gfcmc3eau0ymsh523zzzswz7vyg


const message = 'hello world';
const wif = 'L4dkwu8AbcNG85QeDRPRJndjPavG6aNPC1SvHuzh1mSA3VF7SKQD';
const ECPair = ECPairFactory(tinysecp);

const keyPair = ECPair.fromWIF(wif);
const privateKey = keyPair.privateKey;
const signature = bitcoinMessage.sign(message, privateKey, keyPair.compressed)
console.log(signature.toString('hex'));

const isValid = bitcoinMessage.verify(message, 'bc1p8y2vtya493kyuzpewgv0qt429t3z7y3gfcmc3eau0ymsh523zzzswz7vyg', signature, null, true);
console.log('is valid: ', isValid);

// function simpleVerification(message, address, signature) {
//     let isValid = false;
//     try {
//         // isValid = bitcoinMessage.verify(message, address, signature);
//         isValid = bitcoinMessage.verify(message, address, signature, null, true);
//     } catch (e) {
//         console.error(e);
//     }
//
//     return isValid;
// }
//
// function verify(message, address, signature) {
//     let isValid = simpleVerification(message, address, signature);
//     if (!isValid) {
//         isValid = fallbackVerification(message, address, signature);
//     }
//
//     return isValid;
// }