// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 public count;
    address public owner;

    event counterUpdated(uint256 oldCount, uint256 newCount);

    constructor() {
        owner = msg.sender;
        count = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function increment() public onlyOwner {
        uint256 oldCount = count;
        count += 1;
        emit counterUpdated(oldCount, count);
    }

    function decrement() public onlyOwner {
        require(count > 0, "Count can not be negative");
        uint256 oldCount = count;
        count -= 1;
        emit counterUpdated(oldCount, count);
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
