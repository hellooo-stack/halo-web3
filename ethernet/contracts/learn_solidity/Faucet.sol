// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Faucet {
    function withdraw(uint amount) public  {
        require(amount < 100000000000000000);
        msg.sender.transfer(amount);
    }
}
