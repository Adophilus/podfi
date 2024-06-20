import { WagmiProvider, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { FunctionComponent, ReactNode } from "react";
import { config } from '@/lib/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient()

const wagmiConfig = getDefaultConfig({
  appName: 'Podfi',
  projectId: config.walletconnect.projectId,
  chains: [sepolia],
  // transports: {
  //   [baseSepolia.id]: http()
  // },
  appDescription: "Podfi: Revolutionizing Podcasts",
  appUrl: "https://podfi.fly.dev",
  appIcon: "https://podfi.fly.dev/assets/images/logo.png",
});

export const Provider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
