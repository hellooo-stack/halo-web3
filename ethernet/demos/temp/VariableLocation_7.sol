// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// 变量的数据位置
// 1. 状态变量存储与Storage
// 2. 函数参数及返回参数存储与内存
// 3. 局部变量存储与内存
//    - 对于引用类型，需要显示指定数据位置
contract VariableLocation_7 {
    constructor(){

    }

    function testLocalMemory() public returns (uint) {
//        局部变量都存储于内存

//        非引用类型默认存储于内存
        bool flag1;

//        不可显示指定非引用类型的数据位置，此处编译不通过
//        uint memory flag2;

//        引用类型需要显示指定数据位置，此处指定为内存
        uint[] memory localArray;

//        这行因为没有指定数据位置，此处编译不通过
//        uint[] localArray1;
    }
}
