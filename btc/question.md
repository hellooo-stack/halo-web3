1. 公钥和私钥的关系
2. 私钥的表示形式有哪些wif？base58？
3. 公钥的表示形式有哪些？
4. 如何通过私钥得到公钥，如何通过公钥得到地址，反过来呢？
5. 公钥的格式有多少种，压缩，非压缩？
6. 签名的格式是什么样子的，如何计算签名？
7. 我有一个私钥，我要怎么根据这个私钥算出地址
8. 得到签名的DER之后，如何转为base64，直接转？
9. 非对称加密中，签名的recoveryId是什么：EcKey.java -> signMessage(...) -> findRecoveryId(...)





1. https://github.com/bitcoinjs/bitcoinjs-lib/issues/1203
L and K are compressed keys.

5 is uncompressed, meaning higher fees.

you can also get lower fees by using segwit.