// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract ContractB {
    address caller;

    function printMsgSender() external returns (address) {
        caller = msg.sender;
        return caller;
    }
}
