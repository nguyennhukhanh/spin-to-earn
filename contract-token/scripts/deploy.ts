import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const FireBomberToken = await ethers.getContractFactory('FireBomberToken');
  const election = await FireBomberToken.deploy();

  console.log('FireBomberToken deployed to:', election.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
