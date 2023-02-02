// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

//    状态变量可见性:
//      - public:
//      - internal:
//      - private:
//    函数可见性: 必须有如下几种修饰符的一种，否则报错，不像状态变量，可省略修饰符
//      - external:
//      - public:
//      - internal:
//      - private:

contract StateTestParent {
    uint public publicState;
    uint private privateState;
    uint internal internalState;
    uint nonDecoratedState;
}
contract StateTestSub is StateTestParent {
//    下面两个函数会报错，因为状态是private的
//    function setPrivateState(uint newPrivateState) public {
//        privateState = newPrivateState;
//    }
//
//    function getPrivateState() public returns (uint) {
//        return privateState;
//    }

    function setInternalState(uint newInternalState) public {
        internalState = newInternalState;
    }

    function getInternalState() public returns (uint) {
        return internalState;
    }

    function setNonDecoratedState(uint newNonDecoratedState) public {
        nonDecoratedState = newNonDecoratedState;
    }

    function getNonDecoratedState() public returns (uint) {
        return nonDecoratedState;
    }
}
contract StateTestCaller {
    function call() public {
        StateTestParent stateTestParent = new StateTestParent();
        stateTestParent.publicState();

        StateTestSub stateTestSub = new StateTestSub();
        stateTestSub.setInternalState(1);
//        stateTestSub.setPrivateState(2);
        stateTestSub.setNonDecoratedState(3);

        stateTestSub.getInternalState();
//        stateTestSub.getPrivateState();
        stateTestSub.getNonDecoratedState();
    }
}

contract FunctionTestParent {
    function privateFunc() private returns (uint) {
        return 0;
    }

    function publicFunc() public returns (uint) {
        return 1;
    }

    function internalFunc() internal returns (uint) {
        return 2;
    }

    function externalFunc() external returns (uint) {
        return 3;
    }

//    这样会报错，不像state变量，可以没有修饰符，需要改成function normalFunc() public returns (int) {}
//    function normalFunc() returns (int) {
//        return 4;
//    }
}
contract FunctionTestSub is FunctionTestParent {
    function callSuper() public {
//        不可见，编译报错
//        privateFunc();
//
//        internalFunc();
//
//        externalFunc();

//        normalFunc();

        publicFunc();
    }
}


