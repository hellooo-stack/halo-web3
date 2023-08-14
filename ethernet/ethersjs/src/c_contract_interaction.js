const ethers = require('ethers');

let bnbtest = 'https://data-seed-pre-0-s1.bnbchain.org:443';
(async function () {
    const abi = ['function getClaimTokenAmounts(uint256 vaultId) view external returns (uint256[] memory)'];
    const provider = new ethers.JsonRpcProvider(bnbtest);

    const signer = new ethers.Wallet('08d73e9344517d9d3d179bb516f222b6ec84e2ecd9f4e63c3375545381973be0', provider);
    console.log(await signer.getAddress());

    let contract = new ethers.Contract('0x170819467FbFC4a8DcBc3F8446B5EdC973Fc652f', abi, provider);
    let result = await contract.getClaimTokenAmounts(35);
    console.log('result: ', result);
})();