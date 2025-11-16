'use client'

import { format } from 'date-fns'
import { Trash2 } from 'lucide-react'

interface Trade {
  id: string
  date: string
  pair: string
  type: 'long' | 'short'
  entry: number
  exit: number
  size: number
  pnl: number
  notes?: string
}

interface TradeListProps {
  trades: Trade[]
  onDelete: (id: string) => void
}

export function TradeList({ trades, onDelete }: TradeListProps) {
  if (trades.length === 0) {
    return (
      <div className="bg-card border rounded-lg p-12 text-center">
        <p className="text-muted-foreground mb-4">No trades recorded yet</p>
        <p className="text-sm text-muted-foreground">Start by adding your first trade above</p>
      </div>
    )
  }

  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Pair</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Entry</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Exit</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Size</th>
              <th className="px-4 py-3 text-left text-sm font-medium">P/L</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {trades.map((trade) => (
              <tr key={trade.id} className="hover:bg-accent transition-colors">
                <td className="px-4 py-3 text-sm">
                  {format(new Date(trade.date), 'MMM dd, yyyy')}
                </td>
                <td className="px-4 py-3 text-sm font-medium">{trade.pair}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      trade.type === 'long'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {trade.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">${trade.entry.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm">${trade.exit.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm">{trade.size.toFixed(2)}</td>
                <td
                  className={`px-4 py-3 text-sm font-semibold ${
                    trade.pnl >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => onDelete(trade.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

