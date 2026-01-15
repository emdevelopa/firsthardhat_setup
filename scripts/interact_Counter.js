async function main() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.attach(
    "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
  );

  console.log("Initial Count:", await counter.getCount());

  console.log("Incrementing...");
  await counter.increment();
  console.log("After increment:", await counter.getCount());

  console.log("Decrementing...");
  await counter.decrement();
  console.log("After decrement:", await counter.getCount());
}

main().catch(console.error);
