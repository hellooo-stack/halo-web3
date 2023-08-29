const {TxFetcher} = require('./tx');

describe('TxFetcherTest', () => {

    test('test_bytes', () => {
    });

    test('fetch', async () => {
        const result = await TxFetcher.fetch('17782270d1bfdcf3956efbfa49e90b74a2797819b09abd0460cffc69557f219c', true);
        console.log(result);
    });
});