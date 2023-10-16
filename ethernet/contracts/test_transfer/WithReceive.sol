// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// 0x4735a41c1514d62eff90d765d1dfb1bec8daeb47c4f30472176fee850c00d599
// 对这个合约转账能成功收到钱
contract WithReceive {
    receive() external payable {
        emit Receive(msg.value);
    }

    event Receive(uint256 value);
}
