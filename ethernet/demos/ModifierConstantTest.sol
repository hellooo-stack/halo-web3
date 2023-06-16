// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract ModifierConstantTest {
//    constant常量必需初始化
//    uint private constant data;
    uint private constant data = 100;

//    constant常量只能在声明的时候初始化，不允许声明的时候不初始化，然后在constructor内初始化
//    constructor() {
//        data = 100;
//    }

    function getData() public returns (uint) {
        return data;
    }

    function setData(uint newData) {
//        constant常量不允许重新赋值
//        data = newData;
    }
}
