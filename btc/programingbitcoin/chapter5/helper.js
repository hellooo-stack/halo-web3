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

/**
 *
 * @param buf Buffer
 */
function reverseBuffer(buf) {
    const reversed = Buffer.alloc(buffer.byteLength);
    for (const [i, byte] of buf.entries()) {
        reversed[buf.byteLength - i - 1] = byte;
    }
    return reversed;
}

function encodeVarint(integer) {
    if (integer < 0xfd) {
        // i < 253, encode as single byte
        return Buffer.from([integer]);
    } else if (integer < 0x10000) {
        // 253 < i < 2^16 - 1, start with 253 byte (fd), encode as 2 bytes (le)
        const s = Buffer.alloc(3, 0xfd);
        s.writeUInt16LE(integer, 1);
        return s;
    } else if (integer < 0x100000000) {
        // 2^16 < i < 2^32 - 1, start with 254 byte (fe), encode as 4 bytes (le)
        const s = Buffer.alloc(5, 0xfe);
        s.writeUInt32LE(integer, 1);
        return s;
    } else if (integer < 0x10000000000000000) {
        // 2^32 < i < 2^64 - 1, start with 255 byte (ff), encode as 8 bytes (le)
        return Buffer.concat([Buffer.from("ff", "hex"), u64ToEndian(integer)]);
    } else {
        throw new Error("Integer too large");
    }
}


module.exports = {
    encodeBase58,
    encodeBase58Checksum,
    hash256,
    hash160,
    mod,
    pow,
    reverseBuffer,
    encodeVarint
}

