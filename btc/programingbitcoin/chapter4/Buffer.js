/**
 * @author: Jeb.Wang
 * @date: 2023/8/19 07:30
 */
const b = Buffer.alloc(32, 0x00);
console.log(b);

const b1 = Buffer.alloc(32, 0x00);
b1.writeInt8(0x01)
console.log(b1);

let prefix = Buffer.alloc(1, 0x6f);
let prefix1 = Buffer.alloc(1, 0x00);
console.log(prefix);
console.log(prefix1);

const s_inv = BigInt(1).modInverse(10);
console.log(s_inv);

