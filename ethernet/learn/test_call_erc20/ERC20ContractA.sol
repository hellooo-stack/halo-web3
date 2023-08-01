// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// 0xC2857C1a35C5eeFa6736f646CE12444e430507c0
contract ERC20ContractA is ERC20 {

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public {
        _burn(account, amount);
    }

    receive() external payable {
        emit Receive(msg.value);
    }

    event Receive(uint256 value);
}
