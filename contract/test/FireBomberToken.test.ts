import { expect } from 'chai';
import { ethers } from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';

describe('FireBomberToken', function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory('FireBomberToken');
    const [owner, addr1, addr2] = await ethers.getSigners();

    const token = await Token.deploy();

    return { token, owner, addr1, addr2 };
  }

  it('Should deploy with the correct initial supply', async function () {
    const { token, owner } = await loadFixture(deployTokenFixture);
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });

  it('Should mint tokens correctly', async function () {
    const { token, owner, addr1 } = await loadFixture(deployTokenFixture);
    await token.mint(addr1.address, 1000);
    expect(await token.balanceOf(addr1.address)).to.equal(1000);
  });

  it('Should burn tokens correctly', async function () {
    const { token, owner } = await loadFixture(deployTokenFixture);

    const decimals = await token.decimals();
    const initialBalance = await token.balanceOf(owner.address);

    await token.burn(500n * 10n ** BigInt(decimals));

    const expectedBalance = initialBalance - 500n * 10n ** BigInt(decimals);

    expect(await token.balanceOf(owner.address)).to.equal(expectedBalance);
  });

  it('Should pause and unpause token transfers', async function () {
    const { token, owner, addr1, addr2 } =
      await loadFixture(deployTokenFixture);
    await token.pause();
    await expect(token.transfer(addr1.address, 100)).to.be.revertedWith(
      'Pausable: paused',
    );

    await token.unpause();
    await token.transfer(addr1.address, 100);
    expect(await token.balanceOf(addr1.address)).to.equal(100);
  });

  it('Should transfer tokens correctly', async function () {
    const { token, owner, addr1 } = await loadFixture(deployTokenFixture);
    await token.transfer(addr1.address, 100);
    expect(await token.balanceOf(addr1.address)).to.equal(100);
  });

  it('Should approve and transferFrom tokens correctly', async function () {
    const { token, owner, addr1, addr2 } =
      await loadFixture(deployTokenFixture);
    await token.approve(addr1.address, 100);
    expect(await token.allowance(owner.address, addr1.address)).to.equal(100);

    await token.connect(addr1).transferFrom(owner.address, addr2.address, 100);
    expect(await token.balanceOf(addr2.address)).to.equal(100);
  });
});
