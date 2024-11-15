import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia,polygonAmoy } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    ssr: true,
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
  
  },
})