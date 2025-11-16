'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useWallet } from '@solana/wallet-adapter-react'
import { Plus } from 'lucide-react'
import { api } from '@/lib/api'
import { TradeForm } from './TradeForm'
import { TradeList } from './TradeList'

export function TradingJournal() {
  const { publicKey } = useWallet()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const queryClient = useQueryClient()

  const { data: trades, isLoading } = useQuery({
    queryKey: ['trades', publicKey?.toString()],
    queryFn: () => api.getTrades(publicKey?.toString() || ''),
    enabled: !!publicKey,
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteTrade(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
    },
  })

  if (isLoading) {
    return <div className="text-center py-12">Loading trades...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trading Journal</h1>
          <p className="text-muted-foreground">Track and analyze your trading performance</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Trade
        </button>
      </div>

      {isFormOpen && (
        <TradeForm
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            setIsFormOpen(false)
            queryClient.invalidateQueries({ queryKey: ['trades'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
          }}
        />
      )}

      <TradeList trades={trades || []} onDelete={(id) => deleteMutation.mutate(id)} />
    </div>
  )
}

