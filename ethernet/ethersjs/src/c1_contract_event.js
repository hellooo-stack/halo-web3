const {Contract} = require("ethers");
const ethers = require("ethers");
const config = require("./config");

async function connectBlockchain() {
    const url = config.getNetWorkUrl();
    return new ethers.JsonRpcProvider(url);
}

const eventmakerContractAddress = '0x744Dd50eCC8D8440616068609909736Fd2B7a10a';

async function queryHistoricEvents() {
    const provider = await connectBlockchain();

    const abi = [
        'event Transfer(address indexed from, address indexed to, uint256 amount)',
        'event Failed(address indexed from, address to)'
    ];

    const contract = new Contract(eventmakerContractAddress, abi, provider);
    const filter = contract.filters.Transfer;
    // -1000 表示从当前最新区块开始，往前查1000个区块
    const events = await contract.queryFilter(filter, -1000);
    console.log('events.length: ', events.length);
    console.log('events[0]: , ', events[0]);

    // 因为amount参数是没有indexed的，所以这里无法查
    // const filter1 = contract.filters.Transfer(null, null, 1000000000000000n);
    // 根据from参数过滤日志
    const filter1 = contract.filters.Transfer('0xca3875f76feee8ddf0908c11b621e89dfac850ae');
    const events1 = await contract.queryFilter(filter1, -1000);
    console.log('events1.length: ', events1.length);
    console.log('events1[0]: , ', events1[0]);

    // 根据to参数过滤日志
    const filter2 = contract.filters.Transfer(null, '0xfcd7559128e2457eb0d39f91041c75629244cc79');
    const events2 = await contract.queryFilter(filter2, -1000);
    console.log('events2.length: ', events2.length);
    console.log('events2[0]: , ', events2[0]);

    // 根据from和to两个参数过滤，同时满足才能过滤出来
    const filter3 = contract.filters.Transfer('0xca3875f76feee8ddf0908c11b621e89dfac850ae', '0x4a81f462ee65db926b6ce835bfbcbb2315f0bc91');
    const events3 = await contract.queryFilter(filter3, -1000);
    console.log('events3.length: ', events3.length);
    console.log('events3[0]: , ', events3[0]);
}

async function listenEvents() {
    const provider = await connectBlockchain();

    const abi = [
        'event Transfer(address indexed from, address indexed to, uint256 amount)',
        'event Failed(address indexed from, address to)'
    ];

    const contract = new Contract(eventmakerContractAddress, abi, provider);
    await contract.on('Transfer', (from, to, _amount, event) => {

        const amount = ethers.formatEther(_amount, 18);
        console.log(`${from} => ${to}: ${amount}`);

        // The `event.log` has the entire EventLog
        // console.log('event: ', event);

        // Optionally, stop listening
        event.removeListener();
    });

    const filter = contract.filters.Transfer('0xCA3875f76FeeE8dDF0908c11b621e89dfaC850AE', null, null);
    await contract.on(filter, (from, to, _amount, event) => {

        const amount = ethers.formatEther(_amount, 18);
        console.log(`from 0xCA3875f76FeeE8dDF0908c11b621e89dfaC850AE to ${to}: ${amount}`);

        event.removeListener();
    });


    await contract.on('Failed', (from, to, event) => {

        console.log(`${from} => ${to} failed`);

        // The `event.log` has the entire EventLog
        // console.log('event: ', event);

        // 所有监听器都移除之后，程序退出执行。
        event.removeListener();
    });
}

(async function () {
    await queryHistoricEvents();
    // await listenEvents();
})();
