import { Podfi } from '@/typechain';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import hre from 'hardhat'

describe("Integration tests", () => {
  const contracts = {
    podfi: null as unknown as Podfi
  }

  async function deployContracts() {
    const [owner] = await hre.ethers.getSigners();

    const Podfi = await hre.ethers.getContractFactory("Podfi");
    const podfi = await Podfi.deploy();

    return { podfi, owner };
  }

  it("should deloy and cache the Podfi smart contract", async () => {
    const { podfi } = await loadFixture(deployContracts)

    contracts.podfi = podfi
  })


  it("should register a user", async () => {
    const { podfi } = contracts

    const tx = await podfi
      .registerUser('adophilus', 'some description')

    await tx.wait()
  })

  it("should not allow a user to register more than once", async () => {
    const { podfi } = contracts

    await expect(
      podfi
        .registerUser('adophilus2', 'some description')
    ).to.be.revertedWith('USER_ALREADY_REGISTERED_ERROR')
  })

  it("should fetch the registered user's details", async () => {
    const { podfi } = contracts

    const user = await podfi
      .getUserProfile()

    expect(user.username).to.equal('adophilus')
  })

  it("should fail to fetch the an unregistered user's details", async () => {
    const { podfi } = contracts
    const [, anotherAccount] = await hre.ethers.getSigners()

    await expect(
      podfi
        .connect(anotherAccount)
        .getUserProfile()
    ).to.be.revertedWith('INEXISTENT_USER_ERROR')
  })

  it("should fetch the a registered user's details with their username", async () => {
    const { podfi } = contracts

    const user = await podfi
       .getUserByUsername('adophilus')

    expect(user.username).to.equal('adophilus')
  })
})
