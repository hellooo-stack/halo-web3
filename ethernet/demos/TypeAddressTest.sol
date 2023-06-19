// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract TypeAddressTest {

//    编译报错，必须是一个合法的地址
//    address.sol private constant OWNER = abc;
    address private constant OWNER = 0x8FeBa0F418561C038694f4e4Ba9168DE24E41B15;

    function getOWNER() public returns (address) {
        return OWNER;
    }
}
