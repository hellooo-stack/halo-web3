// BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
// ...
// def encode_base58(s):
// count = 0
// for c in s:  ①
//         if c == 0:
// count += 1
// else:
// break
// num = int.from_bytes(s, 'big')
// prefix = '1' * count
// result = ''
// while num > 0:  ②
//         num, mod = divmod(num, 58)
// result = BASE58_ALPHABET[mod] + result
// return prefix + result  ③



var bs58check = require('bs58check')

var decoded = bs58check.decode('5Kd3NBUAdUnhyzenEwVLy9pBKxSwXvE9FMPyR4UKZvpe6E3AgLr')

console.log(decoded)
// => <Buffer 80 ed db dc 11 68 f1 da ea db d3 e4 4c 1e 3f 8f 5a 28 4c 20 29 f7 8a d2 6a f9 85 83 a4 99 de 5b 19>


console.log(bs58check.encode(decoded))

console.log(bs58check.encode(Buffer.from('5Kd3NBUAdUnhyzenEwVLy9pBKxSwXvE9FMPyR4UKZvpe6E3AgLr', 'utf-8')))
Base58.encode('5Kd3NBUAdUnhyzenEwVLy9pBKxSwXvE9FMPyR4UKZvpe6E3AgLr');

