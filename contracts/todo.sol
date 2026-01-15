// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TodoList {
    struct Todo {
        uint256 id;
        string text;
        bool completed;
    }

    mapping(address => Todo[]) private todos;
    uint256 private nextId;

    event TodoCreated(address indexed user, uint256 id, string text);
    event TodoCmpleted(address indexed user, uint256 id);

    function CreateTodo(string calldata _text) external {
        require(bytes(_text).length > 0, "Tod can not be empty");

        todos[msg.sender].push(
            Todo({id: nextId, text: _text, completed: false})
        );

        emit TodoCreated(msg.sender, nextId, _text);
        nextId++;
    }

    function markCompleted(uint256 id) external {
        Todo[] storage userTodos = todos[msg.sender];

        for (uint256 i; i < userTodos.length; i++) {
            if (userTodos[i].id == id) {
                require(!userTodos[i].completed, "Already completed");

                userTodos[i].completed = true;
                emit TodoCmpleted(msg.sender, id);
                return;
            }
        }

        revert("Todo not found");
    }

    function getTodos(address user) external view returns (Todo[] memory) {
        return todos[user];
    }
}
