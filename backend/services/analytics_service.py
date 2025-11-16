from sqlalchemy.orm import Session
from sqlalchemy import func
from models import Trade
from schemas import DashboardStats, ChartDataPoint
from datetime import datetime, timedelta
from typing import List

class AnalyticsService:
    @staticmethod
    def calculate_stats(db: Session, wallet_address: str) -> DashboardStats:
        trades = db.query(Trade).filter(
            Trade.wallet_address == wallet_address
        ).all()

        if not trades:
            return DashboardStats(
                winRate=0.0,
                totalProfit=0.0,
                totalTrades=0,
                averageRR=0.0,
                maxDrawdown=0.0,
                profitFactor=0.0
            )

        total_trades = len(trades)
        winning_trades = [t for t in trades if t.pnl > 0]
        losing_trades = [t for t in trades if t.pnl < 0]

        win_rate = (len(winning_trades) / total_trades * 100) if total_trades > 0 else 0.0

        total_profit = sum(t.pnl for t in trades)

        # Calculate average Risk:Reward ratio
        # Simplified: assume risk is average loss, reward is average win
        avg_win = sum(t.pnl for t in winning_trades) / len(winning_trades) if winning_trades else 0
        avg_loss = abs(sum(t.pnl for t in losing_trades) / len(losing_trades)) if losing_trades else 1
        average_rr = avg_win / avg_loss if avg_loss > 0 else 0.0

        # Calculate max drawdown
        running_equity = 0
        peak = 0
        max_drawdown = 0.0
        for trade in sorted(trades, key=lambda x: x.date):
            running_equity += trade.pnl
            if running_equity > peak:
                peak = running_equity
            drawdown = ((peak - running_equity) / peak * 100) if peak > 0 else 0
            if drawdown > max_drawdown:
                max_drawdown = drawdown

        # Profit factor
        total_wins = sum(t.pnl for t in winning_trades)
        total_losses = abs(sum(t.pnl for t in losing_trades))
        profit_factor = total_wins / total_losses if total_losses > 0 else 0.0

        return DashboardStats(
            winRate=round(win_rate, 2),
            totalProfit=round(total_profit, 2),
            totalTrades=total_trades,
            averageRR=round(average_rr, 2),
            maxDrawdown=round(max_drawdown, 2),
            profitFactor=round(profit_factor, 2)
        )

    @staticmethod
    def get_equity_curve(db: Session, wallet_address: str) -> List[ChartDataPoint]:
        trades = db.query(Trade).filter(
            Trade.wallet_address == wallet_address
        ).order_by(Trade.date).all()

        if not trades:
            return []

        running_equity = 0.0
        chart_data = []

        for trade in trades:
            running_equity += trade.pnl
            chart_data.append(ChartDataPoint(
                date=trade.date.isoformat(),
                equity=round(running_equity, 2)
            ))

        return chart_data

