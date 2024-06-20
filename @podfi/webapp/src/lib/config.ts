import { z } from "zod"

const EnvSchema = z.object({
  WALLETCONNECT_PROJECT_ID: z.string(),
  THIRDWEB_CLIENT_ID: z.string(),
  ACCOUNT_FACTORY_ADDRESS: z.string(),
  PODFI_CONTRACT_ADDRESS: z.string(),
  ENVIRONMENT: z.enum(['production', 'development']),
  MAGIC_PUBLIC_KEY: z.string(),
})

const env = EnvSchema.parse({
  WALLETCONNECT_PROJECT_ID: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  THIRDWEB_CLIENT_ID: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
  ACCOUNT_FACTORY_ADDRESS: import.meta.env.VITE_ACCOUNT_FACTORY_ADDRESS,
  PODFI_CONTRACT_ADDRESS: import.meta.env.VITE_PODFI_CONTRACT_ADDRESS,
  MAGIC_PUBLIC_KEY: import.meta.env.VITE_MAGIC_PUBLIC_KEY,
  ENVIRONMENT: import.meta.env.MODE,
})

export const config = {
  app: {
    environment: env.ENVIRONMENT,
  },
  thirdweb: {
    clientId: env.THIRDWEB_CLIENT_ID
  },
  magic: {
    publicKey: env.MAGIC_PUBLIC_KEY,
  },
  smartaccount: {
    accountFactoryAddress: env.ACCOUNT_FACTORY_ADDRESS,
  },
  podfi: {
    contractAddress: env.PODFI_CONTRACT_ADDRESS as `0x${string}`,
    smartWallet: {
      factoryAddress: env.ACCOUNT_FACTORY_ADDRESS,
      gasless: true,
    }
  },
  walletconnect: {
    projectId: env.WALLETCONNECT_PROJECT_ID
  },
}

