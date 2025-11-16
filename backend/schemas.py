from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TradeBase(BaseModel):
    date: str
    pair: str
    type: str
    entry: float
    exit: float
    size: float
    pnl: float
    notes: Optional[str] = None
    wallet_address: str

class TradeCreate(TradeBase):
    pass

class TradeResponse(TradeBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class DashboardStats(BaseModel):
    winRate: float
    totalProfit: float
    totalTrades: int
    averageRR: float
    maxDrawdown: float
    profitFactor: float

class AccountStatus(BaseModel):
    phase: str
    accountSize: float
    profitShare: float
    nextPayoutDate: Optional[datetime] = None

class ChartDataPoint(BaseModel):
    date: str
    equity: float

