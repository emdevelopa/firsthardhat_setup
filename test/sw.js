const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SW", function () {
  let simpleWallet;
  let owner;
  let user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    const SimpleWallet = await ethers.getContractFactory("SimpleWallet");
    simpleWallet = await SimpleWallet.deploy();
    await simpleWallet.waitForDeployment();
  });

  it("Should deploy successfully", async () => {
    const address = await simpleWallet.getAddress();
    expect(address).to.not.equal("");
  });

  it("Should deposit ethers", async () => {
    await simpleWallet.connect(user).deposit({
      value: ethers.parseEther("1"),
    });

    const balance = await simpleWallet.connect(user).getBalance();
    console.log("user balance", ethers.formatEther(balance));
  });

  it("Should withdraw ethers", async () => {
    await simpleWallet.connect(user).deposit({
      value: ethers.parseEther("1"),
    });

    const balance = await simpleWallet.connect(user).getBalance();
    console.log("Balance Before: ", ethers.formatEther(balance));

    await simpleWallet.connect(user).withdraw(ethers.parseEther("0.5"));

    console.log("Balance After: ", ethers.formatEther(balance));
  });
});
