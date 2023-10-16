// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract TestBlockTimestamp {
    function getTimestamp() external {
        emit LogTimestamp(block.timestamp);
    }

    event LogTimestamp(uint256 timestamp);
}
