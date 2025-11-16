# HyroX Analytics

> **Empowering Hyro & Prop Traders with Real-Time Analytics, Profit Calculation, and On-Chain Identity Tools**

<p>
  <a href="mailto:xsui46941@gmail.com">
    <img src="https://img.shields.io/badge/Email-xsui46941%40gmail.com-ef4444?style=flat&logo=gmail&logoColor=white" />
  </a>
  <a href="https://t.me/lorine93s">
    <img src="https://img.shields.io/badge/Telegram-@lorine93s-2AABEE?style=flat&logo=telegram&logoColor=white" />
  </a>
  <a href="https://twitter.com/kakamajo_btc">
    <img src="https://img.shields.io/badge/Twitter-@kakamajo__btc-1DA1F2?style=flat&logo=twitter&logoColor=white" />
  </a>
</p>

## 🎯 Overview

**HyroX Analytics** is a comprehensive, decentralized analytics platform designed specifically for Hyro Protocol traders and prop trading firms. Built on Solana blockchain, it provides traders with powerful tools to track performance, calculate profit splits, and establish on-chain trading identities—all while maintaining transparency and decentralization.


### Why HyroX Analytics?

- 🔐 **Non-Custodial**: Your data, your control—powered by Solana's decentralized infrastructure
- 📊 **Real-Time Analytics**: Track your trading performance with advanced metrics and visualizations
- 💰 **Profit Calculator**: Instantly calculate payouts and scaling eligibility
- 🎫 **On-Chain Identity**: Mint NFT badges that represent your trading achievements
- ⚡ **Lightning Fast**: Built on Solana for speed and low transaction costs
- 🔒 **Transparent**: All trading data verifiable on-chain

## 🎯 Mission

To democratize access to trading capital and analytics by providing a transparent, decentralized infrastructure that empowers traders, investors, and liquidity providers in the Hyro Protocol ecosystem.


## ✨ Features

### 🎯 MVP (v1.0) - Core Features

#### 1. **User Management & Authentication**
- 🔐 Wallet-based login (Phantom Wallet integration)
- 📧 Optional email authentication
- 👤 Trader profile creation and management
- 🔗 Exchange API connection (Bybit, Binance) for future auto-sync

#### 2. **Trading Journal & Analytics**
- 📝 Manual trade entry (date, pair, size, entry, exit, P/L)
- 📤 CSV import/export functionality
- 📊 **Auto-calculated metrics:**
  - Win rate percentage
  - Risk-reward ratio (RR)
  - Maximum daily drawdown
  - Average profit/loss per trade
  - Best and worst trading days
  - Profit factor
  - Sharpe ratio
- 📈 Interactive charts and dashboards
- 🔍 Advanced filtering (date range, asset, strategy)

#### 3. **Profit Split & Scaling Calculator**
- 💵 Input parameters:
  - Total profit made
  - Account size
  - Profit share percentage
  - Current scaling stage
- 📊 Output results:
  - Exact payout amount after fees
  - Next scaling level eligibility
  - Projected earnings at next stage
  - Tax breakdown (if applicable)
- 📄 Downloadable payout reports (PDF)

#### 4. **Unified Dashboard**
- 📊 Summary statistics at a glance
- 📋 Last 10 trades overview
- 🎯 Current status (Challenge → Funded → Scaling)
- ⏱️ Payout countdown timer
- 📈 Performance trends visualization
- 🎨 Customizable widgets


### 🚀 Phase 2 (v2.0) - Advanced Features

#### **On-Chain Trader Identity**
- 🎫 Mint "Trader NFT Badge" tied to Solana wallet
- 📊 Stores verified trading stats:
  - Win rate
  - Total profit
  - Account tier
  - Trading history hash
- 🏆 Use for rankings, rewards, and access control
- 🔄 Transferable and tradeable on secondary markets

#### **Risk Compliance Monitor**
- ⚠️ Real-time risk limit tracking:
  - Daily maximum loss
  - Maximum position size
  - Leverage limits
  - Trading hour restrictions
- 🔔 Multi-channel alerts:
  - In-app notifications
  - Email alerts
  - Telegram bot integration
- 📊 Risk score calculation

#### **Auto Trade Sync (Beta)**
- 🔄 Connect Bybit/Binance API for automatic trade import
- 🔐 Secure API key management
- ⚡ Real-time trade synchronization
- 📊 Historical data backfill


### 🌟 Phase 3 (v3.0) - Expansion & Growth

#### **Copy-Trading Module**
- 👥 Traders share strategies publicly with NFT badge verification
- 🔄 Followers mirror trades with customizable risk controls
- 💰 Performance-based fee structure
- 📊 Strategy performance leaderboard

#### **Investor Dashboard**
- 💼 Investors stake USDC into trader vaults
- 🤖 Smart contracts auto-distribute profits
- 📈 Portfolio performance tracking
- 🔍 Trader discovery and filtering


## 🏗️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [ShadCN UI](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/) / [Chart.js](https://www.chartjs.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) / [TanStack Query](https://tanstack.com/query)

### Backend
- **API**: [FastAPI](https://fastapi.tiangolo.com/) / [NestJS](https://nestjs.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL) / [MongoDB](https://www.mongodb.com/)
- **Authentication**: [Supabase Auth](https://supabase.com/docs/guides/auth) / [Clerk](https://clerk.com/)

### Blockchain
- **Chain**: [Solana](https://solana.com/)
- **Framework**: [Anchor](https://www.anchor-lang.com/)
- **Wallet**: [Phantom Wallet SDK](https://docs.phantom.app/)
- **RPC**: [Helius](https://www.helius.dev/) / [QuickNode](https://www.quicknode.com/)

### DevOps & Tools
- **Notifications**: [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) / [OneSignal](https://onesignal.com/)
- **Deployment**: [Vercel](https://vercel.com/) (Frontend) / [Railway](https://railway.app/) (Backend)
- **CI/CD**: GitHub Actions
- **Monitoring**: [Sentry](https://sentry.io/)


## 🏛️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│  Next.js + Tailwind + ShadCN UI + Recharts                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                      API Gateway Layer                      │
│              FastAPI / NestJS REST API                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
┌───────▼────────┐          ┌─────────▼──────────┐
│   Database     │          │   Solana Chain     │
│  Supabase /    │          │  Anchor Programs   │
│   MongoDB      │          │  NFT Minting       │
└────────────────┘          │  Smart Contracts   │
                             └────────────────────┘
```

### Key Components

1. **Frontend Application** (Next.js)
   - Dashboard, Trading Journal, Calculator, Profile
   - Wallet connection and transaction signing
   - Real-time data visualization

2. **Backend API** (FastAPI/NestJS)
   - Trade data CRUD operations
   - Analytics calculation engine
   - User authentication and authorization
   - Exchange API integration

3. **Solana Programs** (Anchor)
   - Trader NFT Badge minting
   - On-chain identity verification
   - Future: Profit distribution contracts

4. **Database** (Supabase/MongoDB)
   - User profiles and settings
   - Trade history
   - Analytics cache
   - API keys (encrypted)


## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- **Rust** 1.70+ (for Solana/Anchor development)
- **Solana CLI** 1.16+
- **Anchor** 0.28+
- **Phantom Wallet** browser extension

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hyro-protocol.git
   cd hyro-protocol
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   pip install -r requirements.txt  # or npm install for NestJS
   ```

3. **Set up environment variables**
   ```bash
   # Frontend (.env.local)
   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
   NEXT_PUBLIC_PROGRAM_ID=your_program_id
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

   # Backend (.env)
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   SOLANA_RPC_URL=your_rpc_url
   ```

4. **Set up Solana program**
   ```bash
   cd programs/hyro-analytics
   anchor build
   anchor deploy
   ```

5. **Run development servers**
   ```bash
   # Frontend (Terminal 1)
   cd frontend
   npm run dev

   # Backend (Terminal 2)
   cd backend
   npm run dev  # or uvicorn main:app --reload for FastAPI
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

### Development Workflow

1. Connect your Phantom wallet (devnet)
2. Create a trader profile
3. Add some sample trades
4. Explore the analytics dashboard
5. Test the profit calculator


## 📅 Project Roadmap

### ✅ Phase 1: MVP
- [x] Project setup and architecture
- [ ] User authentication (Wallet + Email)
- [ ] Trading journal (manual entry)
- [ ] Basic analytics calculation
- [ ] Profit split calculator
- [ ] Dashboard UI

### 🚧 Phase 2: Advanced Features
- [ ] Solana program development (Anchor)
- [ ] Trader NFT Badge minting
- [ ] Risk compliance monitor
- [ ] Auto trade sync (API integration)
- [ ] Advanced analytics and charts

### 🔮 Phase 3: Expansion
- [ ] Copy-trading module
- [ ] Investor dashboard
- [ ] Smart contract profit distribution
- [ ] Mobile app (React Native)
- [ ] Public API for third-party integrations


## 👥 User Roles

| Role     | Description                                                    | Permissions                          |
| -------- | -------------------------------------------------------------- | ------------------------------------ |
| **Trader** | Primary user - logs trades, views analytics, calculates payouts | Full access to personal dashboard   |
| **Investor** | Allocates capital to traders (Phase 3)                        | View trader performance, stake funds |
| **Admin**   | Manages platform settings and compliance                       | Full system access                   |

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all checks pass before submitting PR


## 🔗 Links & Resources

- **Hyro Protocol**: [Official Website](https://www.hyrotrader.com/)
- **Solana Docs**: [docs.solana.com](https://docs.solana.com/)
- **Anchor Framework**: [anchor-lang.com](https://www.anchor-lang.com/)
- **Phantom Wallet**: [phantom.app](https://phantom.app/)


<div align="center">

**Built with ❤️ for the Hyro Protocol community**

⭐ Star this repo if you find it helpful!

</div>
