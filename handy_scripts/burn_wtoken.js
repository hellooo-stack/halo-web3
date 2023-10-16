const ethers = require('ethers');
const {Contract} = require("ethers");

async function connectBlockchain() {
    const url = 'todo';
    return new ethers.JsonRpcProvider(url);
}

const wtokenContractAddress = '0xbe8868d6D8bF0021Af801F931BCf9105add6FBed';
async function readContract() {
    const provider = await connectBlockchain();

    const abi = [
        'function name() view returns (string)'
    ];

    const contract = new Contract(wtokenContractAddress, abi, provider);
    const name = await contract.name();
    console.log('name: ', name);
}

async function writeContract() {
    const provider = await connectBlockchain();

    const privateKey = 'todo';
    const signer = new ethers.Wallet(privateKey, provider);

    console.log('address: ', signer.address);

    const abi = [
        'function grantRole(bytes32 role, address account)',
        'function burn(address account, uint256 amount)'
    ];

    const contract = new Contract(wtokenContractAddress, abi, signer);
    // let tx = await contracts.grantRole('todo', 'todo');
    // let receipt = await tx.wait();
    // console.log('receipt: ', receipt);

    let tx = await contract.burn('todo', 'todo');
    let receipt = await tx.wait();
    console.log('receipt: ', receipt);
}


(async function () {
    // await readContract();
    await writeContract();
})();