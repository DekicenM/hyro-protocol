'use client'

import { format } from 'date-fns'
import Link from 'next/link'

interface Trade {
  id: string
  date: string
  pair: string
  type: 'long' | 'short'
  entry: number
  exit: number
  size: number
  pnl: number
}

interface RecentTradesProps {
  trades: Trade[]
}

export function RecentTrades({ trades }: RecentTradesProps) {
  if (trades.length === 0) {
    return (
      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Trades</h2>
        <p className="text-muted-foreground text-center py-8">
          No trades yet. <Link href="/journal" className="text-primary hover:underline">Add your first trade</Link>
        </p>
      </div>
    )
  }

  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Trades</h2>
        <Link href="/journal" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="space-y-2">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="flex items-center justify-between p-3 rounded-md hover:bg-accent transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{trade.pair}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    trade.type === 'long'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {trade.type.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {format(new Date(trade.date), 'MMM dd, yyyy')} • Entry: ${trade.entry} → Exit: ${trade.exit}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`font-semibold ${
                  trade.pnl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

