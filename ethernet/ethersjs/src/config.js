const config = require('./config.json');

function getNetwork() {
    const network = config.network;
    return config[network];
}
function getNetWorkUrl() {
    const network = getNetwork();
    const env = network.env;
    return network[env];
}
function getAccount1() {
    return config.accounts.ac1;
}

module.exports = {
    getNetwork,
    getNetWorkUrl,
    getAccount1
}
