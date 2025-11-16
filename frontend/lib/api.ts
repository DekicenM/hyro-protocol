import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface Trade {
  id: string
  date: string
  pair: string
  type: 'long' | 'short'
  entry: number
  exit: number
  size: number
  pnl: number
  notes?: string
  walletAddress: string
}

export interface CreateTradeDto {
  date: string
  pair: string
  type: 'long' | 'short'
  entry: number
  exit: number
  size: number
  pnl: number
  notes?: string
  walletAddress: string
}

export interface DashboardStats {
  winRate: number
  totalProfit: number
  totalTrades: number
  averageRR: number
  maxDrawdown: number
  profitFactor: number
}

export interface AccountStatus {
  phase: 'challenge' | 'funded' | 'scaling' | 'violation'
  accountSize: number
  profitShare: number
  nextPayoutDate?: string
}

export interface ChartDataPoint {
  date: string
  equity: number
}

export const api = {
  // Trades
  getTrades: async (walletAddress: string): Promise<Trade[]> => {
    const response = await apiClient.get(`/api/trades?wallet=${walletAddress}`)
    return response.data
  },

  getRecentTrades: async (walletAddress: string, limit: number = 10): Promise<Trade[]> => {
    const response = await apiClient.get(`/api/trades?wallet=${walletAddress}&limit=${limit}`)
    return response.data
  },

  createTrade: async (trade: CreateTradeDto): Promise<Trade> => {
    const response = await apiClient.post('/api/trades', trade)
    return response.data
  },

  deleteTrade: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/trades/${id}`)
  },

  // Dashboard
  getDashboardStats: async (walletAddress: string): Promise<DashboardStats> => {
    const response = await apiClient.get(`/api/dashboard/stats?wallet=${walletAddress}`)
    return response.data
  },

  getAccountStatus: async (walletAddress: string): Promise<AccountStatus> => {
    const response = await apiClient.get(`/api/dashboard/status?wallet=${walletAddress}`)
    return response.data
  },

  getPerformanceChart: async (walletAddress: string): Promise<ChartDataPoint[]> => {
    const response = await apiClient.get(`/api/dashboard/chart?wallet=${walletAddress}`)
    return response.data
  },
}

