// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Task1 {
    struct User {
        uint256 id;
        string name;
        bool isActive;
    }

    mapping(uint => User) private user;
    mapping(uint => bool) private userExists;

    function addUser(uint _id, string calldata _name, bool _isActive) external {
        require(!userExists[_id], "User already exists");
        users[_id] = User({id: _id, name: _name, isActive: _isActive});

        userExists[_id] = true;
    }

    function getUser(
        uint _id
    ) external view returns (uint id, string memory name, bool isActive) {
        require(userExists[_id], "User does not exist");

        User storage user = users[_id];
        return (user.id, user.name, user.isActive);
    }

    function getUsersCount() external view returns (uint) {
        return users.length;
    }
}
