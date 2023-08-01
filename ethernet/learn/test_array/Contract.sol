// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";


contract Contract {

    uint256[] ints;
    address[] addresses;

    function popInts() external {
        ints.pop();
    }

    function pushInts(uint256 i) external {
        ints.push(i);
    }

    function pushAddress(address addr) external {
        addresses.push(addr);
    }

    function readInts1() external view returns (uint256) {
        return ints[0];
    }

    function readIntsLength() external view returns (uint256) {
        return ints.length;
    }

    function readInts() external view returns (string memory m) {
        m = string.concat("int length: ", Strings.toString(ints.length), " position 0: ", Strings.toString(ints[0]), " position length - 1: ", Strings.toString(ints[ints.length - 1]));

        // emit Msg(m);

        return m;
    }

    function readAddresses() external view returns (string memory m) {
        m = string.concat("address length: ", Strings.toString(addresses.length), " position 0: ", Strings.toHexString(uint160(addresses[0]), 20), " position length - 1: ", Strings.toHexString(uint160(addresses[addresses.length - 1]), 20));

        // emit Msg(m);

        return m;
    }

    event Msg(string msg);
}
