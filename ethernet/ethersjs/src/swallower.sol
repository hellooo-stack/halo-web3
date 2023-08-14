// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// deployed to sepolia: 0x7B105Fd734602C24B1fef4fc9Af16Ad44e6B963A
contract swallower {
    address payable constant public spitTo = payable(0xd529DeF12F16C1D9b22c095983C2972ee9427085);

    function swallow() external payable returns (string memory) {

        if (msg.value > 0) {
            spitTo.transfer(msg.value);
            return "value received";
        }

        return "no value received";
    }
}

