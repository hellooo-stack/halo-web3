const crypto = require('crypto');
const {bufferToBigInt} = require("./numbers");

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

/**
 *
 * @param buf Buffer
 * @returns {string} string
 */
function encodeBase58(buf) {
    let zeroCount = 0;
    for (let i = 0; i < buf.length; i++) {
        if (buf[i] === 0) {
            zeroCount += 1;
        } else {
            break;
        }
    }

    let num = bufferToBigInt(buf);
    let result = '';
    let prefix = '1'.repeat(zeroCount);
    while (num > 0n) {
        const {quotient, remainder} = divmod(num, 58n);
        num = quotient;
        result = BASE58_ALPHABET[remainder] + result;
    }

    return prefix + result;
}

/**
 *
 * @param buf Buffer
 * @returns {string} string
 */
function encodeBase58Checksum(buf) {
    const checkSum = hash256(buf).subarray(0, 4);
    return encodeBase58(Buffer.concat([buf, checkSum]));
}

/**
 *
 * @param str string
 * @returns {*} Buffer
 */
function hash256(buf) {
    const sha256 = crypto.createHash('sha256');
    sha256.update(buf);

    return crypto.createHash('sha256').update(sha256.digest()).digest();
}

console.log(hash256(Buffer.from([0x01])));
console.log(hash256('01'));
console.log(hash256('0x01'));

/**
 *
 * @param str string
 * @returns {*} Buffer
 */
function hash160(str) {
    const sha256 = crypto.createHash('sha256');
    sha256.update(str);

    const ripemd160 = crypto.createHash('ripemd160');
    ripemd160.update(str.digest());

    return ripemd160.digest();
}

function divmod(a, b) {
    const quotient = Math.floor(a / b);
    const remainder = a % b;
    return {quotient, remainder};
}

module.exports = {
    encodeBase58,
    encodeBase58Checksum,
    hash256,
    hash160
}

