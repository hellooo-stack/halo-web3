const buffer1 = Buffer.alloc(10);
console.log('buffer1: ', buffer1);
console.log('buffer1.length: ', buffer1.length);
console.log('buffer1.byteLength: ', buffer1.byteLength);

const buffer2 = Buffer.alloc(8);
console.log('buffer2: ', buffer2);
buffer2.writeBigInt64BE(258n);
console.log('buffer2: ', buffer2);

const buffer3 = Buffer.alloc(8);
console.log('buffer3: ', buffer3);
buffer3.writeBigInt64LE(258n);
console.log('buffer3: ', buffer3);

const num1 = buffer3.readBigInt64LE();
const num2 = buffer3.readBigInt64BE();
console.log('num1: ', num1);
console.log('num2: ', num2);

console.log(2n ** 8n);

// console.log(toInt(buffer3, "little"));
console.log(toInt(buffer2, "big"));

function toInt(buffer, endian) {
    let total = buffer.byteLength > 4 ? 0n : 0;
    for (
        let i = endian === "little" ? buffer.byteLength - 1 : 0;
        endian === "little" ? i >= 0 : i < buffer.byteLength;
        endian === "little" ? i-- : i++
    ) {
        if (typeof total === "bigint") {
            total = total * 2n ** 8n + BigInt(buffer[i]);
        } else {
            total = total * 2 ** 8 + buffer[i];
        }
    }
    return total;
}