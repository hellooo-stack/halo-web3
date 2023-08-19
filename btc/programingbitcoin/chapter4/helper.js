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
        const mod = num % 58n;
        num = num / 58n;
        result = BASE58_ALPHABET[Number(mod)] + result;
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

// bigint mod that produces a positive value
function mod(n, m) {
    return ((n % m) + m) % m;

}

// modular exponentiation
function pow(base, exponent, modulus) {
    if (modulus === 1n) return 0n;
    let result = 1n;
    base = mod(base, modulus);
    while (exponent > 0) {
        if (exponent & 1n) {
            result = mod(result * base, modulus);
        }
        exponent = exponent >> 1n;
        base = mod(base * base, modulus);
    }
    return result;
}

module.exports = {
    encodeBase58,
    encodeBase58Checksum,
    hash256,
    hash160,
    mod,
    pow
}

