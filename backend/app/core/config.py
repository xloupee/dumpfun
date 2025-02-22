from pydantic_settings import BaseSettings
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "DumpFun"
    PROJECT_VERSION: str = "0.1.0"
    PROJECT_DESCRIPTION: str = "Solana Paper Trading Platform"
    API_V1_STR: str = "/api/v1"
    
    # AWS Cognito
    AWS_REGION: str = "us-east-1"  # or your preferred AWS region
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    COGNITO_USER_POOL_ID: str = os.getenv('COGNITO_USER_POOL_ID', '')
    COGNITO_APP_CLIENT_ID: str = os.getenv('COGNITO_APP_CLIENT_ID', '')
    COGNITO_APP_CLIENT_SECRET: str = os.getenv('COGNITO_APP_CLIENT_SECRET', '')
    
    # Bitquery Configuration
    BITQUERY_API_KEY: str = os.getenv('BITQUERY_API_KEY', '').strip()
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",  # Vite frontend
        "http://localhost:8000",  # API docs
        "http://localhost:5173",  # Vite dev server
        "http://127.0.0.1:5173"   # Vite dev server alternative
    ]

    @property
    def has_valid_bitquery_key(self) -> bool:
        return bool(self.BITQUERY_API_KEY)

    class Config:
        case_sensitive = True
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()

# Debug print to verify API key loading
print(f"Loaded BITQUERY_API_KEY: {settings.BITQUERY_API_KEY[:10]}...") 