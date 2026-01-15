async function main() {
  const [owner, addr1] = await ethers.getSigners();

  const Wallet = await ethers.getContractFactory("BasicWallet");
  const wallet = await Wallet.attach(
    "0x0165878A594ca255338adfa4d48449f69242Eb8F"
  );

  console.log("Initial balance:", await wallet.getBalance());

  console.log("Sending 0.5 ETH from addr1...");
  await addr1.sendTransaction({
    to: await wallet.getAddress(),
    value: ethers.parseEther("0.5"),
  });

  console.log("Balance after deposit:", await wallet.getBalance());

  console.log("Withdrawing 0.2 ETH...");
  await wallet.withdraw(ethers.parseEther("0.2"));

  console.log("Final balance:", await wallet.getBalance());
}

main().catch(console.error);
