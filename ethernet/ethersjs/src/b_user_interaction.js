const config = require('./config.js');
const ethers = require('ethers');

async function sendValue(signer) {
    const tx = await signer.sendTransaction({
        to: '0xd529DeF12F16C1D9b22c095983C2972ee9427085',
        value: ethers.parseEther('0.001')
    });

    const receipt = await tx.wait();
    console.log('receipt: ', receipt);
}

async function callContract(signer) {

}

async function callContractWithValue(signer) {

}


(async function () {
    const url = config.getNetWorkUrl();
    const provider = await new ethers.JsonRpcProvider(url);

    const privateKey = config.getAccount2().privateKey;
    const signer = new ethers.Wallet(privateKey, provider);

    await sendValue(signer);


})();
