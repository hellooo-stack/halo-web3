const ethers = require('ethers');

let main = 'https://mainnet.infura.io/v3/8879adc5ace644639944a6b9505248c8';
let sepolia = 'https://sepolia.infura.io/v3/8879adc5ace644639944a6b9505248c8';
(async function () {
    const provider = new ethers.JsonRpcProvider(sepolia);
    let blockNumber = await provider.getBlockNumber();
    let balance = await provider.getBalance('0xd529DeF12F16C1D9b22c095983C2972ee9427085');
    console.log('blockNumber: ', blockNumber);
    console.log('balance: ', balance);
})();




