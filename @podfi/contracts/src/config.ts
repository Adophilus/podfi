import { z } from "zod"

const EnvSchema = z.object({
  SEPOLIA_PRIVATE_KEY: z.string(),
  SEPOLIA_RPC_URL: z.string(),
  SEPOLIA_ETHERSCAN_API_KEY: z.string(),
})

const env = EnvSchema.parse(process.env)

export const config = {
  networks: {
    sepolia: {
      rpcUrl: env.SEPOLIA_RPC_URL,
      etherscanApiKey: env.SEPOLIA_ETHERSCAN_API_KEY,
      accounts: [env.SEPOLIA_PRIVATE_KEY],
    },
  },
}
