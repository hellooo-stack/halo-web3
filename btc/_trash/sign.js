const {ECPairFactory, networks} = require('ecpair');
const bitcoinMessage = require('bitcoinjs-message');
const tinysecp = require('tiny-secp256k1');
const bitcoin = require("bitcoinjs-lib");

let isTest = true;
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

// console.log(addressFromWIF("AUAiUKjJfzy47q6+51yKw7+lx8S+/QfJQLNMn3J0yyjzW8km0FX1N6hLE91yXZPvkINlgMXTpr1gvYyV104Av1kE"))
console.log(verify('', '2MvQ6MVDu4w8n5Dh2ifMnfzPG2z4UK9ddVz', 'AUAiUKjJfzy47q6+51yKw7+lx8S+/QfJQLNMn3J0yyjzW8km0FX1N6hLE91yXZPvkINlgMXTpr1gvYyV104Av1kE'));
function addressFromWIF(wif) {
    const ECPair = ECPairFactory(tinysecp);

    const keyPair = ECPair.fromWIF(wif, network());
    // todo: identify different type of wif, and use different method to parse address
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





















// ----------------------tests------------------------


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
function testP2WPKH_mainnet() {
//   - address: bc1qj2yrg95zt4sjqgtj9tu44d64xqe4m79r3p7qzz
//   - privateKey: KzBdCStiLpezd27ybVofrX5HXg9WMxwHwQ4Cx9rKuLg848LnHPSo
//   - generated from: unisat
// 1-1: test addressFromWIF
// ------check passed------
    const wif = 'KzBdCStiLpezd27ybVofrX5HXg9WMxwHwQ4Cx9rKuLg848LnHPSo';
    const address = 'bc1qj2yrg95zt4sjqgtj9tu44d64xqe4m79r3p7qzz';
    const extractedAddress = addressFromWIF(wif);
    console.log('is parsing address equals address: ', extractedAddress === address);

// ------check passed------
// go to https://www.verifybitcoinmessage.com/ and check
    const message = 'hello world';
    const signature = signMessageFromWIF(wif, message);
    console.log('signature: ' + signature);

    const isValid = verify(message, address, signature);
    console.log('isValid: ', isValid);

    // signature1 is generated by: https://demo.unisat.io/
    const signature1 = 'HOuxcZMZsZ05q3dHXjAMGrahFEAaYunB8PTE4tlEh4UYSpqqUvz0zm96ccNxFWzt1huYaPtnJGDSJeATO293eIg=';
    const isValid1 = verify('hello world', address, signature1);
    console.log('isValid1: ', isValid1);
}

function testP2WPKH_testnet() {
    switchToTestnet();

//   - address: tb1qj2yrg95zt4sjqgtj9tu44d64xqe4m79rm89ne3
//   - privateKey: cQYcfMtZmtMFnTbEyucoDqaM9uSv2R2z1SCg4aJqQTL8JsMU7RnL
//   - generated from: unisat
// 1-1: test addressFromWIF
// ------check passed------
    const wif = 'cQYcfMtZmtMFnTbEyucoDqaM9uSv2R2z1SCg4aJqQTL8JsMU7RnL';
    const address = 'tb1qj2yrg95zt4sjqgtj9tu44d64xqe4m79rm89ne3';
    const extractedAddress = addressFromWIF(wif);
    console.log('is parsing address equals address: ', extractedAddress === address);

// ------check passed------
// go to https://www.verifybitcoinmessage.com/ and check
    const message = 'hello world';
    const signature = signMessageFromWIF(wif, message);
    console.log('signature: ' + signature);

    const isValid = verify(message, address, signature);
    console.log('isValid: ', isValid);

    // signature1 is generated by: https://demo.unisat.io/
    const signature1 = 'HL4McV4Xyd2bNs7m3wytVU5m0aqYeDDtVetBYC3FZ1t0fd+W9Gi6y9HG6e1WKVw5ANtM9ck/m1Acz0BpW1Y6gjg=';
    const isValid1 = verify('hello world~', address, signature1);
    console.log('isValid1: ', isValid1);
}


// testP2PKH();
// testP2SH();
// testP2WPKH_mainnet();
testP2WPKH_testnet();









