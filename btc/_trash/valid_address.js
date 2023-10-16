// main-net:
// - p2wpkh:
//   - wif privateKey: L263wKNrw1U5sCvmQKZauH2oP9ziMkEC9pqje48UUVfpR5ggpFpG
//   - hex privateKey: 913f2660ea6b7675a05e786552f19f72e331502f592f216301ab59b26e92c60b
//   - address: bc1qrv4dd6vud35926qlt4s39kqlsy3a3r8kqeydyy
// - p2tr:
//   - wif privateKey: L4dkwu8AbcNG85QeDRPRJndjPavG6aNPC1SvHuzh1mSA3VF7SKQD
//   - hex privateKey: dd3b981ee923c50ca27b6bd22055491750a460ae888edfc2ee022c17ee5efd61
//   - address: bc1p8y2vtya493kyuzpewgv0qt429t3z7y3gfcmc3eau0ymsh523zzzswz7vyg
// - p2pkh:
//   - wif privateKey: L2BkH7GJAMfTBXqzemBWP6eLs5iQxGoKhBXxRU8vwkkkBMnh2Jgt
//   - hex privateKey: 942d3ae6bd75b57b078ece2a35300fc57514302d2c235778a2ca84e932d34dab
//   - address: 1MU3iZcH4p3QNbrrs4p8b2ocjP4cFYvBCj

// test-net:
// - p2wpkh:
//   - wif privateKey: cST3QENiN5AM2eQ2njNiGbXs1PJ82CKtDrzCkUayycKpfpprhfpS
//   - hex privateKey: 913f2660ea6b7675a05e786552f19f72e331502f592f216301ab59b26e92c60b
//   - address: tb1qrv4dd6vud35926qlt4s39kqlsy3a3r8k2ll7lh
// - p2tr:
//   - wif privateKey: cUzkQp822g4XHWsubqCYg78o1pDfm2U5G3bPQLTCWt6AJEL5HZex
//   - hex privateKey: dd3b981ee923c50ca27b6bd22055491750a460ae888edfc2ee022c17ee5efd61
//   - address: tb1p8y2vtya493kyuzpewgv0qt429t3z7y3gfcmc3eau0ymsh523zzzse2gr78
// - p2pkh:
//   - wif privateKey: cSYjk2G9bRMiLyKG3AzdkR9QVK1pciu1mDgRXtbSSsQkS6nEvJWU
//   - hex privateKey: 942d3ae6bd75b57b078ece2a35300fc57514302d2c235778a2ca84e932d34dab
//   - address: n1z11chFsqUf9iLUadnWQx1wbNfK7JqVQ2

// 以上是从unisat钱包导出的，同一个账号，在测试网和主网下，不同地址格式下的私钥和地址。
// 可以看到，对于不同格式的地址，unisat都会生成一个对应的私钥，也就是说一个账号对应多个私钥。
// 另外，同一个私钥，它们的wif和地址在主网和测试网之间都是不一样的。
// 需要验证：是否同一私钥，在同一网络下，是否可产生不同形式的地址。


const {ECPairFactory, networks} = require("ecpair");
const ecc = require("tiny-secp256k1");
const bitcoin = require("bitcoinjs-lib");
bitcoin.initEccLib(ecc);

let isTestNet = false;
let network = isTestNet ? networks.testnet : networks.bitcoin;


const wif = 'L2BkH7GJAMfTBXqzemBWP6eLs5iQxGoKhBXxRU8vwkkkBMnh2Jgt';
const ECPair = ECPairFactory(ecc);
const keyPair = ECPair.fromWIF(wif, network);
const privateKey = keyPair.privateKey;
const publicKey = keyPair.publicKey;

const {address: p2wpkhAddress} = bitcoin.payments.p2wpkh({pubkey: publicKey});
const {address: p2trAddress} = bitcoin.payments.p2tr({internalPubkey: publicKey.slice(1, 33)});
const {address: p2pkhAddress} = bitcoin.payments.p2pkh({pubkey: keyPair.publicKey});
console.log('privateKey: ', privateKey.toString('hex'));
console.log('publicKey: ', publicKey.toString('hex'));
console.log('p2wpkhAddress: ', p2wpkhAddress);
console.log('p2trAddress: ', p2trAddress);
console.log('p2pkhAddress: ', p2pkhAddress);

// 结论：是否同一私钥，在同一网络下，可以产生不同的地址

