/**
 * @author: Jeb.Wang
 * @date: 2023/8/19 07:41
 */

function bigIntToBuffer(num, bytes = 32) {
    const hexString = num.toString(16).padStart(bytes * 2, '0');
    return Buffer.from(hexString, 'hex');
}

function bufferToBigInt(buf) {
    return BigInt('0x' + buf.toString('hex'));
}

module.exports = {
    bigIntToBuffer,
    bufferToBigInt
}
console.log(bigIntToBuffer(1200n));
console.log(bufferToBigInt(bigIntToBuffer(1200n)));
