const { Web3 } = require('web3');

// Connect to the Ethereum network using the HTTP provider
const ganacheUrl = 'https://sepolia.infura.io/v3/8879adc5ace644639944a6b9505248c8';
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider);

async function main() {
    try {
        // Get the current block number from the network
        const currentBlockNumber = await web3.eth.getBlockNumber();
        console.log('Current block number:', currentBlockNumber);

        // Get the list of accounts in the connected node (e.g., Ganache)
        const accounts = await web3.eth.getAccounts();
        console.log('accounts: ', accounts);

        // Send a transaction to the network and wait for the transaction to be mined.
        // Note that sending a transaction with Ganache will cause it, in its default configuration, to min a new block.
        const transactionReceipt = await web3.eth.sendTransaction({
            from: accounts[0],
            to: accounts[1],
            value: web3.utils.toWei('0.001', 'ether'),
        });
        console.log('Transaction Receipt:', transactionReceipt);

        // Get the updated block number
        const updatedBlockNumber = await web3.eth.getBlockNumber();
        console.log('Updated block number:', updatedBlockNumber);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();