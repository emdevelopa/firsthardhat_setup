const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BasicWallet", function () {
  let wallet;
  let owner;
  let addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();

    const Wallet = await ethers.getContractFactory("BasicWallet");
    wallet = await Wallet.deploy();
    await wallet.waitForDeployment();
  });

  it("Should accept ETH deposits", async () => {
    await owner.sendTransaction({
      to: await wallet.getAddress(),
      value: ethers.parseEther("1"),
    });

    expect(await wallet.getBalance()).to.equal(ethers.parseEther("1"));
  });

  it("Only owner can withdraw", async () => {
    await owner.sendTransaction({
      to: await wallet.getAddress(),
      value: ethers.parseEther("1"),
    });

    await expect(
      wallet.connect(addr1).withdraw(ethers.parseEther("0.4"))
    ).to.be.revertedWith("Not the owner");
  });

  it("Owner can withdraw ETH", async () => {
    await owner.sendTransaction({
      to: await wallet.getAddress(),
      value: ethers.parseEther("1"),
    });

    await wallet.withdraw(ethers.parseEther("0.4"));

    expect(await wallet.getBalance()).to.equal(ethers.parseEther("0.6"));
  });
});
