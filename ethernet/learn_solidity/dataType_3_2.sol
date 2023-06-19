// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// solidity的数据类型:
// 有三种：值类型、地址类型、引用类型

// 问题：
// 1. 有符号整型和无符号整型的区别是什么：前者能表示负数，而后者不能
// 2. 整数类型，后面跟位数和不跟的区别是什么：
//    - 跟位数，表示这个整数类型的占用的存储空间大小是确定的
//    - 不跟位数，会由编译器决定，根据上下文来确定
// 3. 整数类型，什么时机下应该在后面跟位数，什么时候不跟：
//    - 使用不跟位数的整数类型可能会导致代码在不同编译器或不同版本的 Solidity 中行为不同，
//      因此建议在定义整数类型时始终指定位数
contract DataType {
//    1. 值类型：
    bool boolType = false;
//    整型：支持有符号和无符号整数类型，它们的命名方式为 int 和 uint，后面跟着位数，如 int8、uint16 等。
//    其中，位数可以是 8、16、32、64、128 或 256 中的任意一个
//    有符号整型：最高位表示符号位。例如：int8 的取值范围为 -128 到 127，int256 的取值范围为 -2^255 到 2^255-1
    int intType = 1;
//    8表示用8个位来存储，即一个字节
    int8 int8Type = 2;
//    同理，16表示用16个位来存储，即二个字节
    int16 int16Type = 3;
    int32 int32Type = 4;
    int64 int64Type = 5;
    int128 int128Type = 6;
    int256 int256Type = 7;


//    无符号整型：整数类型的所有位都用于表示数值，因此其取值范围为 0 到 (2^n)-1，其中 n 表示位数。
//    例如，uint8 的取值范围为 0 到 255，uint256 的取值范围为 0 到 (2^256)-1。
    uint uintType = 10;
    uint8 int8Type = 2;
    uint16 uint16Type = 3;
    uint32 uint32Type = 4;
    uint64 uint64Type = 5;
    uint128 uint128Type = 6;
    uint256 uint256Type = 7;

//    浮点类型：表示带有小数部分的数值。Solidity 支持两种浮点类型：fixed-point 类型和浮点数类型。
//    fixed-point: 用于表示固定小数位数的数值
//    todo




//    2. 地址类型：
//      - 用于表示以太坊网络中的地址。地址类型是一个 20 字节（160 位）的值，可以用来标识以太坊网络中的账户地址或者智能合约地址。
//    todo
    address public myAddress = 0x1234567890123456789012345678901234567890;
    address payable public myAddress1 = 0x1234567890123456789012345678901234567890;

//    3. 引用类型：由值类型组合而成，包括
//      - 数组（字符串和bytes是特殊的数组，所以也是引用类型）
//      - struct
//      - map
//    todo

    constructor(){

    }
}
