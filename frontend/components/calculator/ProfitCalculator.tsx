'use client'

import { useState } from 'react'
import { Calculator as CalculatorIcon, DollarSign, TrendingUp } from 'lucide-react'

interface CalculationResult {
  grossProfit: number
  companyShare: number
  traderShare: number
  netPayout: number
  nextScalingLevel?: string
  nextAccountSize?: number
}

export function ProfitCalculator() {
  const [profit, setProfit] = useState('')
  const [accountSize, setAccountSize] = useState('')
  const [profitShare, setProfitShare] = useState('90')
  const [scalingStage, setScalingStage] = useState('1')
  const [result, setResult] = useState<CalculationResult | null>(null)

  const calculate = () => {
    const profitNum = parseFloat(profit)
    const accountSizeNum = parseFloat(accountSize)
    const profitShareNum = parseFloat(profitShare)

    if (!profitNum || !accountSizeNum || !profitShareNum) {
      alert('Please fill in all fields')
      return
    }

    const grossProfit = profitNum
    const traderSharePercent = profitShareNum / 100
    const companySharePercent = 1 - traderSharePercent

    const traderShare = grossProfit * traderSharePercent
    const companyShare = grossProfit * companySharePercent
    const netPayout = traderShare // Assuming no additional fees for now

    // Scaling logic (simplified)
    let nextScalingLevel: string | undefined
    let nextAccountSize: number | undefined

    if (profitNum >= accountSizeNum * 0.1) {
      // If profit is 10% of account, can scale
      const currentStage = parseInt(scalingStage)
      nextScalingLevel = (currentStage + 1).toString()
      nextAccountSize = accountSizeNum * 1.5 // 50% increase
    }

    setResult({
      grossProfit,
      companyShare,
      traderShare,
      netPayout,
      nextScalingLevel,
      nextAccountSize,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profit Split Calculator</h1>
        <p className="text-muted-foreground">Calculate your exact payout and scaling eligibility</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Input Parameters</h2>

          <div>
            <label className="block text-sm font-medium mb-2">Total Profit ($)</label>
            <input
              type="number"
              step="0.01"
              value={profit}
              onChange={(e) => setProfit(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Account Size ($)</label>
            <input
              type="number"
              step="0.01"
              value={accountSize}
              onChange={(e) => setAccountSize(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Profit Share (%)</label>
            <input
              type="number"
              step="1"
              min="0"
              max="100"
              value={profitShare}
              onChange={(e) => setProfitShare(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Current Scaling Stage</label>
            <select
              value={scalingStage}
              onChange={(e) => setScalingStage(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="1">Stage 1</option>
              <option value="2">Stage 2</option>
              <option value="3">Stage 3</option>
              <option value="4">Stage 4</option>
              <option value="5">Stage 5</option>
            </select>
          </div>

          <button
            onClick={calculate}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <CalculatorIcon className="h-4 w-4" />
            Calculate
          </button>
        </div>

        {result && (
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Calculation Results</h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span className="text-sm text-muted-foreground">Gross Profit</span>
                <span className="font-semibold">${result.grossProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span className="text-sm text-muted-foreground">Company Share</span>
                <span className="font-semibold">${result.companyShare.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span className="text-sm text-muted-foreground">Your Share ({profitShare}%)</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  ${result.traderShare.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="border-t pt-3 mt-3">
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-md">
                  <span className="font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Net Payout
                  </span>
                  <span className="text-xl font-bold text-primary">
                    ${result.netPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {result.nextScalingLevel && result.nextAccountSize && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="font-semibold text-green-800 dark:text-green-200">
                      Scaling Eligible!
                    </span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    You can scale to Stage {result.nextScalingLevel} with an account size of{' '}
                    <span className="font-semibold">
                      ${result.nextAccountSize.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

