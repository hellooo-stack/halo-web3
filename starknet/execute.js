const { transaction_hash: mintTxHash } = await erc20.mint(
    account.address,
    amountToMint,
    { maxFee: 900_000_000_000_000 }
);


// 1. 将地址转为felt：0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a
//export function toFelt(num: BigNumberish): string {
//   if (BN.isBN(num)) {
//     return num.toString();
//   }
//   return toBN(num).toString();
// }

max_fee=900000000000000
nonce=133

