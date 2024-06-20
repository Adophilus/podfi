import { config } from "./config"
import { contracts } from "./contracts"
import { User } from '@/lib/auth'

const getUserByUsername = async (username: string) =>
  contracts.helpers.publicClient.readContract({
    address: config.podfi.contractAddress,
    abi: contracts.abi.podfi,
    functionName: 'getUserByUsername',
    args: [username],
    account: '0x0000000000000000000000000000000000000000'
  }) as Promise<User>

export const helpers = {
  getUserByUsername
}
