// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ContractB {
    string public name;

    function setName(string calldata newName) external {
        name = newName;
    }

    function getName() external view returns (string memory) {
        return name;
    }
}