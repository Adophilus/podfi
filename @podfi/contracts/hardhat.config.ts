import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades"
import "@nomicfoundation/hardhat-ethers";
import '@typechain/hardhat'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import 'hardhat-abi-exporter'
// import "@nomicfoundation/hardhat-verify";
import { HardhatUserConfig } from "hardhat/config";
import "./tasks"
import { config } from "./src/config"

export default {
  solidity: '0.8.20',
  typechain: {
    outDir: 'src/typechain',
    target: 'ethers-v6',
    alwaysGenerateOverloads: false,
    externalArtifacts: ['externalArtifacts/*.json'],
    dontOverrideCompile: false
  },
  etherscan: {
    apiKey: config.networks.sepolia.etherscanApiKey,
  },
  networks: {
    sepolia: {
      url: config.networks.sepolia.rpcUrl,
      // chainId: 11155111,
      chainId: 11155111,
      accounts: config.networks.sepolia.accounts
    }
  },
  abiExporter: {
    path: './abis',
    runOnCompile: true
  }
} satisfies HardhatUserConfig
