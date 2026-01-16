const { ethers } = require("hardhat");

describe("Task1", function () {
  let task;
  let user;

  beforeEach(async () => {
    const Test = ethers.getContractFactory("Task1");
    test = await Test.deploy();

    test.waitForDeployment();
  });
    
    it("Add user", async () => {
        
    })

    it("gets user", async () => {
        
    })
});
