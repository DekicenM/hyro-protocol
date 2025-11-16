# HyroX Analytics Backend

FastAPI backend for HyroX Analytics.

## Getting Started

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run the development server:
```bash
uvicorn main:app --reload
```

The API will be available at [http://localhost:8000](http://localhost:8000)

API documentation available at [http://localhost:8000/docs](http://localhost:8000/docs)

## API Endpoints

### Trades
- `GET /api/trades?wallet={address}` - Get trades for a wallet
- `POST /api/trades` - Create a new trade
- `DELETE /api/trades/{id}` - Delete a trade

### Dashboard
- `GET /api/dashboard/stats?wallet={address}` - Get dashboard statistics
- `GET /api/dashboard/status?wallet={address}` - Get account status
- `GET /api/dashboard/chart?wallet={address}` - Get equity curve data

## Database

By default, uses SQLite. For production, configure PostgreSQL in `.env`:

```
DATABASE_URL=postgresql://user:password@localhost/hyrox_analytics
```

