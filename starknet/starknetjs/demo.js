const {Provider, RpcProvider, ec, Account, Contract} = require('starknet');

(async () => {
    // initialize Provider
    const provider = new Provider({sequencer: {network: "goerli-alpha"}});
    // connect your account. To adapt to your own account :
    const privateKey0 = process.env.OZ_ACCOUNT_PRIVATE_KEY;
    const account0Address = "0x123....789";

    const starkKeyPair0 = ec.getKeyPair(privateKey0);
    const account0 = new Account(provider, account0Address, starkKeyPair0);

    // Connect the deployed Test contracts in Tesnet
    const testAddress = "0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd";

    // read abi of Test contracts
    const {abi: testAbi} = await provider.getClassAt(testAddress);
    if (testAbi === undefined) {
        throw new Error("no abi.")
    }

    const myTestContract = new Contract(testAbi, testAddress, provider);

    // Connect account with the contracts
    myTestContract.connect(account0);

    // Interactions with the contracts with call & invoke
    const bal1 = await myTestContract.get_balance();
    console.log("Initial balance =", bal1.res.toString());

    const resu = await myTestContract.increase_balance(10, 30);
    await provider.waitForTransaction(resu.transaction_hash);

    const bal2 = await myTestContract.get_balance();
    console.log("Initial balance =", bal2.res.toString());
})();
