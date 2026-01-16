// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Task1{
    struct User{
        uint256 id;
        string name;
        bool isActive;
    }
    
    User public user;

    function addUser(uint _id, string calldata _name, bool _isActive) external {
        user = User({
            id: _id,
            name: _name,
            isActive: _isActive
        });
    }

    function getUser() external view returns(uint id, string memory name, bool isActive){
        return(user.id, user.name, user.isActive);
    }
}