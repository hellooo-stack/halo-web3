const {OP_CODE_NAMES, Opcode} = require("./op");
const {readVarint, encodeVarint, toBufferLE} = require("./helper");
const SmartBuffer = require("smart-buffer").SmartBuffer;

class Script {
    constructor(cmds = []) {
        this.cmds = cmds;
    }

    toString() {
        let result = [];
        for (const cmd of this.cmds) {
            if (typeof cmd === 'number') {
                let name;
                if (OP_CODE_NAMES[cmd]) {
                    name = result.push(OP_CODE_NAMES[cmd]);
                } else {
                    name = `OP_[${cmd}]`;
                }
                result.push(name);
            } else {
                result.push(cmd.toString('hex'));
            }
        }
        return result.join(' ');
    }

    add(other) {
        return new Script([...this.cmds, ...other.cmds]);
    }

    /**
     * @param {SmartBuffer} s
     */
    static parse(s) {
        const length = readVarint(s);
        const cmds = [];
        let count = 0;
        while (count < length) {
            let current = s.readBuffer(1);
            count += 1;
            let currentByte = current[0];
            if (currentByte >= 1 && currentByte <= 75) {
                let n = currentByte;
                if (n + count > length) {
                    n = Number(length) - count;
                }
                const data = s.readBuffer(n);
                cmds.push({ opcode: currentByte, data, originalLength: currentByte });
                count += n;
            } else if (currentByte === 76) {
                if (count + 1 > length) {
                    cmds.push(currentByte);
                    break;
                }
                const parsedDataLength = s.readUInt8();
                let dataLength = parsedDataLength;
                if (dataLength + count + 1 > length) {
                    dataLength = Number(length) - count - 1;
                }
                const data = s.readBuffer(dataLength);
                cmds.push({
                    opcode: currentByte,
                    data,
                    originalLength: parsedDataLength
                });
                count += dataLength + 1;
            } else if (currentByte === 77) {
                if (count + 2 > length) {
                    if (count + 1 > length) {
                        cmds.push(currentByte);
                    } else {
                        const nextByte = s.readUInt8();
                        cmds.push(currentByte);
                        cmds.push(nextByte);
                        count += 1;
                    }
                    break;
                }
                const parsedDataLength = s.readUInt16LE();
                let dataLength = parsedDataLength;
                if (dataLength + count + 2 > length) {
                    dataLength = Number(length) - count - 2;
                }
                const data = s.readBuffer(dataLength);
                cmds.push({
                    opcode: currentByte,
                    data,
                    originalLength: parsedDataLength
                });
                count += dataLength + 2;
            } else {
                const opCode = currentByte;
                cmds.push(opCode);
            }
        }
        if (count !== Number(length)) {
            throw Error("parsing script failed");
        }
        return new Script(cmds);
    }

    rawSerialize() {
        const s = new SmartBuffer();
        for (const cmd of this.cmds) {
            if (typeof cmd === 'number') {
                s.writeUInt8(cmd);
            } else {
                const pushOpcode = cmd.opcode;
                if (pushOpcode <= Opcode.OP_PUSHBYTES_75) {
                    s.writeBuffer(Buffer.concat([Buffer.alloc(1, pushOpcode), cmd.data]));
                } else if (pushOpcode === Opcode.OP_PUSHDATA1) {
                    s.writeBuffer(Buffer.concat([
                        Buffer.alloc(1, pushOpcode),
                        Buffer.alloc(1, cmd.originalLength),
                        cmd.data
                    ]));
                } else if (pushOpcode === Opcode.OP_PUSHDATA2) {
                    s.writeBuffer(
                        Buffer.concat([
                            Buffer.alloc(1, pushOpcode),
                            toBufferLE(cmd.originalLength, 2),
                            cmd.data
                        ])
                    );
                }
            }
        }

        return s.toBuffer();
    }

    serialize() {
        const result = this.rawSerialize();
        const total = result.length;
        return Buffer.concat([encodeVarint(total), result]);
    }

    evaluate(z) {

    }
}

exports.Script = Script;
