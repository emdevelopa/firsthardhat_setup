// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting{
    enum VoteChoice{
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
        VoteChoice choice
    );

    address public admin;
    uint public proposalCount;

    mapping(uint => Proposal) public proposals;
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

        uint id = proposalCount;

        proposals[id] = Proposal({
            id: id,
            description: description,
            yesVotes: 0,
            noVotes: 0,
            deadline: block.timestamp + duration,
            exists: true
        });

        proposalCount++;

        emit ProposalCreated(id, description, proposals[id].deadline);
    }

    function vote(uint256 proposalId, VoteChoice choice) external{
        Proposal storage proposal = proposals[proposalId];

        require(proposal.exists, "Proposal not found");
         require(block.timestamp < proposal.deadline, "Voting ended");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        hasVoted[proposalId][msg.sender] = true;

        if (choice == VoteChoice.YES) {
            proposal.yesVotes += 1;
        } else {
            proposal.noVotes += 1;
        }

        emit voteCast(proposalId, msg.sender, choice);
    }

    function getResult(uint proposalId) external view returns(uint yes, uint no){
        Proposal storage proposal = proposals[proposalId]; 

        require(proposal.exists, "Proposal not found");
        require(block.timestamp >= proposal.deadline, "Voting not ended");

        return (proposal.yesVotes, proposal.noVotes);
    }

}