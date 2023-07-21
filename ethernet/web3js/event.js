// 1. set provider
const {Web3} = require('web3');

// const web3 = new Web3('');
const web3 = new Web3(new Web3.providers.HttpProvider('https://eth-sepolia.g.alchemy.com/v2/vuXxCNvKzCMeT7GSHKmHf2eQC06x5g9K'));
web3.provider.on('message', () => {

});

web3.provider.on('connect', () => {
    // ...
});

web3.provider.on('disconnect', () => {
    // ...
});

web3.provider.on('accountsChanged', () => {
    // ...
});

web3.provider.on('chainChanged', () => {
    // ...
});

// it is possible to catch errors that could happen in the underlying connection Socket with the `error` event
// and it is also used to catch the error when max reconnection attempts exceeded
//  as in section: /docs/guides/web3_providers_guide/#error-message
web3.provider.on('error', () => {
    // ...
});

// ...

// for every event above `once` could be used to register to the event only once
web3.provider.once('SUPPORTED_EVENT_NAME', () => {
    // ...
});

// And to unregister a listener `removeListener` could be called
web3.provider.removeListener('SUPPORTED_EVENT_NAME', () => {
    // ...
});
