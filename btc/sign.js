function t1() {
    const {bitcoin} = require("bitcoinjs-lib");

    let message = 'hello world',
        hash = bitcoin.crypto.sha256(message),
        wif = 'KwdMAjGmerYanjeui5SHS7JkmpZvVipYvB2LJGU1ZxJwYvP98617',
        keyPair = bitcoin.ECPair.fromWIF(wif);

    let signature = keyPair.sign(hash).toDER();
    console.log('signature = ' + signature.toString('hex'));
}

const m = require('bitcore')
function t2() {
    var Message = require('bitcore-message');

    var privateKey = new bitcore.PrivateKey('L23PpjkBQqpAF4vbMHNfTZAb3KFPBSawQ7KinFTzz7dxq6TZX8UA');
    var message = new Message('This is an example of a signed message.');

    var signature = message.sign(privateKey);
    console.log(signature)
}

function t3() {
    const bitcoin = require('bitcoinjs-lib');

// 消息和私钥
    const message = 'Hello, World!';
    const privateKey = '私钥'; // 替换为你自己的私钥

// 创建一个ECDSA对象
    const keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'));

// 对消息进行签名
    const signature = bitcoin.message.sign(keyPair, message);

// 打印签名结果
    console.log('Signature:', signature.toString('base64'));
}

t3();


cQYcfMtZmtMFnTbEyucoDqaM9uSv2R2z1SCg4aJqQTL8JsMU7RnL
