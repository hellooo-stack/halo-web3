// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// deployed to sepolia: 0x744Dd50eCC8D8440616068609909736Fd2B7a10a
contract eventmaker {

    function transfer(address payable to) payable external  {
        if (msg.value <= 0) {
            emit Failed(msg.sender, to);
        } else {
            to.transfer(msg.value);
            emit Transfer(msg.sender, to, msg.value);
        }
    }

    event Transfer(address indexed from, address indexed to, uint256 amount);

    event Failed(address indexed from, address to);
}