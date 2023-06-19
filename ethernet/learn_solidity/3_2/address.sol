// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// 写一个水龙头，如果地址的余额小于0.000001, 则给这个地址发送0.000001个以太币
contract AddressPayable {

  function sendEther(address payable recipient, uint256 amount, uint256 threshold) public {
    uint256 currentBalance = recipient.balance;

    bool hasTransfered = false;
    if (currentBalance < threshold) {
      recipient.transfer(amount);
      hasTransfered = true;
    }

    address(this).balance;
    emit logAddressBalance(recipient, amount, hasTransfered);
  }

  event logAddressBalance(address target, uint256 balance, bool hasTransfered);
}

contract SendEther {
  function sendEther(address payable recipient, uint256 amount) public {
    recipient.transfer(amount);
    emit logSend(recipient, amount);
  }

  event logSend(address recipient, uint256 amount);
}
