'use client'

import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@solana/wallet-adapter-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { api } from '@/lib/api'

export function PerformanceChart() {
  const { publicKey } = useWallet()

  const { data: chartData } = useQuery({
    queryKey: ['performance-chart', publicKey?.toString()],
    queryFn: () => api.getPerformanceChart(publicKey?.toString() || ''),
    enabled: !!publicKey,
  })

  if (!chartData || chartData.length === 0) {
    return (
      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Performance Chart</h2>
        <p className="text-muted-foreground text-center py-8">No data available yet</p>
      </div>
    )
  }

  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Equity Curve</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="equity"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

