// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// deployed to sepolia: 0x0e74D2E00A912758a5597Ec5Dc7150A708BB4d90
contract swallower {
    address payable constant public spitTo = payable(0xd529DeF12F16C1D9b22c095983C2972ee9427085);

    uint256 public spitedValue;

    function swallow(string calldata hint) external payable returns (string memory) {

        if (msg.value > 0) {
            spitedValue += msg.value;

            spitTo.transfer(msg.value);

            emit Swallow(msg.sender, msg.value);
            emit Spit(spitTo, msg.value);

            return string.concat("value received, hint: ", hint);
        }

        return string.concat("no value received, hint: ", hint);
    }

    event Swallow(address indexed from, uint256 amount);

    event Spit(address to, uint256 amount);
}