'use client'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export function ConnectWallet() {
  return (
    <div className="flex flex-col items-center gap-4">
      <WalletMultiButton className="!bg-primary !text-primary-foreground hover:!bg-primary/90" />
      <p className="text-sm text-muted-foreground">
        Connect your Phantom or Solflare wallet to get started
      </p>
    </div>
  )
}

