// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleWallet {
    mapping(address => uint) public balances;

    function deposit() public payable {
        require(msg.value > 0, "Must send ETH");
        balances[msg.sender] += msg.value;
    }

    function getBalance() public view returns(uint){
        return balances[msg.sender];
    }

    function withdraw(uint amount) public{
        require(amount > 0, "Must withdraw more than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transaction failed");
    } 

  
}
