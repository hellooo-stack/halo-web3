const ripemd160_1= require('@noble/hashes/ripemd160');
const sha256_1 = require('@noble/hashes/sha256');

function ripemd160(buffer) {
    return Buffer.from((0, ripemd160_1.ripemd160)(Uint8Array.from(buffer)));
}

function sha256(buffer) {
    return Buffer.from((0, sha256_1.sha256)(Uint8Array.from(buffer)));
}

function hash256(buffer) {
    return Buffer.from(
        (0, sha256_1.sha256)((0, sha256_1.sha256)(Uint8Array.from(buffer))),
    );
}

let publicKey = Buffer.from('038f37b7e8667aba08c7cb0e94b9fe6db7ce40bda266ac5cb4550a15dcc044e709', 'hex');
let afterHash = ripemd160(sha256(publicKey)).toString('hex');
console.log(afterHash)

let hashAgain = '00' + afterHash;
console.log(hashAgain);
const checksum = hash256(Buffer.from('00' + afterHash)).slice(0, 4);
console.log(Buffer.from(checksum).toString('hex'));
const hashResult = hashAgain + Buffer.from(checksum).toString('hex');
console.log(hashResult)
// 0x00a77087c7ede24f96f0ec3b60afb834c16ea5b5a975ccf42e

