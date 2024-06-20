import { FunctionComponent, ReactNode } from "react"
import { Provider as WagmiProvider } from "./wagmi"
import { Provider as OnboardingProvider } from "./onboarding"


export const AppProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <WagmiProvider>
      <OnboardingProvider>
        {children}
      </OnboardingProvider>
    </WagmiProvider>
  )
}
