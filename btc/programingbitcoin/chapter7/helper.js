const crypto = require('crypto');
const SmartBuffer = require("smart-buffer").SmartBuffer;


function _sha256() {
    return crypto.createHash('sha256');
}

function _ripemd160() {
    return crypto.createHash('ripemd160');
}

/**
 * hash160 === ripemd160(sha256(data))
 *
 * @param {Buffer|string} data
 * @returns {*} Buffer
 */
function hash160(data) {
    const sha256Result = _sha256().update(data).digest();
    return _ripemd160().update(sha256Result).digest();
}

/**
 * hash256 === sha256(sha256(data))
 *
 * @param {Buffer|string} data
 * @returns {*} Buffer
 */
function hash256(data) {
    const sha256Result = _sha256().update(data).digest();
    return _sha256().update(sha256Result).digest();
}


const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

/**
 *
 * @param {Buffer} buffer
 * @returns {string}
 */
function encodeBase58(buffer) {
    let zeroCount = 0;
    for (const b of buffer) {
        if (b === 0) {
            zeroCount += 1;
        } else {
            break;
        }
    }

    let num = toBigIntBE(buffer);
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
 * @param {Buffer} buffer
 * @returns {string} string
 */
function encodeBase58Checksum(buffer) {
    const checkSum = hash256(buffer).subarray(0, 4);
    return encodeBase58(Buffer.concat([buffer, checkSum]));
}

/**
 * @param {string} str
 * @returns {Buffer}
 */
function decodeBase58(str) {
    let num = 0n;
    for (const c of str) {
        num *= 58n;
        num += BigInt(BASE58_ALPHABET.indexOf(c));
    }
    let combined = toBufferBE(num, 25);
    const checksum = combined.subarray(combined.length - 4);
    const calculatedCheckSum = hash256(combined.subarray(0, combined.length - 4));
    if (calculatedCheckSum.equals(checksum)) {
        throw Error('Invalid checksum');
    }

    return combined.subarray(1, combined.length - 4);
}

// /**
//  *
//  * @param {Buffer} buffer
//  * @returns {*|number|bigint}
//  */
// function readVarint(buffer) {
//     const i = buffer.readUInt8();
//     if (i === 0xfd) {
//         return toBigIntLE(buffer.subarray(1, 1 + 2));
//     } else if (i === 0xfe) {
//         return toBigIntLE(buffer.subarray(1, 1 + 4));
//     } else if (i === 0xff) {
//         return toBigIntLE(buffer.subarray(1, 1 + 8));
//     } else {
//         return BigInt(i);
//     }
// }

/**
 *
 * @param {SmartBuffer} buffer
 */
function readVarint(buffer) {
    const i = buffer.readUInt8();
    if (i === 0xfd) {
        return toBigIntLE(buffer.readBuffer(2));
    } else if (i === 0xfe) {
        return toBigIntLE(buffer.readBuffer(4));
    } else if (i === 0xff) {
        return toBigIntLE(buffer.readBuffer(8));
    } else {
        return BigInt(i);
    }
}

/**
 *
 * @param {number} integer
 * @returns {Buffer}
 */
function encodeVarint(integer) {
    if (integer < 0xfd) {
        // i < 253, encode as single byte
        return Buffer.from([integer]);
    } else if (integer < 0x10000) {
        // 253 < i < 2^16 - 1, start with 253 byte (fd), encode as 2 bytes (le)
        const buffer = Buffer.alloc(3, 0xfd);
        buffer.writeUInt16LE(integer, 1);
        return buffer;
    } else if (integer < 0x100000000) {
        // 2^16 < i < 2^32 - 1, start with 254 byte (fe), encode as 4 bytes (le)
        const buffer = Buffer.alloc(5, 0xfe);
        buffer.writeUInt32LE(integer, 1);
        return buffer;
    } else if (integer < 0x10000000000000000) {
        // 2^32 < i < 2^64 - 1, start with 255 byte (ff), encode as 8 bytes (le)
        return Buffer.concat([Buffer.from("ff", "hex"), u64ToEndian(integer, 'le')]);
    } else {
        throw new Error("Integer too large");
    }
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

// bigint mod that produces a positive value
function mod(n, m) {
    return ((n % m) + m) % m;
}

/**
 *
 * @param {Buffer} buffer
 */
function reverseBuffer(buffer) {
    const reversed = Buffer.alloc(buffer.byteLength);
    for (const [i, byte] of buffer.entries()) {
        reversed[buffer.byteLength - i - 1] = byte;
    }
    return reversed;
}

function toBigInt(buffer, endian = "be") {
    let total = 0n;
    for (
        let i = endian === "le" ? buffer.byteLength - 1 : 0;
        endian === "le" ? i >= 0 : i < buffer.byteLength;
        endian === "le" ? i-- : i++
    ) {
        total = total * 2n ** 8n + BigInt(buffer[i]);
    }
    return total;
}

function toBigIntLE(buffer) {
    return toBigInt(buffer, "le");
}

function toBigIntBE(buffer) {
    return toBigInt(buffer, "be");
}

/**
 *
 * @param {bigint} num
 * @param endian
 * @param {number=} byteLength
 */
function toBuffer(num, endian = 'be', byteLength) {
    let length = byteLength || bigintBytes(num);
    if (length === 0) {
        return Buffer.alloc(0);
    }

    const bits = [];
    while (num > 0) {
        const remainder = num % 2n;
        bits.push(remainder);
        num = num / 2n;
    }

    let counter = 0;
    let total = 0;
    const buffer = Buffer.alloc(length, 0x0);

    const writeByte = (byte) => {
        if (endian === 'be') {
            buffer[length - 1] = byte;
        } else {
            buffer[buffer.byteLength - length] = byte;
        }
    };

    for (const bit of bits) {
        if (counter % 8 === 0 && counter > 0) {
            writeByte(total);
            total = 0;
            counter = 0;
            length--;
        }

        if (bit) {
            total += Math.pow(2, counter);
        }
        counter++;
    }
    writeByte(total);

    return buffer;
}

function toBufferLE(num, byteLength) {
    return toBuffer(num, 'le', byteLength);
}

function toBufferBE(num, byteLength) {
    return toBuffer(num, 'be', byteLength);
}

function u64ToEndian(number, endian = 'be') {
    return endian === "be"
        ? toBufferBE(BigInt(number), 8)
        : toBufferLE(BigInt(number), 8);
}

/**
 * @param {bigint} num
 */
function bigintBytes(num) {
    let bytes = 0;
    while (num > 0) {
        bytes++;
        num = num >> 8n;
    }
    return bytes;
}


module.exports = {
    hash160,
    hash256,
    encodeBase58,
    encodeBase58Checksum,
    decodeBase58,
    readVarint,
    encodeVarint,
    pow,
    reverseBuffer,
    toBigIntLE,
    toBigIntBE,
    toBufferLE,
    toBufferBE,
}

