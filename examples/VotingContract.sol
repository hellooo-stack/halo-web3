// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// 需求：一个简单的投票合约
//  - 合约创建者可以发布投票主题，设定投票选项，设定投票截止时间
//  - 用户可以投票，并且不能重复投票
//  - 投票截止时间过后，合约会计算每个选项的得票数，并且返回获胜选项
contract VotingContract {
    function newVote(string topic, string[] options, uint deadline)  {

    }

    function vote(topic, topicOption) {

    }

    function voteResult(topic) {

    }
}