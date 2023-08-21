// const buffer = Buffer.alloc(4, 0x0);
// buffer[0] = 244;
// buffer[1] = 13;
// buffer[2] = 4;
// buffer[3] = 129;
//
// console.log(buffer);
//
// console.log(buffer.readUint8());
// console.log(buffer.readUint8());
// buffer.readuint


const buffer = Buffer.alloc(3, 0xfd);
buffer.writeUInt16LE(257, 1);
console.log(buffer);


