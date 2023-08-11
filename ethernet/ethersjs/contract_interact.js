const ethers = require('ethers');

function privateKeyToAddress(privateKey) {
    let wallet = new ethers.Wallet(privateKey);
    return wallet.address;
}

function generatePrivateKey(c) {
    let result = '0x';
    for (let i = 0; i < 64; i++) {
        result = result + c;
    }
    return result;
}

function address(c) {
    let privateKey = generatePrivateKey(c);
    return privateKeyToAddress(privateKey);
}

console.log(address('4'));


// 钱比较多的：
// 0x0000000000000000000000000000000000000000000000000000000000000001
// 0x1111111111111111111111111111111111111111111111111111111111111111