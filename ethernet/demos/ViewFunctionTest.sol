// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract ViewFunctionTest {

    uint private privateState;

    function viewFunction() public view returns (uint) {
//        view 类型函数不能修改状态
//        所以这里会报错
//        privateState += 1;
        return privateState + 1;
    }


}
