import { task } from "hardhat/config";

task("deploy:podfi", "Deploys the Podfi smart contract")
  .setAction(async (args, hre) => {
    const { ethers, upgrades } = hre

    const Podfi = await ethers.getContractFactory("Podfi");

    console.log("Deploying Podfi...");
    const podfi = await upgrades.deployProxy(Podfi, [], {
      initializer: "initialize",
    });

    await podfi.waitForDeployment()

    await hre.run("verify:verify", {
      address: await podfi.getAddress()
    })

    console.log("Podfi deployed to:", await podfi.getAddress());
  });

