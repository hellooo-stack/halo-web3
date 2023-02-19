// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// 循环语句：for循环、while循环、do...while循环
contract LoopStatement {
    constructor(){

    }

    function testFor() public returns (uint){
        uint con = 0;
        for (uint i = 0; i < 10; i++) {
            con += i;
            if (i > 5) {
                break;
            }
        }

        return con;
    }

    function testWhile() public returns (uint) {
        uint con = 0;
        while (con < 10) {
            con++;
        }
        return con;
    }

    function testDoWhile() public returns (uint)  {
        uint con = 0;
        do {
            con++;
        }
        while (con < 10);

        return con;
    }
}
