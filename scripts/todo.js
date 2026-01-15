const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TodoList", function () {
  let todoList;
  let user;
  let addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();

    const TodoList = await ethers.getContractFactory("TodoList");
    todoList = TodoList.deploy();

    await todoList.waitForDeployment();
  });
    
    it("User can create a todo", async () => {
         
     })
     it("", async()=>{})
     it("", async()=>{})
     it("", async () => {});
});
