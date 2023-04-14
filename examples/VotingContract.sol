// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// 需求：一个简单的投票合约
//  - 合约创建者可以发布投票主题，设定投票选项，设定投票截止时间
//  - 用户可以投票，并且不能重复投票
//  - 投票截止时间过后，合约会计算每个选项的得票数，并且返回获胜选项
contract VotingContract {

    address public creator;
    string public topic;
    string[] public options;
    uint public deadline;

    mapping(address => bool) public hasVoted;
    mapping(string => uint) public votes;

    constructor(string _topic, string[] _options, uint _deadline) {
        creator = msg.sender;
        topic = _topic;
        options = _options;

//        todo deadline should be after the current time
        deadline = _deadline;
    }

    function vote(string option) public {
        require(block.timestamp < deadline, "Voting has ended");
        require(!hasVoted[msg.sender], "You have already vote!");

        bool exists = false;
        for (uint i = 0; i < options.length; i++) {
            if (keccak256(bytes(options[i])) == keccak256(bytes(option))) {
                exists = true;
                break;
            }
        }

        require(exists == true, "Option does not exist");
        votes[option]++;
        hasVoted[msg.sender] = true;
    }

    function getWinner(string memory topic) public view returns (string memory winner) {
        require(block.timestamp >= deadline, "Voting has not ended yet");

        uint highestVoteCount = 0;
        for (uint i = 0; i < options.length; i++) {
            if (votes[options[i]] > highestVoteCount) {
                highestVoteCount = votes[options[i]];
                winner = options[i];
            }
        }
    }
}