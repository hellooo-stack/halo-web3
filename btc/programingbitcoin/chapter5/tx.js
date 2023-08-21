const {reverseBuffer, hash256} = require("./helper");

/**
 * @author: Jeb.Wang
 * @date: 2023/8/19 22:33
 */
class Tx {
    constructor(version, txIns, txOuts, testnet = false) {
        this.version = version;
        this.txIns = txIns;
        this.txOuts = txOuts;
        this.testnet = testnet;
    }

    toString() {
        let txIns = "";
        for (const txIn of this.txIns) {
            txIns += `${txIn}\n`;
        }
        let txOuts = "";
        for (const txOut of this.txOuts) {
            txOuts += `${txOut}\n`;
        }
        return `tx: ${this.id()}\nversion: ${
            this.version
        }\ntx_ins:\n${txIns}tx_outs:\n${txOuts}locktime: ${this.locktime}`;
    }

    id() {
        return
    }

    hash() {
        return reverseBuffer(hash256(this.))
    }
}
