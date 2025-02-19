import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "DumpFun"
    PROJECT_VERSION: str = "0.1.0"
    PROJECT_DESCRIPTION: str = "Solana Paper Trading Platform"
    API_V1_STR: str = "/api/v1"
    
    # AWS Cognito
    AWS_REGION = os.getenv('AWS_REGION')
    COGNITO_USER_POOL_ID = os.getenv('COGNITO_USER_POOL_ID')
    COGNITO_APP_CLIENT_ID = os.getenv('COGNITO_APP_CLIENT_ID')
    COGNITO_APP_CLIENT_SECRET = os.getenv('COGNITO_APP_CLIENT_SECRET')
    
    # CORS
    ALLOWED_ORIGINS = [
        "http://localhost:5173",  # Vite frontend
        "http://localhost:8000",  # API docs
        "http://localhost:5173",  # Vite dev server
        "http://127.0.0.1:5173"   # Vite dev server alternative
    ]

settings = Settings() 