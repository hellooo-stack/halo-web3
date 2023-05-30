const crypto = require('crypto');
const { ECPairFactory } = require('ecpair');

// You need to provide the ECC library. The ECC library must implement
// all the methods of the `TinySecp256k1Interface` interface.
const tinysecp = require('tiny-secp256k1');
const ECPair = ECPairFactory(tinysecp);

// You don't need to explicitly write ECPairInterface, but just to show
// that the keyPair implements the interface this example includes it.

// From WIF
const keyPair1 = ECPair.fromWIF('KynD8ZKdViVo5W82oyxvE18BbG6nZPVQ8Td8hYbwU94RmyUALUik');
// Random private key
const keyPair2 = ECPair.fromPrivateKey(crypto.randomBytes(32));
// OR (uses randombytes library, compatible with browser)
const keyPair3 = ECPair.makeRandom();
// OR use your own custom random buffer generator BE CAREFUL!!!!
const customRandomBufferFunc = (size) => crypto.randomBytes(size);
const keyPair4 = ECPair.makeRandom({ rng: customRandomBufferFunc });
// From pubkey (33 or 65 byte DER format public key)
const keyPair5 = ECPair.fromPublicKey(keyPair1.publicKey);

// Pass a custom network
const network = {}; // Your custom network object here
ECPair.makeRandom({ network });
ECPair.fromPrivateKey(crypto.randomBytes(32), { network });
ECPair.fromPublicKey(keyPair1.publicKey, { network });
// fromWIF will check the WIF version against the network you pass in
// pass in multiple networks if you are not sure
ECPair.fromWIF('wif key...', network);
const network2 = {}; // Your custom network object here
const network3 = {}; // Your custom network object here
ECPair.fromWIF('wif key...', [network, network2, network3]);
