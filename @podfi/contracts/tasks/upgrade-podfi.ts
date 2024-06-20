import { task } from "hardhat/config";

task("upgrade:podfi", "Upgrades the Podfi smart contract")
  .setAction(async (args, hre) => {
    const { ethers, upgrades } = hre
    const { proxyAddress } = args

    const Podfi = await ethers.getContractFactory("Podfi");

    console.log("Upgrading Podfi...");
    const podfi = await upgrades.upgradeProxy(proxyAddress, Podfi)

    await podfi.waitForDeployment()

    await hre.run("verify:verify", {
      address: await podfi.getAddress()
    })

    console.log("Podfi deployed to:", await podfi.getAddress());
  });

