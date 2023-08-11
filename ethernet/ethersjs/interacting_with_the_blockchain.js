const config = require('./config.json');
const ethers = require('ethers');

(async function () {
    const provider = new ethers.JsonRpcProvider(sepolia);
    let blockNumber = await provider.getBlockNumber();
    let balance = await provider.getBalance('0xd529DeF12F16C1D9b22c095983C2972ee9427085');
    console.log('blockNumber: ', blockNumber);
    console.log('balance: ', balance);
})();