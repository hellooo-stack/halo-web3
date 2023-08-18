// const bi = 23333n;
// console.log(bi.toString(16));

// const buf = Buffer.alloc(20);
// buf.writeBigUInt64BE(10000000000000000000n);
// console.log(buf);

const buf = Buffer.from(100n.toString(16), 'hex');
const bufZero = Buffer.from([0]);

console.log(buf);
console.log(bufZero);
const concat = Buffer.concat([bufZero, buf]);
console.log(concat);

console.log(concat.length);
console.log(concat.byteLength);