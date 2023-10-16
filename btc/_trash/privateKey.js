const crypto = require('crypto');
const { ECPairFactory, networks } = require('ecpair');

// You need to provide the ECC library. The ECC library must implement
// all the methods of the `TinySecp256k1Interface` interface.
const tinysecp = require('tiny-secp256k1');
// const network = require('')
const ECPair = ECPairFactory(tinysecp);

// You don't need to explicitly write ECPairInterface, but just to show
// that the keyPair implements the interface this example includes it.

// From WIF
const tn = {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'tb',
    bip32: {
        public: 0x043587cf,
        private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
};

console.log(networks)
const keyPair1 = ECPair.fromWIF('cQYcfMtZmtMFnTbEyucoDqaM9uSv2R2z1SCg4aJqQTL8JsMU7RnL', networks.testnet);
console.log(keyPair1.privateKey.toString('hex'));
console.log(keyPair1.privateKey.toString('hex'));
// // Random private key
// const keyPair2 = ECPair.fromPrivateKey(crypto.randomBytes(32));
// // OR (uses randombytes library, compatible with browser)
// const keyPair3 = ECPair.makeRandom();
// // OR use your own custom random buffer generator BE CAREFUL!!!!
// const customRandomBufferFunc = (size) => crypto.randomBytes(size);
// const keyPair4 = ECPair.makeRandom({ rng: customRandomBufferFunc });
// // From pubkey (33 or 65 byte DER format public key)
// const keyPair5 = ECPair.fromPublicKey(keyPair1.publicKey);
//
// // Pass a custom network
// const network = {}; // Your custom network object here
// ECPair.makeRandom({ network });
// ECPair.fromPrivateKey(crypto.randomBytes(32), { network });
// ECPair.fromPublicKey(keyPair1.publicKey, { network });
// // fromWIF will check the WIF version against the network you pass in
// // pass in multiple networks if you are not sure
// ECPair.fromWIF('wif key...', network);
// const network2 = {}; // Your custom network object here
// const network3 = {}; // Your custom network object here
// ECPair.fromWIF('wif key...', [network, network2, network3]);
