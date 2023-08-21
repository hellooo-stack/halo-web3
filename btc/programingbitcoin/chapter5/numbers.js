/**
 * @author: Jeb.Wang
 * @date: 2023/8/19 07:41
 */

function bigIntToBuffer(num, bytes = 32) {
    const hexString = num.toString(16).padStart(bytes * 2, '0');
    return Buffer.from(hexString, 'hex');
}

function bufferToBigInt(buf) {
    const hexs = '0x' + buf.toString('hex');
    return BigInt(hexs);
}

function randomBigInt(max) {
    const buf = Buffer.alloc(32);
    for (let i = 31; i >= 0; i--) {
        let randomByte = 0;
        for (let j = 0; j < 8; j++) {
            const randomBit = Math.round(Math.random());
            randomByte |= (randomBit << j);
        }

        buf.fill(Buffer.alloc(1, randomByte), i, i + 1);
        if (bufferToBigInt(buf) >= max) {
            buf.fill(Buffer.alloc(1, 0x0), i, i + 1);
            return bufferToBigInt(buf);
        }
    }

    return bufferToBigInt(buf);
}

module.exports = {
    bigIntToBuffer,
    bufferToBigInt,
    randomBigInt
}

