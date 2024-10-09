import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("SpinToEarn Contract", function () {
  async function deploySpinToEarnFixture() {
    const [owner, user1, user2] = await ethers.getSigners();

    const SpinToEarn = await ethers.getContractFactory("SpinToEarn");
    const spinToEarn = await SpinToEarn.deploy();
    // await spinToEarn.deployed();

    return { spinToEarn, owner, user1, user2 };
  }

  it("Should set the correct owner", async function () {
    const { spinToEarn, owner } = await loadFixture(deploySpinToEarnFixture);
    expect(await spinToEarn.owner()).to.equal(owner.address);
  });

  it("Should allow users to buy tickets with BNB", async function () {
    const { spinToEarn, user1 } = await loadFixture(deploySpinToEarnFixture);
    const ticketPrice = ethers.parseEther("0.01");

    // User1 buys 1 ticket by sending 0.01 BNB
    await spinToEarn.connect(user1).buyTickets({ value: ticketPrice });

    const userTickets = await spinToEarn.ticketsBalance(user1.address);
    expect(userTickets).to.equal(1);
  });

  it("Should allow only owner to set points for users", async function () {
    const { spinToEarn, owner, user1, user2 } = await loadFixture(
      deploySpinToEarnFixture
    );

    // Set points for user1 and user2
    await spinToEarn
      .connect(owner)
      .setPoints([user1.address, user2.address], [100, 200]);

    expect(await spinToEarn.pointsBalance(user1.address)).to.equal(100);
    expect(await spinToEarn.pointsBalance(user2.address)).to.equal(200);
  });

  it("Should not allow non-owner to set points", async function () {
    const { spinToEarn, user1, user2 } = await loadFixture(
      deploySpinToEarnFixture
    );

    await expect(
      spinToEarn.connect(user1).setPoints([user2.address], [100])
    ).to.be.revertedWith("Only owner can perform this action");
  });

  it("Should allow users to withdraw rewards based on points", async function () {
    const { spinToEarn, owner, user1 } = await loadFixture(
      deploySpinToEarnFixture
    );

    // Owner assigns 1000 points to user1
    await spinToEarn.connect(owner).setPoints([user1.address], [1000]);

    // User1 withdraws rewards
    const user1BalanceBefore = await ethers.provider.getBalance(user1.address);
    const tx = await spinToEarn.connect(user1).withdrawFunds();
    const receipt = await tx.wait(); // Get gas fee information

    const user1BalanceAfter = await ethers.provider.getBalance(user1.address);

    const gasUsed = receipt.gasUsed.mul(tx.gasPrice); // Calculate gas fees

    expect(
      user1BalanceAfter.add(gasUsed).sub(user1BalanceBefore)
    ).to.be.closeTo(
      ethers.parseEther("1"), // 1000 points = 1 BNB
      ethers.parseEther("0.01") // Small error range due to gas fees
    );
  });

  it("Should not allow users with less than 100 points to withdraw", async function () {
    const { spinToEarn, owner, user1 } = await loadFixture(
      deploySpinToEarnFixture
    );

    // Owner assigns 50 points to user1 (less than 100)
    await spinToEarn.connect(owner).setPoints([user1.address], [50]);

    await expect(spinToEarn.connect(user1).withdrawFunds()).to.be.revertedWith(
      "You need at least 100 points to withdraw rewards"
    );
  });
});