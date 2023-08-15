// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// deployed to sepolia: 0x6D6b7c4Be159EC5A62D3308EcF2bEeC8Ff87840A
contract swallower {
    address payable constant public spitTo = payable(0xd529DeF12F16C1D9b22c095983C2972ee9427085);

    uint256 public spitedValue;

    function swallow(string calldata hint) external payable returns (string memory) {

        if (msg.value > 0) {
            spitedValue += msg.value;

            spitTo.transfer(msg.value);
            return string.concat("value received, hint: ", hint);
        }

        return string.concat("no value received, hint: ", hint);
    }
}
