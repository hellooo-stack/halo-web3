// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import "./ContractB.sol";

contract ContractA {
    function callContractB(address contractB) external returns(bool) {
        return msg.sender == ContractB(contractB).printMsgSender();
    }
}
