'use client'

import { TrendingUp, TrendingDown, Target, DollarSign } from 'lucide-react'

interface Stats {
  winRate: number
  totalProfit: number
  totalTrades: number
  averageRR: number
  maxDrawdown: number
  profitFactor: number
}

interface StatsGridProps {
  stats: Stats
}

export function StatsGrid({ stats }: StatsGridProps) {
  const statCards = [
    {
      label: 'Win Rate',
      value: `${stats.winRate.toFixed(1)}%`,
      icon: Target,
      trend: stats.winRate >= 50 ? 'up' : 'down',
    },
    {
      label: 'Total Profit',
      value: `$${stats.totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      trend: stats.totalProfit >= 0 ? 'up' : 'down',
    },
    {
      label: 'Total Trades',
      value: stats.totalTrades.toString(),
      icon: TrendingUp,
    },
    {
      label: 'Avg R:R',
      value: stats.averageRR.toFixed(2),
      icon: TrendingUp,
    },
    {
      label: 'Max Drawdown',
      value: `${stats.maxDrawdown.toFixed(2)}%`,
      icon: TrendingDown,
      trend: 'down',
    },
    {
      label: 'Profit Factor',
      value: stats.profitFactor.toFixed(2),
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon
        const isPositive = stat.trend === 'up'
        return (
          <div
            key={stat.label}
            className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <Icon className={`h-5 w-5 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}

