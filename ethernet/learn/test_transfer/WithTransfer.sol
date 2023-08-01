// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// 不用gas的吗，还是说gas是由msg.sender出的？账户余额有0.5，转了两次，一次0.1，一次0.4
// 0x7AE65D95b0F8Dc54935a699279cFc89eA1DC7f60
contract WithTransfer {

    function transferTo(address payable account, uint256 amount) external {
        require(address(this).balance >= amount, "balance not enough");
        account.transfer(amount);

        emit Transfer(account, amount);
    }

    function transferToCaller(uint256 amount) external {
        require(address(this).balance >= amount, "balance not enough");
        payable(msg.sender).transfer(amount);

        emit Transfer(msg.sender, amount);
    }

    receive() external payable {
        emit Receive(msg.value);
    }

    event Receive(uint256 value);

    event Transfer(address account, uint256 amount);
}
