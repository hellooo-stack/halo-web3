const bitcoinMessage = require('bitcoinjs-message');

// let message = 'a secret message!';
// let address = '1LoVGDgRs9hTfTNJNuXKSpywcbdvwRXpmK';
// // let signature = 'MEQCIF0LboF+AeIrpqsZwKuc27LbzQYSxbj5kEMd0GNPWpZTAiAYi5iQF+5+gw3lgdTg1Gqja755U3d01Wy+QZk7P9Zmhg===';
// let signature = '304402205d0b6e817e01e22ba6ab19c0ab9cdbb2dbcd0612c5b8f990431dd0634f5a96530220188b989017ee7e830de581d4e0d46aa36bbe79537774d56cbe41993b3fd66686';

// // 自己的测试账号 unisat生成的sign
let message = 'hello world~';
let address = 'tb1qj2yrg95zt4sjqgtj9tu44d64xqe4m79rm89ne3';
let signature = 'GxgtooYWXtBOoAPhQQHzCleEvfB3rsJ0XL4QZdyFQxD2Qs3JviIDhJA8CpO1JtdZpNYlrw6thAYoJLioyBkZvTc=';

// 自己的测试账号 用java代码生成的sign
// let message = 'hello world';
// let address = 'tb1qj2yrg95zt4sjqgtj9tu44d64xqe4m79rm89ne3';
// let signature = 'H7JJTwrfed+eih5feDitoT1HRopdsi+61l+NMOHizF2UFfL5ljXxolYnjKDhq/MAHO4urqmb7EYijH5YZjHk/8Y=';


let isValid = false;
isValid = simpleVerification(message, address, signature);
if (!isValid) {
    isValid = fallbackVerification(message, address, signature);
}
console.log('is valid: ' + isValid);

function simpleVerification(message, address, signature) {
    let isValid = false;
    try {
        isValid = bitcoinMessage.verify(message, address, signature);
    } catch (e) {
    }
    return isValid;
}

function fallbackVerification(message, address, signature) {
    let isValid = false;
    const flags = [...Array(12).keys()].map(i => i + 31);
    for (let flag of flags) {
        let flagByte = Buffer.alloc(1);
        flagByte.writeInt8(flag);
        let sigBuffer = Buffer.from(signature, 'base64').slice(1);
        sigBuffer = Buffer.concat([flagByte, sigBuffer]);
        let candidateSig = sigBuffer.toString('base64');
        try {
            isValid = bitcoinMessage.verify(message, address, candidateSig);
            if (isValid) break;
        } catch (e) {
            console.error(e);
        }
    }
    return isValid;
}

function verify(message, address, signature) {
    let isValid = simpleVerification(message, address, signature);
    if (!isValid) {
        isValid = fallbackVerification(message, address, signature);
    }

    return isValid;
}