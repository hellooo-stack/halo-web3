contract Wallet {
    function validateOp(UserOperation op) {

    }
    function executeOp(UserOperation op)  {

    }
}

contract EntryPoint {
    function handleOp(UserOperation op)  {

    }

    function deposit(address wallet) payable {

    }

    function withdrawTo(address payable destination)  {

    }
}

struct UserOperation {
    address to;
    bytes data;
    uint256 value;
    uint256 gas;
    bytes signature;
    uint256 nonce;
}