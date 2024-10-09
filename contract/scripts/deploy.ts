import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const SpinToEarn = await ethers.getContractFactory("SpinToEarn");
  const election = await SpinToEarn.deploy();

  console.log("SpinToEarn deployed to:", election.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
