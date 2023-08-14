// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// deployed to sepolia: 0xf7c728Cc6d146D38e71A4fCf5b0742dAE0803aAB
contract swallower {
    address payable constant public spitTo = payable(0xd529DeF12F16C1D9b22c095983C2972ee9427085);

    function swallow(string calldata hint) external payable returns (string memory) {

        if (msg.value > 0) {
            spitTo.transfer(msg.value);
            return string.concat("value received, hint: ", hint);
        }

        return string.concat("no value received, hint: ", hint);
    }
}
