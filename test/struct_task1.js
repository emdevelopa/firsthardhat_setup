const { ethers } = require("hardhat");

describe("Task1", function () {
  let task;
  let user;

  beforeEach(async () => {
    const Task = ethers.getContractFactory("Task1");
    task = await Task.deploy();

    task.waitForDeployment();
  });
    
    it("Add user", async () => {
        const { expect } = require("chai");
        await task.addUser(1, "Bosun", false)

        expect()
    })

    it("gets user", async () => {
        
    })
});
