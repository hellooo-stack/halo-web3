const {OP_CODE_NAMES} = require("./op");
const {readVarint, encodeVarint} = require("./helper");
const {encode} = require("bs58check");
const SmartBuffer = require("smart-buffer").SmartBuffer;

class Script{
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
     * @param {Buffer} s
     */
    static parse(s) {
        const length = readVarint(s);
        const cmds = [];
        let count = 0;
        while (count < length) {
            const current = s.readUInt8();
            count++;
            let cmd;
            if (current >= 1 && current <= 75) {
                cmd = s.readBuffer(current);
                count += current;
            } else if (current === 76) {
                const next = s.readUInt8();
                cmd = s.readBuffer(next);
                count += next + 1;
            } else if (current === 77) {
                const next = s.readUInt16LE();
                cmd = s.readBuffer(next);
                count += next + 2;
            } else {
                cmd = current;
            }
            cmds.push(cmd);
        }
    }

    rawSerialize() {
        const s = new SmartBuffer();
        for (const cmd of this.cmds) {
            if (typeof cmd === "number") {
                s.writeUInt8(cmd);
            } else {
                const pushOpcode = cmd.opcode;
                if (pushOpcode <= Opcode.OP_PUSHBYTES_75) {
                    s.writeBuffer(Buffer.concat([Buffer.alloc(1, pushOpcode), cmd.data]));
                } else if (pushOpcode === Opcode.OP_PUSHDATA1) {
                    s.writeBuffer(
                        Buffer.concat([
                            Buffer.alloc(1, pushOpcode),
                            Buffer.alloc(1, cmd.originalLength),
                            cmd.data
                        ])
                    );
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