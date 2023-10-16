const bitcoinMessage = require("bitcoinjs-message");
const bitcoin = require("bitcoinjs-lib");

// 1. sign with private key
function sign(message, privateKey, compressed = true) {
    return bitcoinMessage.sign(message, privateKey, compressed);
}

// 2. verify with public key
function verify(signature, publicKey) {
    // todo: 使用地址、消息来验证签名是否有效
    // bitcoinMessage.verify(message, address, signature);
    // bitcoinMessage.verify(message, address, signature, null, true);
    // return bitcoinMessage.
    return false;
}

module.exports = {
    sign,
    verify
}

const isTestnet = true;

function main() {
    const network = isTestnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;
    const wifEcPair = require('./a_keypair').ecPairFromWIF('cST3QENiN5AM2eQ2njNiGbXs1PJ82CKtDrzCkUayycKpfpprhfpS', network);

    const signature = sign('hello world', wifEcPair.privateKey);
    console.log('signature: ', signature.toString('base64'));
}

main();
