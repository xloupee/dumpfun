# DumpFun - Solana Paper Trading Platform

A platform for practicing cryptocurrency trading with virtual assets on the Solana blockchain.

## Setup Instructions
1. Create virtual environment: `python -m venv venv`
2. Activate virtual environment: 
   - Windows: `.\venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`
3. Install dependencies: `pip install -r requirements.txt`
4. Run development server: 
   ```bash
   cd backend
   PYTHONPATH=$PYTHONPATH:. uvicorn app.main:app --reload
   ```

## Features
- FastAPI framework
- Dependency injection
- Environment configuration
- API versioning
- Database integration ready
- Docker support
- Testing setup
- Real-time Solana token price tracking
- Paper trading simulation
- Portfolio management
- Transaction history
- Price charts and analytics
- Solana token metadata integration
- User authentication and profiles
- Virtual wallet management