// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./ReceiveContract.sol";

// 0x5FA55792B4E6976742B3236588deA8772A8eFb4b
contract SendContract {

    function send(address payable to) external payable {
        ReceiveContract(to).accept{value: (address(this).balance)}();
    }

    receive() external payable {
        emit Receive(msg.value);
    }

    event Receive(uint256 value);
}
