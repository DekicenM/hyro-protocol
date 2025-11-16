from sqlalchemy.orm import Session
from models import Account
from schemas import AccountStatus
from datetime import datetime, timedelta

class AccountService:
    @staticmethod
    def get_account_status(db: Session, wallet_address: str) -> AccountStatus:
        account = db.query(Account).filter(
            Account.wallet_address == wallet_address
        ).first()

        if not account:
            # Create default account
            account = Account(
                wallet_address=wallet_address,
                phase="challenge",
                account_size=10000.0,
                profit_share=90.0,
                scaling_stage=1,
                next_payout_date=datetime.utcnow() + timedelta(days=30)
            )
            db.add(account)
            db.commit()
            db.refresh(account)

        return AccountStatus(
            phase=account.phase,
            accountSize=account.account_size,
            profitShare=account.profit_share,
            nextPayoutDate=account.next_payout_date
        )

