# Setup Guide

Complete setup instructions for HyroX Analytics.

## Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- **Python** 3.11+
- **Rust** 1.70+ (for Solana development)
- **Solana CLI** 1.16+
- **Anchor** 0.28+
- **Phantom Wallet** browser extension

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/hyro-protocol.git
cd hyro-protocol

# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### 2. Environment Setup

#### Frontend
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your configuration
```

Required variables:
- `NEXT_PUBLIC_SOLANA_NETWORK=devnet`
- `NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com`
- `NEXT_PUBLIC_API_URL=http://localhost:8000`

#### Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

Required variables:
- `DATABASE_URL=sqlite:///./hyrox_analytics.db`
- `JWT_SECRET=your-secret-key`
- `SOLANA_RPC_URL=https://api.devnet.solana.com`

### 3. Database Setup

The backend will automatically create the database on first run. For PostgreSQL:

```bash
# Create database
createdb hyrox_analytics

# Update DATABASE_URL in .env
DATABASE_URL=postgresql://user:password@localhost/hyrox_analytics
```

### 4. Solana Program Setup (Optional)

```bash
cd programs/hyro-analytics

# Build the program
anchor build

# Deploy to devnet
anchor deploy

# Update program ID in frontend/.env.local
NEXT_PUBLIC_PROGRAM_ID=your_program_id_here
```

### 5. Run Development Servers

#### Option 1: Run Separately

Terminal 1 (Backend):
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

#### Option 2: Run Together (from root)

```bash
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Troubleshooting

### Port Already in Use

If port 3000 or 8000 is in use:
- Frontend: Change port in `package.json` or use `PORT=3001 npm run dev`
- Backend: Use `uvicorn main:app --reload --port 8001`

### Solana Wallet Connection Issues

- Ensure Phantom wallet is installed
- Switch to Devnet in Phantom settings
- Check RPC URL in `.env.local`

### Database Errors

- Ensure database file has write permissions
- For PostgreSQL, verify connection string
- Run migrations if using Alembic

## Next Steps

1. Connect your Phantom wallet
2. Add your first trade in the Trading Journal
3. View analytics on the Dashboard
4. Calculate profit splits with the Calculator

## Production Deployment

See deployment guides in the main README.md for:
- Vercel (Frontend)
- Railway/Render (Backend)
- Mainnet deployment (Solana)

