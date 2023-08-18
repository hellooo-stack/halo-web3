const crypto = require(crypto);

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

// s is the dec string
function encodeBase58(s) {
    if (s.startsWith('0x')) {
        s = s.substring(2);
    }

    const sBuffer = Buffer.from(s, 'hex');

    let zeroCount = 0;
    for (let i = 0; i < sBuffer.length; i++) {
        if (sBuffer[i] === 0) {
            zeroCount += 1;
        } else {
            break;
        }
    }

    let result = '';
    let prefix = '1'.repeat(zeroCount);
    let dividend = BigInt('0x' + s);
    while (dividend > 0n) {
        const {quotient, remainder} = divmod(dividend, 58n);
        dividend = quotient;
        result = BASE58_ALPHABET[remainder] + result;
    }

    return prefix + result;
}

function encode_base58_checksum(raw) {

}

function hash256(s) {
    const sha256 = crypto.createHash('sha256');
    sha256.update(s);

    return crypto.createHash('sha256').update(sha256.digest()).digest();
}

function hash160(s) {
    const sha256 = crypto.createHash('sha256');
    sha256.update(s);

    const ripemd160 = crypto.createHash('ripemd160');
    ripemd160.update(s.digest());

    return ripemd160.digest();
}

function divmod(a, b) {
    const quotient = Math.floor(a / b);
    const remainder = a % b;
    return {quotient, remainder};
}



