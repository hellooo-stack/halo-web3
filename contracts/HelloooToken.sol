// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HelloooToken is ERC20 {
    uint256 private totalAmount;

    constructor() ERC20("Hellooo Token", "Hellooo") {

    }

    function get() public view returns (uint256) {
        return totalAmount;
    }

    function set(uint256 newAmount) public {
        totalAmount = newAmount;
    }
}