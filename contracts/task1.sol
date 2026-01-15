// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 private storeNumber;

    address public owner;
    event NumberUpdated(uint256 oldNumber, uint256 newNumber);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function setNumber(uint256 _num) public onlyOwner {
        storeNumber = _num;
    }

    function getNumber() public view returns (uint256) {
        return storeNumber;
    }

    function resetNumber() public onlyOwner{
        uint256 oldNumber = storeNumber;
        storeNumber = 0;

        emit NumberUpdated(oldNumber, 0);
    }
}
