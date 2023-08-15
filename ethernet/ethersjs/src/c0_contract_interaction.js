const ethers = require('ethers');
const {Contract} = require("ethers");
const config = require("./config");

async function connectBlockchain() {
    const url = config.getNetWorkUrl();
    return new ethers.JsonRpcProvider(url);
}

const swallowerContractAddress = '0x0e74D2E00A912758a5597Ec5Dc7150A708BB4d90';

async function readContract() {
    const provider = await connectBlockchain();

    const abi = [
        'function spitedValue() view returns (uint256)'
    ];

    const contract = new Contract(swallowerContractAddress, abi, provider);
    const spitedValue = await contract.spitedValue();
    console.log('spitedValue: ', spitedValue);
}

async function writeContract() {
    // const provider = connectBlockchain();
    const url = config.getNetWorkUrl();
    const provider = new ethers.JsonRpcProvider(url);

    const privateKey = config.getAccount2().privateKey;
    const signer = new ethers.Wallet(privateKey, provider);

    const abi = [
        'function swallow(string calldata hint) external payable returns (string memory)'
    ];

    const contract = new Contract(swallowerContractAddress, abi, signer);
    console.log(await contract.swallow.staticCall('hello'));

    // call contract write method
    let tx = await contract.swallow('hello');
    let receipt = await tx.wait();
    console.log('receipt: ', receipt);

//     call contract write method with value
    tx = await contract.swallow('hello', {value: ethers.parseEther('0.001')});
    receipt = await tx.wait();
    console.log('receipt: ', receipt);
}


(async function () {
    await readContract();
    await writeContract();
})();