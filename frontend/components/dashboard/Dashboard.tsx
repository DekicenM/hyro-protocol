'use client'

import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@solana/wallet-adapter-react'
import { api } from '@/lib/api'
import { StatsGrid } from './StatsGrid'
import { RecentTrades } from './RecentTrades'
import { PerformanceChart } from './PerformanceChart'
import { AccountStatus } from './AccountStatus'

export function Dashboard() {
  const { publicKey } = useWallet()

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats', publicKey?.toString()],
    queryFn: () => api.getDashboardStats(publicKey?.toString() || ''),
    enabled: !!publicKey,
  })

  const { data: trades } = useQuery({
    queryKey: ['recent-trades', publicKey?.toString()],
    queryFn: () => api.getRecentTrades(publicKey?.toString() || '', 10),
    enabled: !!publicKey,
  })

  if (isLoading) {
    return <div className="text-center py-12">Loading dashboard...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your trading performance</p>
      </div>

      <AccountStatus />

      {stats && <StatsGrid stats={stats} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart />
        <RecentTrades trades={trades || []} />
      </div>
    </div>
  )
}

