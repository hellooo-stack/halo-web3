const {ECPairFactory} = require("ecpair");
const ecc = require('tiny-secp256k1');
const bitcoin = require("bitcoinjs-lib");
bitcoin.initEccLib(ecc);

const ECPair = ECPairFactory(ecc);

const network = bitcoin.networks.testnet;
const keyPair = ECPair.fromWIF('cQSjty1JPbEhWJrx2aWGiExsd7WhRycTKcdi2umubWRAZDt5ntZ5', network);

const oriAddr = 'tb1pfkdt80jt533fqwzg9zz5ultmmmnw86wh582w7y73dj7pd2ahl4kstdy4y5';
const destAddr = '2NE23G6Cjzo1TNrv7oYxqYVn5FNbFvgXXLB';

const utxoAmount = 1000;
const sendAmount = 400;
const changeAmount = 450;

const inputData = {
    hash: '4765099e3c3f2dafa02676ca83ab6ad1c022315dec4e224b4da90a9eeec3f78b',
    index: 0,
    witnessUtxo: {
        script: Buffer.from('51204d9ab3be4ba46290384828854e7d7bdee6e3e9d7a1d4ef13d16cbc16abb7fd6d', 'hex'),
        value: utxoAmount
    },
    tapInternalKey: toXOnly(keyPair.publicKey)
};
const outputData = {
    address: destAddr,
    value: sendAmount
};
const changeData = {
    value: changeAmount,
    address: oriAddr,
    tapInternalKey: toXOnly(keyPair.publicKey)
};
const psbt = new bitcoin.Psbt({network: network})
    .addInput(inputData) // alice1 unspent
    .addOutputs([outputData, changeData]);

const tweakedSigner = tweakSigner(keyPair, { network: network });
psbt.signInput(0, tweakedSigner);

psbt.finalizeAllInputs();
const tx = psbt.extractTransaction();
const rawTx = tx.toBuffer();
const txHex = rawTx.toString('hex');
console.log(txHex);


function tweakSigner(signer, opts = {}) {
    let privateKey = signer.privateKey;
    if (signer.publicKey[0] === 3) {
        privateKey = ecc.privateNegate(privateKey);
    }

    const tweakedPrivateKey = ecc.privateAdd(
        privateKey,
        tapTweakHash(toXOnly(signer.publicKey), opts.tweakHash)
    );

    if (!tweakedPrivateKey) {
        throw new Error('Invalid tweaked private key!');
    }

    return ECPair.fromPrivateKey(Buffer.from(tweakedPrivateKey), {
        network: opts.network
    });
}

function tapTweakHash(pubKey, h) {
    return bitcoin.crypto.taggedHash(
        'TapTweak',
        Buffer.concat(h ? [pubKey, h] : [pubKey]),
    );
}

function toXOnly(pubKey) {
    return pubKey.length === 32 ? pubKey : pubKey.slice(1, 33);
}

// txHash: 10e36be62d93394c3c3f08841c40ce1e53f2dae8b55bb4b7383a74d699aaae64
