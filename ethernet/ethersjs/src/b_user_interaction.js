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
    const tx = await signer.sendTransaction({
        to: '0xf7c728Cc6d146D38e71A4fCf5b0742dAE0803aAB',
        data: ethers.to
    });

    const receipt = await tx.wait;
    console.log('receipt: ', receipt);
}

async function callContractWithValue(signer) {

}


(async function () {
    const url = config.getNetWorkUrl();
    const provider = await new ethers.JsonRpcProvider(url);

    const privateKey = config.getAccount2().privateKey;
    const signer = new ethers.Wallet(privateKey, provider);

    // await sendValue(signer);
    await callContract(signer);


})();
