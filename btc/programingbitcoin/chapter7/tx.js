const {reverseBuffer, hash256, encodeVarint} = require("./helper");
const http = require("http");
const {SmartBuffer} = require("smart-buffer");
const {bigIntToBufferLE} = require("./numbers");
import fetch from "node-fetch";

/**
 * @author: Jeb.Wang
 * @date: 2023/8/19 22:33
 */
class TxFetcher {
    static cache = {};

    static getUrl(testnet = false) {
        if (testnet) {
            return 'https://blockstream.info/testnet/api/';
        } else {
            return 'https://blockstream.info/api/';
        }
    }

    // todo: fetch tx from blockstream.info
    static async fetch(txId, testnet = false, fresh = false) {
        if (fresh || TxFetcher.cache[txId] === undefined) {
            const url = `${TxFetcher.getUrl(testnet)}/tx/${txId}/hex`;
            let response = await fetch(url);
            if (response.status !== 200) {
                throw Error(`Error fetching tx: ${txId}`);
            }
            const rawTx = await response.text();
            let raw = Buffer.from(rawTx, "hex");
            let tx;
            if (raw[4] === 0) {
                raw = Buffer.concat([raw.slice(0, 4), raw.slice(6)]);
                tx = Tx.parse(raw, testnet);
                tx.locktime = raw.slice(raw.length - 4).readUInt32LE(0);
            } else {
                tx = Tx.parse(raw, testnet);
            }
            if (tx.id() !== txId)
                throw Error(`not the same id: ${tx.id()} vs ${txId}`);
            TxFetcher.cache[txId] = tx;
        }
        TxFetcher.cache[txId].testnet = testnet;
        return TxFetcher.cache[txId];
    }

    // todo: load tx from file
    static loadCache(filename) {

    }

    // todo: dump tx to file
    static dumpCache(filename) {

    }
}

class Tx {
    constructor(version, txIns, txOuts, locktime, testnet = false) {
        this.version = version;
        this.txIns = txIns;
        this.txOuts = txOuts;
        this.locktime = locktime;
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
        return this.hash().toString('hex');
    }

    hash() {
        return reverseBuffer(hash256(this.serialize()));
    }

    static parse(s, testnet = false) {

    }

    serialize() {
        const s = new SmartBuffer();
        s.writeUInt32LE(this.version);
        s.writeBuffer(encodeVarint(this.txIns.length));
        for (const txIn of this.txIns) {
            s.writeBuffer(txIn.serialize());
        }
        s.writeBuffer(encodeVarint(this.txOuts.length));
        for (const txOut of this.txOuts) {
            s.writeBuffer(txOut.serialize());
        }
        s.writeUInt32LE(this.locktime)
        return s.toBuffer()
    }

    fee() {

    }
}

class TxIn {
    constructor(prevTx, prevIndex, scriptSig = null, sequence = 0xffffffff) {
        this.prevTx = prevTx;
        this.prevIndex = prevIndex;
        if (scriptSig === null) {
        //     todo
        } else {
            this.scriptSig = scriptSig;
        }
        this.sequence = sequence;
    }

    toString() {
        return `${this.prevTx.hex()}:${this.prevIndex}`;
    }

    // todo
    static parse(s) {

    }

    serialize() {
        const s = new SmartBuffer();
        s.writeBuffer(reverseBuffer(this.prevTx));
        s.writeUInt32LE(this.prevIndex);
        s.writeBuffer(this.scriptSig.serialize());
        s.writeUInt32LE(this.sequence);
        return s.toBuffer();
    }

    fetchTx(testnet = false) {

    }

    value(testnet = false) {
        const tx = this.fetchTx(testnet);
        return tx.txOuts[this.prevIndex].amount;
    }

    scriptPubKey(testnet = false) {
        const tx = this.fetchTx(testnet);
        return tx.txOuts[this.prevIndex].scriptPubKey;
    }
}

class TxOut {
    constructor(amount, scriptPubKey) {
        this.amount = amount;
        this.scriptPubKey = scriptPubKey;
    }

    toString() {
        return `${this.amount}:${this.scriptPubKey}`;
    }

    // todo
    static parse(s) {

    }

    serialize() {
        const amount = bigIntToBufferLE(this.amount, 8);
        const scriptPubKey = this.scriptPubKey.serialize();
        return Buffer.concat([amount, scriptPubKey]);
    }
}



