const config = require('./config.js');
const ethers = require('ethers');

async function connectBlockchain() {
    const url = config.getNetWorkUrl();
    return new ethers.JsonRpcProvider(url);
}

async function readBlockchain(provider) {
//     1. 区块信息
//     当前最新区块的编号
    const latestBlockNumber = await provider.getBlockNumber();
//     指定区块的信息
    const block = await provider.getBlock(latestBlockNumber);
//     获取区块内产生的所有log
    const logs = await provider.getLogs({fromBlock: 4086956});

//     2. 交易信息
    const txHash = '0xd0806b6e02dc62789eebc905f972130461e274a9e96fa2cb6e02d646b0a83a6c';
    const transactionResponse = await provider.getTransaction(txHash);
    // 获取交易的回执
    const transactionReceipt = await provider.getTransactionReceipt(txHash);

//     3. 账号信息
    const account = config.getAccount2().address;
//     读取已发起的交易个数，该数值被用来作为交易的nonce
    const transactionCount = await provider.getTransactionCount(account);

//     读取账号余额
    const balance = await provider.getBalance(account);

//     用ens域名查找地址，需要网络支持，比如主网
//     const ensAddr = await provider.resolveName('198989.eth');
//     const ensAddr1 = await provider.resolveName('nopro.eth');

//     查找地址关联的ens域名
//     const ensName = await provider.lookupAddress('0x843aa999827ae6d187F8a5b6ab4afB1B1597551D');

//     读取合约字节码，如果地址对应合约不存在，或者不为合约，则返回'0x'
    const contract = config.getContract().usdt;
    const code = await provider.getCode(contract);
}

async function writeBlockchain(provider) {
    const privateKey = config.getAccount2().privateKey;
    const signer = new ethers.Wallet(privateKey, provider);
    // or
    // let signer = new ethers.Wallet(privateKey);
    // signer = signer.connect(provider);

//     1. 获取账号对应的地址
    const address = await signer.getAddress();
    console.log('address: ', address);
//     2. 签名消息
    const signature = await signer.signMessage('hello world');
    console.log('signature: ', signature);
//     3. 签名交易
//     4. 估算gas
//     const estimateGas = await signer.estimateGas()
//     5. 发送交易
}

async function listenEvent(provider) {

}


(async function () {
    const provider = await connectBlockchain();

    // await readBlockchain(provider);
    await writeBlockchain(provider);
    // await listenEvent(provider);
})();