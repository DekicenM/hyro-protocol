'use client'

import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@solana/wallet-adapter-react'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { api } from '@/lib/api'

export function AccountStatus() {
  const { publicKey } = useWallet()

  const { data: status } = useQuery({
    queryKey: ['account-status', publicKey?.toString()],
    queryFn: () => api.getAccountStatus(publicKey?.toString() || ''),
    enabled: !!publicKey,
  })

  if (!status) {
    return null
  }

  const statusConfig = {
    challenge: {
      label: 'Challenge Phase',
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    funded: {
      label: 'Funded Account',
      icon: CheckCircle2,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    scaling: {
      label: 'Scaling Phase',
      icon: CheckCircle2,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    violation: {
      label: 'Rule Violation',
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
  }

  const config = statusConfig[status.phase as keyof typeof statusConfig] || statusConfig.challenge
  const Icon = config.icon

  return (
    <div className={`${config.bgColor} border rounded-lg p-4`}>
      <div className="flex items-center gap-3">
        <Icon className={`h-6 w-6 ${config.color}`} />
        <div className="flex-1">
          <h3 className="font-semibold">{config.label}</h3>
          <p className="text-sm text-muted-foreground">
            Account Size: ${status.accountSize.toLocaleString()} • Profit Share: {status.profitShare}%
          </p>
          {status.nextPayoutDate && (
            <p className="text-sm text-muted-foreground mt-1">
              Next Payout: {new Date(status.nextPayoutDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

