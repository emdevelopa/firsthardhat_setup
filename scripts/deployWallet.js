async function main() {
  const Wallet = await ethers.getContractFactory("BasicWallet");
  const wallet = await Wallet.deploy();

  await wallet.waitForDeployment();

  console.log("Wallet deployed to:", await wallet.getAddress());
}

main().catch(console.error);
