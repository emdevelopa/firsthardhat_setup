const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorage;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy();

    await simpleStorage.waitForDeployment();
  });

  it("it should store and retrieve a number", async () => {
    await simpleStorage.setNumber(60);
    const getNum = await simpleStorage.getNumber();
    expect(getNum).to.equal(60);
  });

  it("Only Owner can set the number", async () => {
    await expect(simpleStorage.connect(addr1).setNumber(45)).to.be.revertedWith(
      "Not the owner"
    );
  });

  it("it should reset number to zero", async () => {
    await simpleStorage.setNumber(60);
    await simpleStorage.resetNumber();
    expect(await simpleStorage.getNumber()).to.equal(0);
  });
});
