const {ECPairFactory, networks} = require('ecpair');
const bitcoinMessage = require('bitcoinjs-message');
const tinysecp = require('tiny-secp256k1');
const bitcoin = require("bitcoinjs-lib");

let isTest = false;
function switchToTestnet() {
    isTest = true;
}
function switchToMainnet() {
    isTest = false;
}

function network() {
    if (isTest) {
        return networks.testnet;
    } else {
        return networks.bitcoin;
    }
}

function addressFromWIF(wif) {
    const ECPair = ECPairFactory(tinysecp);

    const keyPair = ECPair.fromWIF(wif, network());
    const {address} = bitcoin.payments.p2pkh({pubkey: keyPair.publicKey});

    return address;
}

function signMessageFromWIF(wif, message) {
    const ECPair = ECPairFactory(tinysecp);

    const keyPair = ECPair.fromWIF(wif, network());
    const privateKey = keyPair.privateKey;
    const signature = bitcoinMessage.sign(message, privateKey, keyPair.compressed)

    return signature.toString('base64');
}

function verify(message, address, signature) {
    let isValid = simpleVerification(message, address, signature);
    if (!isValid) {
        isValid = fallbackVerification(message, address, signature);
    }

    return isValid;
}

function simpleVerification(message, address, signature) {
    let isValid = false;
    try {
        // isValid = bitcoinMessage.verify(message, address, signature);
        isValid = bitcoinMessage.verify(message, address, signature, null, true);
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


// 1. p2pkh:
function testP2PKH() {
//   - address: 1341EtMhuQtcAUKruUomiacbu6WzYNHqxC
//   - privateKey: KypVGiJzkHngK3aHg11Ra5A4p7FeKsg2dcCryqGxKzPhpwbCHdXx
//   - generated from: https://www.bitaddress.org/
// 1-1: test addressFromWIF
// ------check passed------
    const wif = 'KypVGiJzkHngK3aHg11Ra5A4p7FeKsg2dcCryqGxKzPhpwbCHdXx';
    const address = '1341EtMhuQtcAUKruUomiacbu6WzYNHqxC';
    const extractedAddress = addressFromWIF(wif);
    console.log('is parsing address equals address: ', extractedAddress === address);

// ------check passed------
// go to https://www.verifybitcoinmessage.com/ and check
    const message = 'hello world';
    const signature = signMessageFromWIF(wif, message);
    console.log('signature: ' + signature);

    const isValid = verify(message, address, signature);
    console.log('isValid: ', isValid);
}

// 2. P2SH:
function testP2SH() {

}

// 3. P2WPKH()
function testP2WPKH_mainNet() {

}

function testP2WPKH_testNet() {
    switchToTestnet();


}


testP2PKH();
testP2SH();
testP2WPKH_mainNet();
testP2WPKH_testNet();









