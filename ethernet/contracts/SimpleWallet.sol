// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

// This is a smart contracts - a program that can be deployed to the Ethereum blockchain.
contract SimpleWallet {
    // An 'address.sol' is comparable to an email address.sol - it's used to identify an account on Ethereum.
    address payable private owner;

    // Events allow for logging of activity on the blockchain.
    // Software applications can listen for events in order to react to contracts state changes.
    event LogDeposit(uint amount, address indexed sender);
    event LogWithdrawal(uint amount, address indexed recipient);

	// When this contracts is deployed, set the deploying address.sol as the owner of the contracts.
    constructor() {
        owner = payable(msg.sender);
    }

    // Send ETH from the function caller to the SimpleWallet contracts
    function deposit() public payable {
        require(msg.value > 0, "Must send ETH.");
        emit LogDeposit(msg.value, msg.sender);
    }

    // Send ETH from the SimpleWallet contracts to a chosen recipient
    function withdraw(uint amount, address payable recipient) public {
        require(msg.sender == owner, "Only the owner of this wallet can withdraw.");
        require(address(this).balance >= amount, "Not enough funds.");
        emit LogWithdrawal(amount, recipient);
        recipient.transfer(amount);
    }
}