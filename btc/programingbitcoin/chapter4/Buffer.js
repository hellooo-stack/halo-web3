/**
 * @author: Jeb.Wang
 * @date: 2023/8/19 07:30
 */
const b = Buffer.alloc(32, 0x00);
console.log(b);

const b1 = Buffer.alloc(32, 0x00);
b1.writeInt8(0x01)
console.log(b1);
