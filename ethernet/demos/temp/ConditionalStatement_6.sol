// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// solidity的条件语句:
contract ConditionalStatement_6 {
    constructor(){

    }

    function testIf_Else() public returns (uint) {
        uint v = 1;
        if (v > 10) {
            return 1;
        } else {
            return 10;
        }
    }

    function testIf_ElseIf_Else() public returns (uint) {
        uint v = 1;
        if (v > 10) {
            return 1;
        } else if (v > 1 && v < 5) {
            return 10;
        } else {
            return 100;
        }
    }
}
