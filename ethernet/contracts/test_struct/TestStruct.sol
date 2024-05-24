// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract TestStruct {
    struct Struct1 {
        string name;
        uint256 amount;
    }

    mapping(address => Struct1[]) userStruct1sMapping;

    function addStruct(Struct1 memory struct1) external {
        address user = msg.sender;
        Struct1[] storage struct1s = userStruct1sMapping[user];
        if (struct1s.length == 0) {
            struct1s.push(struct1);
            return;
        }

        for (uint8 i = 0; i < struct1s.length; i++) {
            if (keccak256(abi.encodePacked(struct1s[i].name)) == keccak256(abi.encodePacked(struct1.name))) {
                struct1s[i].amount += struct1.amount;
                return;
            }
        }

        struct1s.push(struct1);
    }

    function getStructsLength() external view returns(uint256) {
        return userStruct1sMapping[msg.sender].length;
    }


}