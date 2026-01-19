const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Task1", function () {
  let task;
  let user;

  beforeEach(async () => {
    [user] = await ethers.getSigners();
    const Task = await ethers.getContractFactory("Task1");
    task = await Task.deploy();

    task.waitForDeployment();
  });

  it("should add users to the array and count users", async () => {
    await task.addUser(1, "Bosun", false);
    await task.addUser(2, "John", false);

    const count = await task.getUsersCount();

    expect(count).to.equal(2);
  });

  it("it should return the correct user by index", async () => {
    await task.addUser(1, "Bosun", false);
    await task.addUser(2, "John", false);

    const user = await task.getUser(1);

    expect(user.name).to.equal("John");
  });

  it("it should revert when accessing invalid index", async () => {
    await expect(task.getUser(9)).to.be.revertedWith("User does not exist");
  });
});
