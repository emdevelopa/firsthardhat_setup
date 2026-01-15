const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  let counter;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();

    await counter.waitForDeployment();
  });

  it("Initial count should be zero", async () => {
    const getCount = await counter.getCount();
    expect(getCount).to.equal(0);
  });
  it("Owner can increment", async () => {
    await counter.increment();
    expect(await counter.getCount()).to.equal(1);
  });
  it("Owner can decrement", async () => {
    await counter.increment();
    await counter.decrement();
    expect(await counter.getCount()).to.equal(0);
  });

  it("Should not decrement below sero", async () => {
    await expect(counter.decrement()).to.be.revertedWith(
      "Count can not be negative"
    );
  });

  it("Non-owner can not modify the counter", async () => {
    await expect(counter.connect(addr1).increment()).to.be.revertedWith(
      "Not the owner"
    );
  });
});
