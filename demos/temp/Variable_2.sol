// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// solidity的变量:
// 有三种：状态变量、局部变量、全局变量
contract Variable {
//    状态变量
    uint var1;

    constructor(){

    }

    function plusRandom(uint num) public returns(uint) {
//        局部变量
        uint random = 2;
        return num + random;
    }

//    全局变量：有一些特殊的全局变量可以在合约中被直接访问
//      - msg：一个包含了当前交易相关信息的全局变量，包括发送者地址、发送的以太币数量等等。
//      - block：一个包含了当前区块相关信息的全局变量，包括区块哈希值、区块难度、时间戳等等。
//      - tx：一个包含了当前交易相关信息的全局变量，包括交易哈希值、交易发起人地址等等。
//      - now：一个代表当前区块时间戳的全局变量。
}
