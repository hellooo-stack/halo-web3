// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract PureFunctionTest {

    uint private privateState;

    function pureFunction() public pure returns (uint) {
//        pure 类型函数承诺不读取也不修改状态变量
//        所以这里会报错
//        privateState += 1;
//        return privateState + 1;
        return 1;
    }

}
