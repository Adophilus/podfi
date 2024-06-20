import "./deploy-podfi"
import "./upgrade-podfi"
import { task } from "hardhat/config";

task("fund", "Funds a wallet with 10 ETH")
  .addParam("address", "The account's address")
  .setAction(async ({ address }, { ethers }) => {
    const [defaultAccount] = await ethers.getSigners()
    await defaultAccount.sendTransaction({
      to: address,
      value: ethers.parseEther('10')
    })
  });
