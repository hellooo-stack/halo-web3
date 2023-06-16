const {RpcProvider, ec, Account, Contract, uint256} = require('starknet');

(async () => {
    // const provider = new RpcProvider({ nodeUrl: "http://127.0.0.1:5050/rpc"  } );
    const provider = new RpcProvider({ nodeUrl: "https://starknet-goerli.infura.io/v3/8879adc5ace644639944a6b9505248c8"  } );

    // const testAddress = "0x038548d8cbba61b943d1e7982aef9593eaf0a6483fd3a96b8fc69d00a0ce9361";
    const testAddress = "0x06f437b6624d8bb9455eedfb26fa99b8267846a05ed2d7f6a03710106f94fcac";
    const { abi: testAbi } = await provider.getClassAt(testAddress);
    if (testAbi === undefined) { throw new Error("no abi.") };
    for (const testAbiElement of testAbi) {
        if (testAbiElement.name === 'burn') {
            console.log('yes');
        }
    }


    const myTestContract = new Contract(testAbi, testAddress, provider);
    //
    // const totalSupplyRes = await myTestContract['totalSupply']();
    // const totalSupply = uint256.uint256ToBN(totalSupplyRes.totalSupply).toString();
    // console.log('totalSupply: ', totalSupply);
    //
    // const balanceRes = await myTestContract.balanceOf('0x0468b7AdAE55BE128D1e10D13075A0FFF7e1941014F1C0aC780a35D51658965E');
    // const balance = uint256.uint256ToBN(balanceRes.balance).toString();
    // console.log('balance: ', balance);




    const privateKey = "";
    const starkKeyPair = ec.getKeyPair(privateKey);
    const accountAddress = "0x0468b7AdAE55BE128D1e10D13075A0FFF7e1941014F1C0aC780a35D51658965E";

    const account = new Account(provider, accountAddress, starkKeyPair);
    myTestContract.connect(account);

    const invokeResult = await myTestContract.invoke('mint', ['0x0468b7AdAE55BE128D1e10D13075A0FFF7e1941014F1C0aC780a35D51658965E', uint256.bnToUint256(123)])
    console.log(invokeResult);

})();


