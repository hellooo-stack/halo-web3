const { validate, getAddressInfo } = require('bitcoin-address-validation');
// bc1p8y2vtya493kyuzpewgv0qt429t3z7y3gfcmc3eau0ymsh523zzzswz7vyg

console.log(validate('bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4'));
console.log(getAddressInfo('bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4'));

console.log(validate('bc1p8y2vtya493kyuzpewgv0qt429t3z7y3gfcmc3eau0ymsh523zzzswz7vyg'));
console.log(getAddressInfo('bc1p8y2vtya493kyuzpewgv0qt429t3z7y3gfcmc3eau0ymsh523zzzswz7vyg'));

