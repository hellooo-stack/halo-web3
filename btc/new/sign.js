const {ECPairFactory, networks} = require('ecpair');
const bitcoinMessage = require('bitcoinjs-message');
const tinysecp = require('tiny-secp256k1');
const bitcoin = require("bitcoinjs-lib");

function addressFromWIF(wif) {
    const ECPair = ECPairFactory(tinysecp);

    const keyPair = ECPair.fromWIF(wif);
    const {address} = bitcoin.payments.p2pkh({pubkey: keyPair.publicKey});

    return address;
}

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

function verify(message, address, signature) {
    let isValid = simpleVerification(message, address, signature);
    if (!isValid) {
        isValid = fallbackVerification(message, address, signature);
    }

    console.log('is valid: ' + isValid);
    return isValid;
}

function simpleVerification(message, address, signature) {
    let isValid = false;
    try {
        // isValid = bitcoinMessage.verify(message, address, signature);
        isValid = bitcoinMessage.verify(message, address, signature, null, true);
        console.log('before v: ' + isValid)
    } catch (e) {
        console.error(e);
    }
    return isValid;
}

function fallbackVerification(message, address, signature) {
    let isValid = false;
    const flags = [...Array(12).keys()].map(i => i + 31);
    for (let flag of flags) {
        let flagByte = Buffer.alloc(1);
        flagByte.writeInt8(flag);
        let sigBuffer = Buffer.from(signature, 'base64').slice(1);
        sigBuffer = Buffer.concat([flagByte, sigBuffer]);
        let candidateSig = sigBuffer.toString('base64');
        try {
            isValid = bitcoinMessage.verify(message, address, candidateSig);
            if (isValid) break;
        } catch (e) {
            console.error(e);
        }
    }
    return isValid;
}

// https://github.com/bitcoinjs/bitcoinjs-message
// signMessageFromWIF('L4rK1yDtCWekvXuE6oXD9jCYfFNV2cWRpVuPLBcCU2z8TrisoyY1', 'This is an example of a signed message.');
// signMessageFromWIF('cQYcfMtZmtMFnTbEyucoDqaM9uSv2R2z1SCg4aJqQTL8JsMU7RnL', 'hello world~');
// // verify('This is an example of a signed message.', '1F3sAm6ZtwLAUnj7d38pGFxtP3RVEvtsbV', 'H9L5yLFjti0QTHhPyFrZCT1V/MMnBtXKmoiKDZ78NDBjERki6ZTQZdSMCtkgoNmp17By9ItJr8o7ChX0XxY91nk=');
//
// verify('hello world~', 'tb1qj2yrg95zt4sjqgtj9tu44d64xqe4m79rm89ne3', 'IA8Da70ACrUSmQiZ4zLzu9HVOWwGZFiYXFM3DtgtuONvKSXxojcJMSzIPs5qidfiD8gO6qBUm4Yyg9P81weFPBc=');



// 1. p2pkh:
//   - address: 1341EtMhuQtcAUKruUomiacbu6WzYNHqxC
//   - privateKey: KypVGiJzkHngK3aHg11Ra5A4p7FeKsg2dcCryqGxKzPhpwbCHdXx
//   - generated from: https://www.bitaddress.org/
// 1-1: test addressFromWIF
const address = addressFromWIF('KypVGiJzkHngK3aHg11Ra5A4p7FeKsg2dcCryqGxKzPhpwbCHdXx');
console.log('is parsing address equals address: ', address === '1341EtMhuQtcAUKruUomiacbu6WzYNHqxC');




// signMessageFromWIF('KypVGiJzkHngK3aHg11Ra5A4p7FeKsg2dcCryqGxKzPhpwbCHdXx', 'hello world');














