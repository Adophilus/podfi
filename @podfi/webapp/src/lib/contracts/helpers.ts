import { createPublicClient, http } from 'viem'
import { baseSepolia, sepolia} from 'viem/chains'

export const publicClient = createPublicClient({
  // chain: baseSepolia,
  chain: sepolia,
  transport: http()
})
