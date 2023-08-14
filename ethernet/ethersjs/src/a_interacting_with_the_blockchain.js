const config = require('./config.js');
const ethers = require('ethers');

async function connectBlockchain(url) {
    return new ethers.JsonRpcProvider(url);
}

async function readBlockchain(provider) {
}

async function writeBlockchain(provider) {

}

async function listenEvent(provider) {

}

async function readBlockMetadata(provider) {

}



(async function () {
    // 1. connect to network
    const url = config.getNetWorkUrl();
    const provider = await connectBlockchain(url);

    // // 2. read blockchain
    // await readBlockchain(provider);
    //
    // // 3. write blockchain
    // const balance = await provider.getBalance(config.getAccount1().address);
    // console.log('balance: ', balance);
    // //
    // const  transactionResponse = await provider.getTransaction("0xd0806b6e02dc62789eebc905f972130461e274a9e96fa2cb6e02d646b0a83a6c");
    // console.log(transactionResponse);
    //
    // const block = await provider.getBlock('0x19d10962fb50acca2110fcec4f517609559cf527841b8c294cb039012caaec2d');
    // console.log('block: ', block);
    //
    // const latestBlockNumber = await provider.getBlockNumber();
    // console.log('latestBlockNumber: ', latestBlockNumber);



   // const accounts = await provider.listAccounts();
   //  console.log('accounts: ', accounts);
   //
   //  const network = await provider.getNetwork();
   //  console.log(network)
   //
   //  const transactionCount = await provider.getTransactionCount(config.getAccount1().address);
   //  console.log('transactionCount: ', transactionCount);
   //
   //  const code = await provider.getCode('0x1798215Ef1462B6a903CFaEfCDA70fD3Ee116cB2');
   //  console.log('code: ', code);

    // const stateTrieStorage = await provider.getStorage(config.getAccount1().address);
    // console.log('stateTrieStorage: ', stateTrieStorage);


    // const txr = await provider.getTransactionReceipt('0xbae575999d3ab438c8f665f2b58339a17860e625c74bce44a6b716850c1a3680');
    // console.log('txr: ', txr);
    //
    // const txrt = await provider.getTransactionResult('0xbae575999d3ab438c8f665f2b58339a17860e625c74bce44a6b716850c1a3680');
    // console.log('txrt: ', txrt);

    // const name = await provider.resolveName('nopro.eth');
    // console.log('name: ', name);
    //
    // const lookupa = await provider.lookupAddress('0x843aa999827ae6d187F8a5b6ab4afB1B1597551D');
    // console.log('lookupa: ', lookupa);

    // const balance = await provider.getBalance(config.getAccount1);
    // console.log('balance: ', balance);


    // let blockNumber = await provider.getBlockNumber();
    // let balance = await provider.getBalance('0xd529DeF12F16C1D9b22c095983C2972ee9427085');
    // console.log('blockNumber: ', blockNumber);
    // console.log('balance: ', balance);
})();