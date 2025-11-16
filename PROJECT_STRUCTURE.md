# Project Structure

```
hyro-protocol/
├── frontend/                 # Next.js frontend application
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home/Dashboard page
│   │   ├── journal/          # Trading journal page
│   │   ├── calculator/       # Profit calculator page
│   │   └── globals.css       # Global styles
│   ├── components/          # React components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── journal/          # Journal components
│   │   ├── calculator/       # Calculator components
│   │   ├── layout/           # Layout components (Navbar)
│   │   ├── providers/        # Context providers
│   │   └── wallet/           # Wallet components
│   ├── lib/                  # Utilities and API client
│   │   ├── api.ts            # API client functions
│   │   └── utils.ts          # Utility functions
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── next.config.js
│
├── backend/                  # FastAPI backend
│   ├── services/             # Business logic
│   │   ├── trade_service.py
│   │   ├── analytics_service.py
│   │   └── account_service.py
│   ├── models.py             # SQLAlchemy models
│   ├── schemas.py            # Pydantic schemas
│   ├── database.py           # Database configuration
│   ├── main.py               # FastAPI application
│   ├── requirements.txt
│   └── .env.example
│
├── programs/                 # Solana programs
│   └── hyro-analytics/      # Anchor program
│       ├── src/
│       │   └── lib.rs       # Main program logic
│       ├── tests/            # Program tests
│       ├── Cargo.toml
│       ├── Anchor.toml
│       └── package.json
│
├── .github/                  # GitHub workflows
│   └── workflows/
│       └── ci.yml            # CI/CD pipeline
│
├── README.md                 # Main project documentation
├── SETUP.md                  # Setup instructions
├── CONTRIBUTING.md           # Contribution guidelines
├── LICENSE                   # MIT License
└── package.json              # Root package.json (workspace)
```

## Key Files

### Frontend
- `app/page.tsx` - Main dashboard page
- `components/dashboard/Dashboard.tsx` - Dashboard component
- `components/journal/TradingJournal.tsx` - Trading journal
- `components/calculator/ProfitCalculator.tsx` - Profit calculator
- `lib/api.ts` - API client for backend communication

### Backend
- `main.py` - FastAPI application entry point
- `models.py` - Database models (User, Trade, Account)
- `schemas.py` - Request/response schemas
- `services/` - Business logic layer

### Solana
- `programs/hyro-analytics/src/lib.rs` - Solana program (Trader Badge NFT)

## Data Flow

1. **User connects wallet** → Frontend detects wallet address
2. **User adds trade** → Frontend sends to Backend API
3. **Backend stores trade** → Database (SQLite/PostgreSQL)
4. **User views dashboard** → Backend calculates stats from trades
5. **User mints NFT badge** → Solana program creates on-chain identity

## Technology Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Solana Web3.js
- React Query
- Recharts

### Backend
- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL/SQLite

### Blockchain
- Solana
- Anchor Framework
- Rust

