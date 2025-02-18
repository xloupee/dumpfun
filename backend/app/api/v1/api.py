from fastapi import APIRouter
from app.api.v1.endpoints import users, tokens

api_router = APIRouter()

api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(tokens.router, prefix="/tokens", tags=["tokens"]) 