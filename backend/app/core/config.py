from pydantic_settings import BaseSettings
from typing import List
import secrets

class Settings(BaseSettings):
    PROJECT_NAME: str = "DumpFun"
    PROJECT_VERSION: str = "1.0.0"
    PROJECT_DESCRIPTION: str = "DumpFun Backend API"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",  # React frontend
        "http://localhost:8000",  # API docs
        "http://localhost:5173",  # Vite dev server
        "http://127.0.0.1:5173"   # Vite dev server alternative
    ]
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings() 