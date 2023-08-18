let hexString = '0x00000000000000000000000000000000000000000000000000000000000000067c';
if (hexString.startsWith('0x')) {
    hexString = hexString.substring(2);
    console.log('hexString: ', hexString);
}
const buffer = Buffer.from(hexString, 'hex');
const lastByte = buffer[buffer.length - 1];
const lastByteHex = lastByte.toString();
console.log('lastByteHex: ', lastByteHex);

const bigintFromBuffer = buffer.subarray(buffer.length - 2);
const hexStringFromSubArr = BigInt('0x' + bigintFromBuffer.toString('hex'));
console.log('hexStringFromSubArr: ', hexStringFromSubArr);


