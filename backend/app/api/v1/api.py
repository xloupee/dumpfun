from fastapi import APIRouter
from app.api.v1.endpoints import users, tokens, auth

api_router = APIRouter()

api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(tokens.router, prefix="/tokens", tags=["tokens"]) 
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])