// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Task1{
    struct User(
        uint256 id,
        string name,
        bool isActive,
    )
    
    User public user
    function addUser(uint _id, string _name, uint _isActive) external {
        user = User({
            id: _id,
            name: _name,
            isActive: _isActive,
        })
    }

    function getUser() external view returns(uint id, string name, bool inActive){
        return(user.id, user.name, user.inActive)
    }
}