'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { ConnectWallet } from '@/components/wallet/ConnectWallet'

export default function Home() {
  const { connected } = useWallet()

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold mb-4">Welcome to HyroX Analytics</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-2xl">
          Connect your wallet to start tracking your trading performance, calculate profit splits, and build your on-chain trading identity.
        </p>
        <ConnectWallet />
      </div>
    )
  }

  return <Dashboard />
}

