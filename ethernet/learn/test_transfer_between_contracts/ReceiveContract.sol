// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// 0xDDa4fA07919b98a48C41c0fa00a4318E6Bb61d82
contract ReceiveContract {

    function accept() external payable {
        emit Accept(msg.value);
    }

    receive() external payable {
        emit Receive(msg.value);
    }

    event Receive(uint256 value);

    event Accept(uint256 value);
}
