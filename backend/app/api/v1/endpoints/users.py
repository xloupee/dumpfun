from fastapi import APIRouter, HTTPException, Depends
from typing import List

router = APIRouter()

@router.get("/")
async def get_users():
    return {"message": "List of users"}

@router.get("/me")
async def get_current_user():
    return {"message": "Current user details"} 