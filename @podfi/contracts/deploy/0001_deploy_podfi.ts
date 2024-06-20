import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
  
  const Podfi = await hre.ethers.getContractFactory('Podfi')
  const podfiDeployment = await Podfi.deploy()
  await podfiDeployment.waitForDeployment()
  const podfiAddress = await podfiDeployment.getAddress()

  const PodToken = await hre.ethers.getContractFactory('PodToken')
  const podtokenDeployment = await PodToken.deploy()
  await podtokenDeployment.waitForDeployment()
  const podtokenAddress = await podtokenDeployment.getAddress()


  await hre.run("verify:verify", {
    address: podfiAddress,
  })

  await hre.run("verify:verify", {
    address: podtokenAddress
  })
};

func.tags = ['deploy_podfi']; 

export default func; 

