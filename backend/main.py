from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import List, Optional
import os
from dotenv import load_dotenv

from database import SessionLocal, engine, Base
from models import Trade, User
from schemas import TradeCreate, TradeResponse, DashboardStats, AccountStatus, ChartDataPoint
from services import TradeService, AnalyticsService, AccountService

load_dotenv()

app = FastAPI(
    title="HyroX Analytics API",
    description="Backend API for HyroX Analytics - Prop Trading Analytics Platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database initialization
Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Security
security = HTTPBearer()

@app.get("/")
async def root():
    return {
        "message": "HyroX Analytics API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Trade endpoints
@app.get("/api/trades", response_model=List[TradeResponse])
async def get_trades(
    wallet: str,
    limit: Optional[int] = 10,
    db: Session = Depends(get_db)
):
    """Get all trades for a wallet address"""
    trades = TradeService.get_trades_by_wallet(db, wallet, limit)
    return trades

@app.post("/api/trades", response_model=TradeResponse, status_code=201)
async def create_trade(
    trade: TradeCreate,
    db: Session = Depends(get_db)
):
    """Create a new trade"""
    try:
        new_trade = TradeService.create_trade(db, trade)
        return new_trade
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/api/trades/{trade_id}", status_code=204)
async def delete_trade(
    trade_id: str,
    db: Session = Depends(get_db)
):
    """Delete a trade"""
    success = TradeService.delete_trade(db, trade_id)
    if not success:
        raise HTTPException(status_code=404, detail="Trade not found")
    return None

# Dashboard endpoints
@app.get("/api/dashboard/stats", response_model=DashboardStats)
async def get_dashboard_stats(
    wallet: str,
    db: Session = Depends(get_db)
):
    """Get dashboard statistics for a wallet"""
    stats = AnalyticsService.calculate_stats(db, wallet)
    return stats

@app.get("/api/dashboard/status", response_model=AccountStatus)
async def get_account_status(
    wallet: str,
    db: Session = Depends(get_db)
):
    """Get account status for a wallet"""
    status = AccountService.get_account_status(db, wallet)
    return status

@app.get("/api/dashboard/chart", response_model=List[ChartDataPoint])
async def get_performance_chart(
    wallet: str,
    db: Session = Depends(get_db)
):
    """Get equity curve data for chart"""
    chart_data = AnalyticsService.get_equity_curve(db, wallet)
    return chart_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

