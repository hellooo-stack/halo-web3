const {hash160, hash256, reverseBuffer, sha1} = require('./helper');
const {S256Point, Signature} = require("./ecc");

/**
 *
 * @param {number} num
 * @returns {Buffer}
 */
function encodeNum(num) {
    if (num === 0) return Buffer.alloc(0);

    let absNum = Math.abs(num);
    const negative = num < 0;
    const result = [];
    while (absNum) {
        result.push(absNum & 0xff);
        absNum >>= 8;
    }
    if (result[result.length - 1] & 0x80) {
        if (negative) {
            result.push(0x80);
        } else {
            result.push(0);
        }
    } else if (negative) {
        result[result.length - 1] |= 0x80;
    }
    return Buffer.from(result);
}

/**
 *
 * @param {Buffer} element
 * @returns {number}
 */
function decodeNum(element) {
    if (element.equals(Buffer.alloc(0))) return 0;

    const bigEndian = reverseBuffer(element);
    let negative;
    let result;
    if (bigEndian[0] & 0x80) {
        negative = true;
        result = bigEndian[0] & 0x7f;
    } else {
        negative = false;
        result = bigEndian[0];
    }
    for (const c of bigEndian.subarray(1)) {
        result <<= 8;
        result += c;
    }
    if (negative) {
        return -result;
    } else {
        return result;
    }
}

/**
 *
 * @param {Buffer[]} stack
 * @returns {boolean}
 */
function op0(stack) {
    stack.push(encodeNum(0));
    return true;
}

function op1Negate(stack) {
    stack.append(encodeNum(-1));
    return true;
}

function op1(stack) {
    stack.push(encodeNum(1));
    return true;
}

function op2(stack) {
    stack.push(encodeNum(2));
    return true;
}

function op3(stack) {
    stack.push(encodeNum(3));
    return true;
}

function op4(stack) {
    stack.push(encodeNum(4));
    return true;
}

function op5(stack) {
    stack.push(encodeNum(5));
    return true;
}

function op6(stack) {
    stack.push(encodeNum(6));
    return true;
}

function op7(stack) {
    stack.push(encodeNum(7));
    return true;
}

function op8(stack) {
    stack.push(encodeNum(8));
    return true;
}

function op9(stack) {
    stack.push(encodeNum(9));
    return true;
}

function op10(stack) {
    stack.push(encodeNum(10));
    return true;
}

function op11(stack) {
    stack.push(encodeNum(11));
    return true;
}

function op12(stack) {
    stack.push(encodeNum(12));
    return true;
}

function op13(stack) {
    stack.push(encodeNum(13));
    return true;
}

function op14(stack) {
    stack.push(encodeNum(14));
    return true;
}

function op15(stack) {
    stack.push(encodeNum(15));
    return true;
}

function op16(stack) {
    stack.push(encodeNum(16));
    return true;
}

function opNop(stack) {
    return true;
}

function opIf(stack, items) {
    if (stack.length < 1) {
        return false;
    }

    const trueItems = [];
    const falseItems = [];
    let currentArray = trueItems;
    let found = false;
    let numEndIfsNeeded = 1;
    while (items.length > 0) {
        const item = items.pop();
        if (item === 99 || item === 100) {
            numEndIfsNeeded += 1;
            currentArray.push(item);
        } else if (numEndIfsNeeded === 1 && item === 103) {
            currentArray = falseItems;
        } else if (item === 104) {
            if (numEndIfsNeeded === 1) {
                found = true;
                break;
            } else {
                numEndIfsNeeded -= 1;
                currentArray.push(item);
            }
        } else {
            currentArray.push(item);
        }
    }
    if (!found) {
        return false;
    }
    const element = stack.pop();
    if (decodeNum(element) === 0) {
        items.unshift(falseItems);
    } else {
        items.unshift(trueItems);
    }

    return true;
}

function opNotIf(stack, items) {
    // todo
}

function opVerify(stack) {
    if (stack.length < 1) {
        return false;
    }
    const element = stack.pop();
    return decodeNum(element) !== 0;
}

function opCheckSig(stack, z) {
    if (stack.length < 2) {
        return false;
    }
    const secPubkey = stack.pop();
    let derSignature = stack.pop();
    derSignature = derSignature.slice(0, derSignature.length - 1);
    let point;
    let sig;
    try {
        point = S256Point.parse(secPubkey);
        sig = Signature.parse(derSignature);
    } catch (e) {
        console.error(e);
        return false;
    }
    if (point.verify(z, sig)) {
        stack.push(encodeNum(1));
    } else {
        stack.push(encodeNum(0));
    }
    return true;
}

function opHash160(stack) {
    if (stack.length < 1) return false;
    const element = stack.pop();
    stack.push(hash160(element));
    return true;
}

OP_CODE_FUNCTIONS = {
    0: op0,
    81: op1,
    82: op2,
    83: op3,
    84: op4,
    85: op5,
    86: op6,
    87: op7,
    88: op8,
    89: op9,
    90: op10,
    91: op11,
    92: op12,
    93: op13,
    94: op14,
    95: op15,
    96: op16,
    105: opVerify,
    // 110: op2dup,
    // 124: opSwap,
    // 135: opEqual,
    // 136: opEqualVerify,
    // 145: opNot,
    // 147: opAdd,
    // 149: opMul,
    // 118: opDup,
    // 167: opSha1,
    // 169: opHash160,
    // 170: opHash256,
    // 172: opChecksig,
    // 174: opCheckMultisig
}

OP_CODE_NAMES = {
    0: "OP_0",
    76: "OP_PUSHDATA1",
    77: "OP_PUSHDATA2",
    78: "OP_PUSHDATA4",
    79: "OP_1NEGATE",
    81: "OP_1",
    82: "OP_2",
    83: "OP_3",
    84: "OP_4",
    85: "OP_5",
    86: "OP_6",
    87: "OP_7",
    88: "OP_8",
    89: "OP_9",
    90: "OP_10",
    91: "OP_11",
    92: "OP_12",
    93: "OP_13",
    94: "OP_14",
    95: "OP_15",
    96: "OP_16",
    97: "OP_NOP",
    99: "OP_IF",
    100: "OP_NOTIF",
    102: "OP_VERNOTIF",
    103: "OP_ELSE",
    104: "OP_ENDIF",
    105: "OP_VERIFY",
    106: "OP_RETURN",
    107: "OP_TOALTSTACK",
    108: "OP_FROMALTSTACK",
    109: "OP_2DROP",
    110: "OP_2DUP",
    111: "OP_3DUP",
    112: "OP_2OVER",
    113: "OP_2ROT",
    114: "OP_2SWAP",
    115: "OP_IFDUP",
    116: "OP_DEPTH",
    117: "OP_DROP",
    118: "OP_DUP",
    119: "OP_NIP",
    120: "OP_OVER",
    121: "OP_PICK",
    122: "OP_ROLL",
    123: "OP_ROT",
    124: "OP_SWAP",
    125: "OP_TUCK",
    130: "OP_SIZE",
    135: "OP_EQUAL",
    136: "OP_EQUALVERIFY",
    139: "OP_1ADD",
    140: "OP_1SUB",
    143: "OP_NEGATE",
    144: "OP_ABS",
    145: "OP_NOT",
    146: "OP_0NOTEQUAL",
    147: "OP_ADD",
    148: "OP_SUB",
    149: "OP_MUL",
    154: "OP_BOOLAND",
    155: "OP_BOOLOR",
    156: "OP_NUMEQUAL",
    157: "OP_NUMEQUALVERIFY",
    158: "OP_NUMNOTEQUAL",
    159: "OP_LESSTHAN",
    160: "OP_GREATERTHAN",
    161: "OP_LESSTHANOREQUAL",
    162: "OP_GREATERTHANOREQUAL",
    163: "OP_MIN",
    164: "OP_MAX",
    165: "OP_WITHIN",
    166: "OP_RIPEMD160",
    167: "OP_SHA1",
    168: "OP_SHA256",
    169: "OP_HASH160",
    170: "OP_HASH256",
    171: "OP_CODESEPARATOR",
    172: "OP_CHECKSIG",
    173: "OP_CHECKSIGVERIFY",
    174: "OP_CHECKMULTISIG",
    175: "OP_CHECKMULTISIGVERIFY",
    176: "OP_NOP1",
    177: "OP_CHECKLOCKTIMEVERIFY",
    178: "OP_CHECKSEQUENCEVERIFY",
    179: "OP_NOP4",
    180: "OP_NOP5",
    181: "OP_NOP6",
    182: "OP_NOP7",
    183: "OP_NOP8",
    184: "OP_NOP9",
    185: "OP_NOP10",
    229: "OP_RETURN_229",
    238: "OP_RETURN_238"
}

Opcode = {
    "OP_0": 0,
    "OP_PUSHBYTES_1": 1,
    "OP_PUSHBYTES_20": 20,
    "OP_PUSHBYTES_32": 32,
    "OP_PUSHBYTES_33": 33,
    "OP_PUSHBYTES_36": 36,
    "OP_PUSHBYTES_72": 72,
    "OP_PUSHBYTES_75": 75,
    "OP_PUSHDATA1": 76,
    "OP_PUSHDATA2": 77,
    "OP_PUSHDATA4": 78,
    "OP_1": 81,
    "OP_2": 82,
    "OP_6": 86,
    "OP_IF": 99,
    "OP_NOTIF": 100,
    "OP_VERNOTIF": 102,
    "OP_VERIFY": 105,
    "OP_RETURN": 106,
    "OP_TOALTSTACK": 107,
    "OP_FROMALTSTACK": 108,
    "OP_2DUP": 110,
    "OP_SWAP": 124,
    "OP_EQUAL": 135,
    "OP_EQUALVERIFY": 136,
    "OP_NOT": 145,
    "OP_ADD": 147,
    "OP_MUL": 149,
    "OP_DUP": 118,
    "OP_SHA1": 167,
    "OP_HASH160": 169,
    "OP_HASH256": 170,
    "OP_CHECKSIG": 172,
    "OP_CHECKSIGVERIFY": 173,
    "OP_CHECKMULTISIG": 174,
    "OP_CHECKMULTISIGVERIFY": 175,
    "OP_CHECKSIGADD": 186,
    "OP_RETURN_186": 186,
    "OP_RETURN_187": 187,
    "OP_RETURN_188": 188,
    "OP_RETURN_189": 189,
    "OP_RETURN_190": 190,
    "OP_RETURN_191": 191,
    "OP_RETURN_192": 192,
    "OP_RETURN_193": 193,
    "OP_RETURN_194": 194,
    "OP_RETURN_195": 195,
    "OP_RETURN_196": 196,
    "OP_RETURN_197": 197,
    "OP_RETURN_198": 198,
    "OP_RETURN_199": 199,
    "OP_RETURN_200": 200,
    "OP_RETURN_201": 201,
    "OP_RETURN_202": 202,
    "OP_RETURN_203": 203,
    "OP_RETURN_204": 204,
    "OP_RETURN_205": 205,
    "OP_RETURN_206": 206,
    "OP_RETURN_207": 207,
    "OP_RETURN_208": 208,
    "OP_RETURN_209": 209, // OP_RETURN_210,
    // OP_RETURN_211,
    // OP_RETURN_212,
    // OP_RETURN_213,
    // OP_RETURN_214,
    // OP_RETURN_215,
    // OP_RETURN_216,
    // OP_RETURN_217,
    // OP_RETURN_218,
    // OP_RETURN_219,
    // OP_RETURN_220,
    // OP_RETURN_221,
    // OP_RETURN_222,
    // OP_RETURN_223,
    // OP_RETURN_224,
    // OP_RETURN_225,
    // OP_RETURN_226,
    // OP_RETURN_227,
    // OP_RETURN_228,
    // "OP_RETURN_229": 229,
    // OP_RETURN_230,
    // OP_RETURN_231,
    // OP_RETURN_232,
    // OP_RETURN_233,
    // OP_RETURN_234,
    // OP_RETURN_235,
    // OP_RETURN_236,
    // OP_RETURN_237,
    // "OP_RETURN_238": 238,
    // OP_RETURN_239,
    // OP_RETURN_240,
    // OP_RETURN_241,
    // OP_RETURN_242,
    // OP_RETURN_243,
    // OP_RETURN_244,
    // OP_RETURN_245,
    // OP_RETURN_246,
    // OP_RETURN_247,
    // OP_RETURN_248,
    // OP_RETURN_249,
    // OP_RETURN_250,
    // OP_RETURN_251,
    // OP_RETURN_252,
    // OP_RETURN_253,
    // OP_RETURN_254,
    // OP_RETURN_255
}

module.exports = {
    encodeNum,
    decodeNum,
    opCheckSig,
    opHash160,
    OP_CODE_FUNCTIONS,
    OP_CODE_NAMES,
    Opcode
}
