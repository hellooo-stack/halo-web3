const {Account, ec, Provider, CallData, RpcProvider} = require('starknet');

(async () => {
    const rpcProvider = new RpcProvider({
        nodeUrl: 'https://starknet-mainnet.infura.io/v3/8879adc5ace644639944a6b9505248c8',
        chainId: 1
    });
    const provider = new Provider(rpcProvider);
    const result = await provider.callContract({
        contractAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
        entrypoint: 'balanceOf',
        calldata: CallData.compile({
            user: '0x0468b7AdAE55BE128D1e10D13075A0FFF7e1941014F1C0aC780a35D51658965E'
        })
    });

    console.log(result);
})();


//
//
// // initialize provider
// const provider = new Provider({ sequencer: { baseUrl:"https://starknet-goerli.g.alchemy.com/v2/tPfDDlBy_Pp08dIWlqL4hPZomgavAni1"  } });
// provider.callContract({
//     contractAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
//     entrypoint: 'balanceOf',
//     calldata: CallData.compile({
//         user: '0x0468b7AdAE55BE128D1e10D13075A0FFF7e1941014F1C0aC780a35D51658965E'
//     })
// });
// // initialize existing pre-deployed account 0 of Devnet
// const privateKey = "1860832747562545286859316312808326730124280014993488505422170394308648098185";
// const starkKeyPair = ec.getKeyPair(privateKey);
// const accountAddress = "0x0468b7AdAE55BE128D1e10D13075A0FFF7e1941014F1C0aC780a35D51658965E";
// const account = new Account(provider, accountAddress, starkKeyPair);
// console.log(account.address)
//
// account.execute({
//     contractAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
//     entrypoint: 'balanceOf',
//     calldata: starknet.start.compileCalldata({
//
//     })
// })


//
// // initialize provider
// const provider = new Provider({ sequencer: { baseUrl:"https://starknet-goerli.g.alchemy.com/v2/tPfDDlBy_Pp08dIWlqL4hPZomgavAni1"  } });
// // initialize existing pre-deployed account 0 of Devnet
// const privateKey = "1860832747562545286859316312808326730124280014993488505422170394308648098185";
// const starkKeyPair = ec.getKeyPair(privateKey);
// const accountAddress = "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a";
//
// const account = new Account(provider, accountAddress, starkKeyPair);
//
//
//
// const provider = new starknet.RpcProvider({
//     nodeUrl: 'URL_TO_STARKNET_RPC_NODE',
// })
//
// const executeHash = await account.execute(
//     {
//         contractAddress: myContractAddress,
//         entrypoint: 'transfer',
//         calldata: stark.compileCalldata({
//             recipient: receiverAddress,
//             amount: ['10']
//         })
//     }
// );
// await provider.waitForTransaction(executeHash.transaction_hash);