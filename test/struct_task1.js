const { ethers } = require("hardhat");

describe("Task1", function () {
  let task;
  let user;

  beforeEach(async () => {
    [user] = await ethers.getSigners();
    const Task = await ethers.getContractFactory("Task1");
    task = await Task.deploy();

    task.waitForDeployment();
    await task.addUser(1, "Bosun", false);
  });

  it("Add user", async () => {
      const user = await task.getUser()
     
      expect(user.id).to.equal(1)
      expect(user.name).to.equal("Bosu")
      expect(user.isActive).to.equal(false)
  });

    it("gets user", async () => {
        const user = await task.getUser();


  });
});
