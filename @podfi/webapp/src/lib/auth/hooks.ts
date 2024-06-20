import { UserStorage } from "@podfi/contracts/types/contracts/UserStorage"
import { contracts } from "../contracts"
import { useAccount, useReadContract } from "wagmi"
import { config } from "../config"
import { useToast } from "@/components/ui/use-toast"

export type User = UserStorage.UserStruct

export type SignedOutState = {
  status: 'signed-out'
  user?: undefined
}

export type SignedInState = {
  status: 'signed-in'
  address: string
  user: User
}

export type PendingState = {
  status: 'pending'
  user?: undefined
}

export type ErrorState = {
  status: 'error'
  user?: undefined
}

export type OnboardingState = {
  status: 'onboarding'
  address: string
  user?: undefined
}

type AuthState = {
  retry: () => Promise<unknown>
}
  & (SignedInState | SignedOutState | OnboardingState | PendingState | ErrorState)

export const useAuthUnsafe = () => {
  const auth = useAuth()

  return auth as SignedInState
}

export const useAuth = (): AuthState => {
  const account = useAccount()
  const { toast } = useToast()

  const { data, status, error, refetch } = useReadContract({
    abi: contracts.abi.podfi,
    address: config.podfi.contractAddress,
    functionName: "getUserProfile",
    account: account.address,
  });

  if (!account.isConnected)
    return {
      status: 'signed-out',
      retry: refetch
    }

  if (status === 'error') {
    console.log(error)

    if ((error.walk() as any).reason === 'INEXISTENT_USER_ERROR')
      return {
        status: 'onboarding',
        address: account.address!,
        retry: refetch
      }

    if (error.name === 'ContractFunctionExecutionError') {
      toast({
        title: "Network error",
        description: "An error occrred while trying to fetch your profile",
        variant: "destructive"
      })

      return {
        status: 'error',
        retry: refetch
      }
    }

    console.log(error.name)

    return {
      status: 'error',
      retry: refetch
    }
  }

  if (status === 'pending')
    return {
      status: 'pending',
      retry: refetch
    }

  const user = data as User

  return {
    status: 'signed-in',
    address: account.address!,
    user,
    retry: refetch,
  }
}
