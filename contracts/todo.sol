// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TodoList {
    struct Todo {
        uint256 id;
        string text;
        bool completed;
        bool deleted;
    }

    mapping(address => Todo[]) private todos;
    uint256 private nextId;

    

    event TodoCreated(address indexed user, uint256 id, string text);
    event TodoCmpleted(address indexed user, uint256 id);

    function createTodo(string calldata _text) external {
        require(bytes(_text).length > 0, "Todo can not be empty");

        todos[msg.sender].push(
            Todo({id: nextId, text: _text, completed: false,deleted: false})
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

    function deleteTodo(uint256 id) external{
         require(id < todos[msg.sender].length, "Todo does not exist");

         Todo storage todo = todos[msg.sender][id];

         require(!todo.deleted, "Already deleted");

         todo.deleted=true;

    }

    function updateTodo(uint256 id, string calldata newText) external {
        require(bytes(newText).length > 0, "Text is empty");
        require(id < todos[msg.sender].length, "Todo does not exist");

        Todo storage todo = todos[msg.sender][id];

        require(!todo.deleted, "Todo deleted");

        todo.text = newText;

    }
}
