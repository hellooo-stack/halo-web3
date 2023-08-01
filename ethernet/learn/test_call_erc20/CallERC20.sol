// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CallERC20 {
    function getBalance(address token) external view returns (uint256)  {
        return token.balance;
    }

    function callBalanceOf(address token, address account) external view returns (uint256) {
        return IERC20(token).balanceOf(account);
    }

     function callTransfer(address payable account, uint256 amount, address token) external {
         IERC20(token).transfer(account, amount);
     }
}
