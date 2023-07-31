// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "./ContractB.sol";

contract ContractA {
    address public contractB;

    function createContractB() external {
        ContractB cb = new ContractB();
        contractB = address(cb);

        emit CreatedAddress(contractB);
    }

    function setContractBName(string calldata name) external  {
        ContractB(contractB).setName(name);
    }

    function getContractBName() external view returns (string memory)  {
        return ContractB(contractB).getName();
    }

    event CreatedAddress(address cba);
}
