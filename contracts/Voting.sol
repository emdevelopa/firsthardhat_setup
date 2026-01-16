// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting{
    enum voteChoice{
        YES,
        No
    }

    struct Proposal{
        uint256 id;
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 deadline;
        bool exists;
    }

    event ProposalCreated(
        uint indexed id,
        string description,
        uint deadline
    );

    event voteCast(
        uint indexed proposalId,
        address indexed voter,
        voteChoice choice, 
    )

    address public admin;
    uint public proposalCount;

    mapping(uint => Proposal) public proposal;
    mapping(uint => mapping(address => bool)) public hasVoted;

    modifier onlyAdmin(){
        require(msg.sender == admin, "Not an admin");
        _;
    }

    constructor(){
        admin = msg.sender;
    }


    function createProposal(string calldata description, uint duration) external onlyAdmin{
        require(bytes(description).length > 0, "description can not be empty");
        require(duration > 0, "Invalid duration");

        uint id = proposalCount

        proposals[id] = Proposal({
            id: id,
            description: description,
            yesVotes: yesVotes,
            noVotes: noVotes,
            deadline: block.timestamp + duration,
            exists: true
        })

        proposalCount++

        emit proposalCreated(id, description, proposals[id].deadline);
    }

}