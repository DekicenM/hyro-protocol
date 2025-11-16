from sqlalchemy import Column, String, Float, Integer, DateTime, Boolean, Text
from sqlalchemy.sql import func
from database import Base
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    wallet_address = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Trade(Base):
    __tablename__ = "trades"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    wallet_address = Column(String, index=True, nullable=False)
    date = Column(DateTime(timezone=True), nullable=False)
    pair = Column(String, nullable=False)
    type = Column(String, nullable=False)  # 'long' or 'short'
    entry = Column(Float, nullable=False)
    exit = Column(Float, nullable=False)
    size = Column(Float, nullable=False)
    pnl = Column(Float, nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Account(Base):
    __tablename__ = "accounts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    wallet_address = Column(String, unique=True, index=True, nullable=False)
    phase = Column(String, default="challenge")  # challenge, funded, scaling, violation
    account_size = Column(Float, nullable=False, default=0.0)
    profit_share = Column(Float, nullable=False, default=90.0)
    scaling_stage = Column(Integer, default=1)
    next_payout_date = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

