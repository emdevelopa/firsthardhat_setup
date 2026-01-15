async function main() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.attach("PASTE_DEPLOYED_ADDRESS");

  console.log("Initial Count:", await counter.getCount());

  console.log("Incrementing...");
  await counter.increment();
  console.log("After increment:", await counter.getCount());

  console.log("Decrementing...");
  await counter.decrement();
  console.log("After decrement:", await counter.getCount());
}

main().catch(console.error);
