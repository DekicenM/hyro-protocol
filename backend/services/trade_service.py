from sqlalchemy.orm import Session
from sqlalchemy import desc
from models import Trade
from schemas import TradeCreate, TradeResponse
from datetime import datetime

class TradeService:
    @staticmethod
    def get_trades_by_wallet(db: Session, wallet_address: str, limit: int = 100):
        trades = db.query(Trade).filter(
            Trade.wallet_address == wallet_address
        ).order_by(desc(Trade.date)).limit(limit).all()
        return trades

    @staticmethod
    def create_trade(db: Session, trade: TradeCreate):
        db_trade = Trade(
            wallet_address=trade.wallet_address,
            date=datetime.fromisoformat(trade.date.replace('Z', '+00:00')),
            pair=trade.pair,
            type=trade.type,
            entry=trade.entry,
            exit=trade.exit,
            size=trade.size,
            pnl=trade.pnl,
            notes=trade.notes
        )
        db.add(db_trade)
        db.commit()
        db.refresh(db_trade)
        return db_trade

    @staticmethod
    def delete_trade(db: Session, trade_id: str):
        trade = db.query(Trade).filter(Trade.id == trade_id).first()
        if trade:
            db.delete(trade)
            db.commit()
            return True
        return False

