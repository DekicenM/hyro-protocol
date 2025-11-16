'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useWallet } from '@solana/wallet-adapter-react'
import { api } from '@/lib/api'
import { X } from 'lucide-react'

const tradeSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  pair: z.string().min(1, 'Trading pair is required'),
  type: z.enum(['long', 'short']),
  entry: z.number().positive('Entry price must be positive'),
  exit: z.number().positive('Exit price must be positive'),
  size: z.number().positive('Size must be positive'),
  notes: z.string().optional(),
})

type TradeFormData = z.infer<typeof tradeSchema>

interface TradeFormProps {
  onClose: () => void
  onSuccess: () => void
}

export function TradeForm({ onClose, onSuccess }: TradeFormProps) {
  const { publicKey } = useWallet()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TradeFormData>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      type: 'long',
    },
  })

  const onSubmit = async (data: TradeFormData) => {
    if (!publicKey) return

    const pnl = data.type === 'long' 
      ? (data.exit - data.entry) * data.size
      : (data.entry - data.exit) * data.size

    try {
      await api.createTrade({
        ...data,
        pnl,
        walletAddress: publicKey.toString(),
      })
      onSuccess()
    } catch (error) {
      console.error('Failed to create trade:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Add New Trade</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                {...register('date')}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Trading Pair</label>
              <input
                type="text"
                placeholder="BTC/USDT"
                {...register('pair')}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.pair && <p className="text-sm text-red-500 mt-1">{errors.pair.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Trade Type</label>
            <select {...register('type')} className="w-full px-3 py-2 border rounded-md">
              <option value="long">Long</option>
              <option value="short">Short</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Entry Price</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('entry', { valueAsNumber: true })}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.entry && <p className="text-sm text-red-500 mt-1">{errors.entry.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Exit Price</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('exit', { valueAsNumber: true })}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.exit && <p className="text-sm text-red-500 mt-1">{errors.exit.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Size</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('size', { valueAsNumber: true })}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.size && <p className="text-sm text-red-500 mt-1">{errors.size.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
            <textarea
              {...register('notes')}
              rows={3}
              placeholder="Add any notes about this trade..."
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-md hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Save Trade'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

